import { ApiProperty } from '@nestjs/swagger';

export class UsuarioJuntaDto {
    @ApiProperty({ description: 'ID del miembro de la junta' })
    id_Miembro_De_Junta: number;

    @ApiProperty({ description: 'ID del usuario asociado' })
    usuario_id: number;

    @ApiProperty({ description: 'ID de la junta asociada' })
    junta_id: number;

    @ApiProperty({ description: 'Cargo del miembro en la junta' })
    cargo: string;

    @ApiProperty({ description: 'Fecha de inicio del término' })
    fecha_inicio: Date;

    @ApiProperty({ description: 'Fecha de fin del término (opcional)' })
    fecha_fin?: Date;

    @ApiProperty({ description: 'Información del usuario asociado' })
    usuario: {
        id_Usuario: number;
        nombre: string;
        email: string;
        telefono: string;
    };
}