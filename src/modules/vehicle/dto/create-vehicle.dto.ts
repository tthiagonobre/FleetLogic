import {
    IsString,
    IsNotEmpty,
    MinLength,
    MaxLength,
    IsInt,
    Min,
    Max,
} from 'class-validator';

export class CreateVehicleDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(15)
    plate: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    model: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    make: string;

    @IsInt()
    @Min(1990)
    @Max(new Date().getFullYear() + 1) // Permitir até o próximo ano
    year: number;
}