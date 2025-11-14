import { IsNotEmpty, IsString, MinLength, MaxLength } from "class-validator";

export class LoginDto {
    @IsString({ message: 'O número da carteira de motorista deve ser uma string.' })
    @IsNotEmpty({ message: 'O número da carteira de motorista é obrigatório.' })
    @MinLength(5, { message: 'O número da carteira de motorista deve ter pelo menos 5 caracteres.' })
    licenseNumber: string;

    @IsString({ message: 'A senha deve ser uma string.' })
    @IsNotEmpty({ message: 'A senha é obrigatória.' })
    @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres.' })
    password: string;
}