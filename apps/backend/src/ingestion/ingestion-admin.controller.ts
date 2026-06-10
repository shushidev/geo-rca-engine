import { Body, Controller, Post } from '@nestjs/common';
import { ParseSourceDto } from './dto/parse-source.dto';
import { SourceParserService } from './source-parser.service';

@Controller('admin/ingestion')
export class IngestionAdminController {
  constructor(private readonly sourceParserService: SourceParserService) {}

  @Post('parse')
  async parseSource(@Body() body: ParseSourceDto) {
    const parsedSource = await this.sourceParserService.parseFile(body.filePath);

    return {
      filePath: parsedSource.filePath,
      fileName: parsedSource.fileName,
      extension: parsedSource.extension,
      textLength: parsedSource.text.length,
      metadata: parsedSource.metadata,
      preview: this.buildPreview(parsedSource.text)
    };
  }

  private buildPreview(text: string): string {
    return text.length > 300 ? `${text.slice(0, 300)}...` : text;
  }
}
