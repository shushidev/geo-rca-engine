import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { basename, dirname, extname, isAbsolute, relative, resolve } from 'node:path';
import { PDFParse } from 'pdf-parse';
import type { ParsedSource, SourceType } from './source-parser.types';

type ParserResult = {
  text: string;
  title?: string;
};

@Injectable()
export class SourceParserService {
  private readonly workspaceRoot = this.resolveWorkspaceRoot();
  private readonly sourceRoot = resolve(this.workspaceRoot, 'data/sources');

  async parseFile(filePath: string): Promise<ParsedSource> {
    const resolvedPath = this.resolveSafeSourcePath(filePath);
    const extension = extname(resolvedPath).toLowerCase();
    const fileName = basename(resolvedPath);
    const sourceType = this.getSourceType(extension);
    const parsed = await this.extractText(resolvedPath, sourceType);
    const text = this.normalizeText(parsed.text);

    if (!this.hasUsefulText(text)) {
      throw new BadRequestException(`No useful text could be extracted from ${fileName}`);
    }

    return {
      filePath: relative(this.workspaceRoot, resolvedPath),
      fileName,
      extension,
      text,
      metadata: {
        sourceType,
        ingestedAt: new Date().toISOString(),
        title: parsed.title ?? this.titleFromFileName(fileName)
      }
    };
  }

  private async extractText(filePath: string, sourceType: SourceType): Promise<ParserResult> {
    if (sourceType === 'pdf') {
      return this.extractPdfText(filePath);
    }

    const text = await readFile(filePath, 'utf8');

    return {
      text,
      title: sourceType === 'markdown' ? this.extractMarkdownTitle(text) : undefined
    };
  }

  private async extractPdfText(filePath: string): Promise<ParserResult> {
    const buffer = await readFile(filePath);
    const parser = new PDFParse({ data: buffer });

    try {
      const [textResult, infoResult] = await Promise.all([parser.getText(), parser.getInfo()]);
      const title = this.toOptionalString(infoResult.info?.Title ?? infoResult.info?.title);

      return {
        text: textResult.text,
        title
      };
    } finally {
      await parser.destroy();
    }
  }

  private resolveSafeSourcePath(filePath: string): string {
    const requestedPath = filePath.trim();

    if (!requestedPath) {
      throw new BadRequestException('filePath is required');
    }

    const resolvedPath = isAbsolute(requestedPath)
      ? resolve(requestedPath)
      : requestedPath === 'data/sources' || requestedPath.startsWith('data/sources/')
        ? resolve(this.workspaceRoot, requestedPath)
        : resolve(this.sourceRoot, requestedPath);

    const relativeToSourceRoot = relative(this.sourceRoot, resolvedPath);

    if (
      relativeToSourceRoot === '' ||
      relativeToSourceRoot.startsWith('..') ||
      isAbsolute(relativeToSourceRoot)
    ) {
      throw new BadRequestException('filePath must point to a file inside data/sources');
    }

    if (!existsSync(resolvedPath)) {
      throw new BadRequestException(`Source file not found: ${relative(this.workspaceRoot, resolvedPath)}`);
    }

    return resolvedPath;
  }

  private getSourceType(extension: string): SourceType {
    switch (extension) {
      case '.pdf':
        return 'pdf';
      case '.md':
        return 'markdown';
      case '.txt':
        return 'text';
      default:
        throw new BadRequestException(
          `Unsupported source file type "${extension || 'unknown'}". Supported types: .pdf, .md, .txt`
        );
    }
  }

  private normalizeText(text: string): string {
    return text
      .replace(/\r\n?/g, '\n')
      .replace(/[ \t]+\n/g, '\n')
      .replace(/\n[ \t]+/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }

  private hasUsefulText(text: string): boolean {
    return text.replace(/\s/g, '').length > 0;
  }

  private extractMarkdownTitle(text: string): string | undefined {
    const titleLine = text
      .split(/\r?\n/)
      .map(line => line.trim())
      .find(line => line.startsWith('# '));

    return titleLine?.replace(/^#\s+/, '').trim() || undefined;
  }

  private titleFromFileName(fileName: string): string {
    return fileName.replace(/\.[^.]+$/, '');
  }

  private toOptionalString(value: unknown): string | undefined {
    return typeof value === 'string' && value.trim() ? value.trim() : undefined;
  }

  private resolveWorkspaceRoot(): string {
    let currentPath = process.cwd();

    while (true) {
      if (existsSync(resolve(currentPath, 'data/sources'))) {
        return currentPath;
      }

      const parentPath = dirname(currentPath);

      if (parentPath === currentPath) {
        return process.cwd();
      }

      currentPath = parentPath;
    }
  }
}
