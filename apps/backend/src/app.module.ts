import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { validateEnv } from './config/env.validation';
import { DbModule } from './db/db.module';
import { GeoController } from './geo/geo.controller';
import { GeoService } from './geo/geo.service';
import { IngestionModule } from './ingestion/ingestion.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '../../.env'],
      validate: validateEnv
    }),
    DbModule,
    IngestionModule
  ],
  controllers: [AppController, GeoController],
  providers: [AppService, GeoService]
})
export class AppModule {}
