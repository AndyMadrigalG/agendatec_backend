import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsEnum,
} from 'class-validator';


export class PuntoResponseDto {
  @ApiProperty({ description: "Point's ID" })
  @IsNumber()
  @IsOptional()
  id_Punto: number;

  @ApiProperty({ description: "Point's number" })
  @IsNotEmpty()
  @IsNumber()
  numeracion: number;

  @ApiProperty({ description: "Speaker's ID" })
  @IsNotEmpty()
  @IsNumber()
  expositorId: number;

  @ApiProperty({ description: "Point Type" })
  @IsNotEmpty()
  @IsString()
  tipo: string;

  @ApiProperty({ description: "Estimated duration in mins" })
  @IsNotEmpty()
  @IsNumber()
  duracionMin: number;

  @ApiProperty({ description: "Point's statement" })
  @IsOptional()
  @IsString()
  enunciado: string;

  @ApiProperty({ description: "Attatched files (URLs) JSON o CSV)"})
  @IsOptional()
  @IsString()
  archivos: string;

  @ApiProperty({ description: "Point's content" })
  @IsNotEmpty()
  @IsString()
  contenido: string;

  @ApiProperty({ description: "Belonging agenda's ID" })
  @IsNotEmpty()
  @IsNumber()
  agendaId: number;
  votacion: { id_Punto: number; votos_a_Favor: number; votos_en_Contra: number; votos_Abstencion: number; acuerdo: string; };
}