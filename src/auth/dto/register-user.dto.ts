import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class RegisterUserDto {
    @ApiProperty({ description: "El nombre del usuario" })
    @IsNotEmpty()
    @IsString()
    usuario: string;

    @ApiProperty({ description: "El correo electrónico del usuario" })
    @IsNotEmpty()
    @IsEmail()
    correo: string;

    @ApiProperty({ description: "El número de teléfono del usuario" })
    @IsNotEmpty()
    @Length(8, 16)
    telefono: string;

    @ApiProperty({ description: "La contraseña del usuario" })
    @IsNotEmpty()
    @Length(6, 20)
    contrasena: string;
}