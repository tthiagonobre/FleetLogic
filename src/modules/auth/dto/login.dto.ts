import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength, MaxLength } from "class-validator";

export class LoginDto {
    @ApiProperty({
        example: 'DRIVER001',
        description: 'O número da carteira de motorista do usuário',
    })
    @IsString({ message: 'O número da carteira de motorista deve ser uma string.' })
    @IsNotEmpty({ message: 'O número da carteira de motorista é obrigatório.' })
    @MinLength(5, { message: 'O número da carteira de motorista deve ter pelo menos 5 caracteres.' })
    licenseNumber: string;

    @ApiProperty({
        example: 'senhaforte123',
        description: 'A senha do usuário',
    })
    @IsString({ message: 'A senha deve ser uma string.' })
    @IsNotEmpty({ message: 'A senha é obrigatória.' })
    @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres.' })
    password: string;
}