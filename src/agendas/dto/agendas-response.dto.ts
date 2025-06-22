import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty, IsOptional,
  IsString,
} from 'class-validator';

export class AgendasResponseDto {
  @ApiProperty({ description: "The agenda's id" })
  id_Agenda: number;

  @ApiProperty({ description: "Session number" })
  @IsNotEmpty()
  @IsString()
  numero: string;

  @ApiProperty({
    description: "Session type",
  })
  @IsNotEmpty()
  @IsString()
  tipo: string;

  @ApiProperty({
    description: "Date and time the session will take place",
  })
  @IsNotEmpty()
  fechaHora: string

  @ApiProperty({
    description: "Date and time the session finished",
  })
  fechaFin: string | null;

  @ApiProperty({
    description: "Session's place",
  })
  @IsNotEmpty()
  @IsString()
  lugar: string;

  @ApiProperty({
    description: "Agenda's state",
  })
  @IsOptional()
  @IsString()
  estado?: string;
}


