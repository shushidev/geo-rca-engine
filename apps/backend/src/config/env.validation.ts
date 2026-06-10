import { plainToInstance } from 'class-transformer';
import { IsIn, IsOptional, IsString, IsUrl, validateSync } from 'class-validator';

class EnvironmentVariables {
  @IsString()
  OPENAI_API_KEY!: string;

  @IsString()
  PINECONE_API_KEY!: string;

  @IsString()
  PINECONE_INDEX!: string;

  @IsUrl({
    protocols: ['postgresql'],
    require_protocol: true,
    require_tld: false
  })
  DATABASE_URL!: string;

  @IsUrl({
    protocols: ['redis'],
    require_protocol: true,
    require_tld: false
  })
  REDIS_URL!: string;

  @IsUrl({
    protocols: ['http', 'https'],
    require_protocol: true,
    require_tld: false
  })
  NEXT_PUBLIC_API_BASE_URL!: string;

  @IsOptional()
  @IsIn(['development', 'staging', 'production', 'test'])
  APP_ENVIRONMENT?: string;

  @IsOptional()
  @IsIn(['true', 'false'])
  DATABASE_SSL?: string;
}

export function validateEnv(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
