import { BadRequestException, Controller, Get } from '@nestjs/common';
import { DbAdminService } from './db-admin.service';

@Controller()
export class DbAdminController {
  constructor(private readonly dbAdminService: DbAdminService) {}

  @Get('migrate-up')
  async migrateUp() {
    try {
      return await this.dbAdminService.migrateLatest();
    } catch (error) {
      throw new BadRequestException({
        message: 'failed migrations',
        error: this.formatError(error)
      });
    }
  }

  @Get('seed-data')
  async seedData() {
    try {
      return await this.dbAdminService.seedData();
    } catch (error) {
      throw new BadRequestException({
        message: 'failed seeding',
        error: this.formatError(error)
      });
    }
  }

  private formatError(error: unknown) {
    if (error instanceof Error) {
      return {
        name: error.name,
        message: error.message
      };
    }

    return error;
  }
}
