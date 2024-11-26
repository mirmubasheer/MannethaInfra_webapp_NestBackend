import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class EmailFormDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @Matches(/^\d{10}$/, { message: 'Mobile number must be 10 digits' })
  readonly mobileNumber: string;

  @IsOptional()
  @IsString()
  readonly message?: string;

  @IsOptional()
  @IsString()
  readonly category: string;
  
  @IsOptional()
  @IsString()
  readonly otherCategory: string;

  @IsOptional()
  @IsString()
  readonly subject: string;
}