import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsEnum,
  IsOptional,
} from 'class-validator';

export enum PuntoType {
  Informativo = 'Informativo',
  Aprobacion = 'Aprobacion',
  Estrategia = 'Estrategia',
  Varios = 'Varios',
}

export class PuntoResponseDto {
  @ApiProperty({ description: "Point's ID" })
  @IsNotEmpty()
  @IsNumber()
  id_Punto: number;

  @ApiProperty({ description: "Speaker's ID" })
  @IsNotEmpty()
  @IsNumber()
  expositorId: number;

  @ApiProperty({ description: "Point Type", enum: PuntoType })
  @IsNotEmpty()
  @IsEnum(PuntoType)
  tipo: PuntoType;

  @ApiProperty({ description: "Estimated duration in mins" })
  @IsNotEmpty()
  @IsNumber()
  duracionMin!: number;

  @ApiProperty({ description: "Attatched files (URLs) JSON o CSV)", required: false })
  @IsOptional()
  @IsString()
  archivos: string;

  @ApiProperty({ description: "Point's title" })
  @IsNotEmpty()
  @IsString()
  titulo: string;

  @ApiProperty({ description: "Belonging agenda's ID" })
  @IsNotEmpty()
  @IsNumber()
  agendaId: number;
}
