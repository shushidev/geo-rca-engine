import { Module } from '@nestjs/common';
import { IngestionAdminController } from './ingestion-admin.controller';
import { SourceParserService } from './source-parser.service';

@Module({
  controllers: [IngestionAdminController],
  providers: [SourceParserService],
  exports: [SourceParserService]
})
export class IngestionModule {}
