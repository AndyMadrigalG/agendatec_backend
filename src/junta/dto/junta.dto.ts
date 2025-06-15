import { ApiProperty } from '@nestjs/swagger';
import {  IsNotEmpty, IsString } from 'class-validator';

export class JuntaDto {

    @ApiProperty({ description: "The id of the board" })
    id_Junta: number;

    @ApiProperty({ description: "The name of the board" })
    @IsNotEmpty()
    @IsString()
    nombre: string;
}