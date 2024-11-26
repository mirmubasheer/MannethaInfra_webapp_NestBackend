import { IsString, IsOptional, IsNotEmpty, IsArray } from 'class-validator';

export class CreateProjectDto {
    // Basic Information
    @IsString()
    @IsNotEmpty()
    propertyTitle: string;

    @IsString()
    @IsNotEmpty()
    Description: string;

    @IsString()
    @IsNotEmpty()
    Type: string;

    @IsString()
    @IsOptional()
    Price?: string;

    @IsString()
    @IsOptional()
    Rooms?: string;

    // Gallery Images
    @IsOptional()
    @IsString()
    image?: string;

    // Details Information
    @IsString()
    @IsOptional()
    PropertyId?: string;

    @IsString()
    @IsOptional()
    AreaSize?: string;

    @IsString()
    @IsOptional()
    SizePrefix?: string;

    @IsString()
    @IsOptional()
    Location?: string;

    @IsString()
    @IsOptional()
    LandArea?: string;

    @IsString()
    @IsOptional()
    Bedrooms?: string;

    @IsString()
    @IsOptional()
    Bathrooms?: string;

    @IsString()
    @IsOptional()
    Garages?: string;

    @IsString()
    @IsOptional()
    YearBuild?: string;

    @IsArray()
    @IsOptional()
    amenity?: string[];

    // Property Contact Details
    @IsString()
    @IsOptional()
    Name?: string;

    @IsString()
    @IsOptional()
    Email?: string;

    @IsString()
    @IsOptional()
    Phone?: string;
}
