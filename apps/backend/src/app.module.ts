import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { validateEnv } from './config/env.validation';
import { DbModule } from './db/db.module';
import { GeoController } from './geo/geo.controller';
import { GeoService } from './geo/geo.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '../../.env'],
      validate: validateEnv
    }),
    DbModule
  ],
  controllers: [AppController, GeoController],
  providers: [AppService, GeoService]
})
export class AppModule {}
