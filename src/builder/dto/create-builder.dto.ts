import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateBuilderDto {
  @IsNotEmpty()
  @IsString()
  builderName: string;

  @IsNotEmpty()
  @IsString()
  about: string;

  @IsNotEmpty()
  @IsString()
  officeAddress: string;

  @IsOptional()
  @IsString()
  builderLogo?: string; // Optional field for the image filename
}
