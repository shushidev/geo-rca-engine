import { IsString, MinLength } from 'class-validator';

export class ParseSourceDto {
  @IsString()
  @MinLength(1)
  filePath!: string;
}
