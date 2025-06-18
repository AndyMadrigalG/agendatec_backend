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

  @ApiProperty({ description: "Body of the point" })
  @IsOptional()
  @IsString()
  cuerpo: string;

  @ApiProperty({ description: "Attatched files (URLs) JSON o CSV)"})
  @IsOptional()
  @IsString()
  archivos: string;

  @ApiProperty({ description: "Point's title" })
  @IsNotEmpty()
  @IsString()
  enunciado: string;

  @ApiProperty({ description: "Belonging agenda's ID" })
  @IsNotEmpty()
  @IsNumber()
  agendaId: number;
}

export class PuntoAprobacionResponseDto {
  @ApiProperty({ description: "Point's ID" })
  @IsNumber()
  @IsNotEmpty()
  id_Punto: number;

  @ApiProperty({ description: "Point's approval status" })
  @IsNotEmpty()
  @IsString()
  votos_a_Favor: number;

  @ApiProperty({ description: "Point's rejection status" })
  @IsNotEmpty()
  @IsNumber()
  votos_en_Contra: number;

  @ApiProperty({ description: "Point's abstention status" })
  @IsNotEmpty()
  @IsNumber()
  votos_Abstencion: number;

  @ApiProperty({ description: "Point's agreement status" })
  @IsNotEmpty()
  @IsString()
  acuerdo: string;
}

export class PuntoInformacionResponseDto {
  @ApiProperty({ description: "Point's ID" })
  @IsNumber()
  @IsNotEmpty()
  id_Punto: number;

  @ApiProperty({ description: "Point's details" })
  @IsString()
  @IsNotEmpty()
  detalles: string;
}

export class PuntoEstrategiaResponseDto {
  @ApiProperty({ description: "Point's ID" })
  @IsNumber()
  @IsNotEmpty()
  id_Punto: number;

  @ApiProperty({ description: "Point's considerations" })
  @IsString()
  @IsNotEmpty()
  consideraciones: string;
}

export class PuntoVariosResponseDto {
  @ApiProperty({ description: "Point's ID" })
  @IsNumber()
  @IsNotEmpty()
  id_Punto: number;

  @ApiProperty({ description: "Point's proposal" })
  @IsString()
  @IsNotEmpty()
  propuesta: string;
}