import { ApiProperty } from '@nestjs/swagger';
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
    @ApiProperty({
        example: 'ABC-1234',
        description: 'A placa do veículo',
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(15)
    plate: string;

    @ApiProperty({
        example: 'FH16',
        description: 'O modelo do veículo',
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    model: string;

    @ApiProperty({
        example: 'Volvo',
        description: 'A marca do fabricante do veículo',
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    make: string;

    @ApiProperty({
        example: 2024,
        description: 'O ano de fabricação do veículo',
    })
    @IsInt()
    @Min(1990)
    @Max(new Date().getFullYear() + 1) // Permitir até o próximo ano
    year: number;
}