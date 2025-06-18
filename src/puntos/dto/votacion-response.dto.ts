import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty,IsNumber, IsString,} from 'class-validator';


export class VotacionResponseDto {
  @ApiProperty({ description: "Point's ID" })
  @IsNumber()
  @IsNotEmpty()
  id_Punto: number;

  @ApiProperty({ description: "Votes in favor of the point" })
  @IsNotEmpty()
  @IsNumber()
  votos_a_Favor: number;

  @ApiProperty({ description: "Votes against the point" })
  @IsNotEmpty()
  @IsNumber()
  votos_en_Contra: number;

  @ApiProperty({ description: "Abstentions on the point" })
  @IsNotEmpty()
  @IsNumber()
  votos_Abstencion: number;

  @ApiProperty({ description: "Votes in favor of the point" })
  @IsNotEmpty()
  @IsString()
  acuerdo: string;

}