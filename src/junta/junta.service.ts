import { Injectable } from '@nestjs/common';
import { JuntaDto } from './dto/junta.dto';
import prisma from '../prisma.service';
import { MiembroJuntaDto } from 'src/miembroJunta/dto/miembroJunta.dto';
import { UsuarioJuntaDto } from './dto/usuarioJunta.dto';

@Injectable()
export class JuntaService {
    
    async getJuntas(): Promise<JuntaDto[]> {
        try {
            const juntas = await prisma.junta.findMany();

            return juntas.map(junta => {
                return {
                    id_Junta: junta.id_Junta,
                    nombre: junta.nombre
                };
            });
        } catch (error) {
            console.error('Error fetching juntas:', error);
            throw new Error('Error fetching juntas');
        }
    }

    async postJunta(juntaDto: JuntaDto){
        try {
            const junta =  await prisma.junta.create({
                data: {
                    nombre: juntaDto.nombre,
                }
            });
            return junta;
        } catch (error) {
            console.error('Error al registrar la junta:', error);
            throw new Error('Error al registrar la junta');
        }
    }

    async getMiembrosByJuntaId(juntaId: number): Promise<UsuarioJuntaDto[]> {
        try {
            const miembros = await prisma.miembro_De_Junta.findMany({
                where: {
                    junta_id: juntaId
                },
                include: {
                    usuario: true // Assuming 'usuario' is the relation name in your Prisma schema
                }
            });

            return miembros.map(miembro => ({
                id_Miembro_De_Junta: miembro.id_Miembro_De_Junta,
                usuario_id: miembro.usuario_id,
                junta_id: miembro.junta_id,
                cargo: miembro.cargo,
                fecha_inicio: miembro.fecha_inicio,
                fecha_fin: miembro.fecha_fin === null ? undefined : miembro.fecha_fin,
                usuario: {
                    id_Usuario: miembro.usuario.id_Usuario,
                    nombre: miembro.usuario.nombre,
                    email: miembro.usuario.email,
                    telefono: miembro.usuario.telefono
                }
            }));
        } catch (error) {
            console.error('Error fetching usuarios by junta ID:', error);
            throw new Error('Error fetching usuarios by junta ID');
        }
    }
}
