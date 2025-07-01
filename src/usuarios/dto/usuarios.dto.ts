import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UsuariosDto {

    @ApiProperty({ description: "The user's id" })
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @ApiProperty({ description: "The user's name" })
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @ApiProperty({ description: "The user's email address" })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({ description: "The user's phone number" })
    @IsNotEmpty()
    @IsString()
    telefono: string;  

}


