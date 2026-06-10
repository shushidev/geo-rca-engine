export type SourceType = 'pdf' | 'markdown' | 'text';

export type ParsedSource = {
  filePath: string;
  fileName: string;
  extension: string;
  text: string;
  metadata: {
    sourceType: SourceType;
    ingestedAt: string;
    title?: string;
  };
};
