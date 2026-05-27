import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getWelcome() {
    return {
      message: 'Welcome to Geo-RCA Backend API',
      api: '/api/geo/topics'
    };
  }
}
