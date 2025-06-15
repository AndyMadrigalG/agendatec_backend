import { IsInt, IsString, IsDate, IsOptional, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class MiembroJuntaDto {
    @IsInt()
    @IsOptional()
    id_Miembro_De_Junta: number;

    @ApiProperty({ description: "The ID of the user associated with the board member" })
    @IsInt()
    @IsNotEmpty()
    usuario_id: number;

    @ApiProperty({ description: "The ID of the board associated with the member" })
    @IsInt()
    @IsNotEmpty()
    junta_id: number;

    @ApiProperty({ description: "The cargo or position of the board member" })
    @IsString()
    @IsNotEmpty()
    cargo: string;

    @ApiProperty({ description: "The start date of the board member's term" })
    @Type(() => Date)
    @IsDate()
    @IsNotEmpty()
    fecha_inicio: Date;

    @ApiProperty({ description: "The end date of the board member's term" })
    @Type(() => Date)
    @IsDate()
    @IsOptional()
    fecha_fin?: Date;
}