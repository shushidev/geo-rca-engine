import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbAdminController } from './db-admin.controller';
import { DbAdminService } from './db-admin.service';
import { databaseProviders } from './db.providers';

@Module({
  imports: [ConfigModule],
  controllers: [DbAdminController],
  providers: [...databaseProviders, DbAdminService],
  exports: [...databaseProviders]
})
export class DbModule {}
