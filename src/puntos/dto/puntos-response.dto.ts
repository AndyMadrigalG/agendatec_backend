import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
} from 'class-validator';


export class PuntoResponseDto {
  @ApiProperty({ description: "Point's ID" })
  @IsNotEmpty()
  @IsNumber()
  id_Punto: number;

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
