import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsDateString,
  IsBoolean,
} from 'class-validator';
import { PuntoResponseDto, PuntoType } from 'src/puntos/dto/puntos-response.dto';


export enum SessionType {
  Ordinaria = 'Ordinaria',
  Extraordinaria = 'Extraordinaria',
}

export enum Modalidad {
  Presencial = 'Presencial',
  Remota = 'Remota',
  Hibrida = 'Hibrida',
}

export class AgendasResponseDto {
  @ApiProperty({ description: "The agenda's id" })
  @IsNotEmpty()
  @IsNumber()
  id_Agenda: number;

  @ApiProperty({ description: "Session number" })
  @IsNotEmpty()
  @IsString()
  numero: string;

  @ApiProperty({
    description: "Session type",
    enum: SessionType,
    example: SessionType.Ordinaria,
  })
  @IsNotEmpty()
  @IsEnum(SessionType)
  tipo: SessionType;

  @ApiProperty({
    description: "Date and tyme the sesison will take place",
    required: false,
  })
  @IsOptional()
  @IsDateString()
  fechaHora: string;

  @ApiProperty({
    description: "Session's modality",
    enum: Modalidad,
    example: Modalidad.Presencial,
  })
  @IsNotEmpty()
  @IsEnum(Modalidad)
  modalidad: Modalidad;

  @ApiProperty({
    description: "Session's place (if presencial)",
    required: false,
  })
  @IsOptional()
  @IsString()
  lugar: string;

  @ApiProperty({
    description: "Session's link (if remote or hybrid)",
    required: false,
  })
  @IsOptional()
  @IsString()
  link: string;

  @ApiProperty({
    description: "Emails of members to be summoned (if not in the board)",
    required: false,
  })
  @IsOptional()
  @IsString()
  convocarMiembros: string;

  @ApiProperty({
    description: "Indicates if the session is for the board of directors",
    default: false,
  })
  @IsBoolean()
  juntaDirectiva: boolean;

  @ApiProperty({
    description: "Lista de puntos de la agenda",
    type: [PuntoResponseDto],
  })
  @IsOptional()
  puntos: PuntoResponseDto[];
}


