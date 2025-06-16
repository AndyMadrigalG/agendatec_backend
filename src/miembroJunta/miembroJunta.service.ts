import { Injectable } from '@nestjs/common';
import { MiembroJuntaDto } from './dto/miembroJunta.dto';
import prisma from 'src/prisma.service';

@Injectable()
export class MiembroJuntaService {

    async getMiembrosJunta(): Promise<MiembroJuntaDto[]> {
        try {
            const miembros = await prisma.miembro_De_Junta.findMany();
            
            return miembros.map(miembro => {
                return {
                    id_Miembro_De_Junta: miembro.id_Miembro_De_Junta,
                    usuario_id: miembro.usuario_id,
                    junta_id: miembro.junta_id,
                    cargo: miembro.cargo,
                    fecha_inicio: miembro.fecha_inicio,
                    fecha_fin: miembro.fecha_fin === null ? undefined : miembro.fecha_fin
                };
            });
        } catch (error) {
            console.error('Error al obtener los miembros de junta: ', error);
            throw new Error('Error al obtener los miembros de junta');
        }
    }

    async postMiembroJunta(miembroJuntaDto: MiembroJuntaDto) {
        try {
            const miembroJunta = await prisma.miembro_De_Junta.create({
                data: {
                    junta_id: miembroJuntaDto.junta_id,
                    usuario_id: miembroJuntaDto.usuario_id,
                    cargo: miembroJuntaDto.cargo,
                    fecha_inicio: miembroJuntaDto.fecha_inicio
                }
            });
            return miembroJunta;
        } catch (error) {
            console.error('Error al registrar el miembro de la junta:', error);
            throw new Error('Error al registrar el miembro de la junta');
        }
    }

}
