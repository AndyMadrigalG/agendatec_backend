import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class LoginUserDto {

    @ApiProperty({ description: "The user's email address" })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ description: "The user's password" })
    @IsNotEmpty()
    @Length(6, 20)
    password: string;
}