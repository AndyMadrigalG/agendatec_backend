import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsDateString,
  IsArray,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PuntoResponseDto } from 'src/puntos/dto/puntos-response.dto';

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
    required: false,
  })
  @Type(() => Date)
  @IsOptional()
  @IsDate()
  fechaHora: Date;

  @ApiProperty({
    description: "Session's place (if presencial)",
    required: false,
  })
  @IsOptional()
  @IsString()
  lugar: string;

}


