import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class LoginUserDto {

    @ApiProperty({ description: "Campo para ingresar el email del usuario" })
    @IsNotEmpty()
    @IsEmail()
    usuario: string;

    @ApiProperty({ description: "Campo para ingresar la contraseña" })
    @IsNotEmpty()
    contrasena: string;
}