import { Injectable } from '@nestjs/common';
import { UsuariosResponseDto } from './dto/usuarios-response.dto';
import prisma from '../prisma.service';
import { MiembroJuntaDto } from 'src/miembroJunta/dto/miembroJunta.dto';
import { UsuarioJuntaDto } from 'src/junta/dto/usuarioJunta.dto';

@Injectable()
export class UsuariosService {
    async getUsuarios(): Promise<UsuariosResponseDto[]> {
        try {
            const usuarios = await prisma.usuario.findMany();

            return usuarios.map(usuario => {
                return {
                    id: usuario.id_Usuario,
                    nombre: usuario.nombre,
                    email: usuario.email,
                    telefono: usuario.telefono
                };
            });
        } catch (error) {
            console.error('Error fetching usuarios:', error);
            throw new Error('Error fetching usuarios');
        }
    }

    async getUsuarioById(id: number): Promise<UsuariosResponseDto> {
        try {
            const usuario = await prisma.usuario.findUnique({
                where: { id_Usuario: id }
            });

            if (!usuario) {
                throw new Error('Usuario not found');
            }

            return {
                id: usuario.id_Usuario,
                nombre: usuario.nombre,
                email: usuario.email,
                telefono: usuario.telefono
            };
        } catch (error) {
            console.error('Error fetching usuario by id:', error);
            throw new Error('Error fetching usuario by id');
        }
    }

    async deleteUsuario(id: number): Promise<boolean> {
        try {
            const usuario = await prisma.usuario.delete({
                where: { id_Usuario: id }
            });
            return !!usuario; 
        } catch (error) {
            console.error('Error deleting usuario:', error);
            throw new Error('Error deleting usuario');
        }
    }


    async isUsuarioMiembroDeJunta(usuarioId: number): Promise<{ usuariojunta: UsuarioJuntaDto } | null> {
    try {
        const usuario = await prisma.usuario.findUnique({
            where: { id_Usuario: usuarioId },
        });

        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }
        // Verificar si el usuario es miembro de una junta
        const miembroDeJunta = await prisma.miembro_De_Junta.findFirst({
            where: { usuario_id: usuarioId },
            include: {
                usuario: true // Incluir la información del usuario asociado
            }
        });

        if (!miembroDeJunta) {
            return null; // No es miembro de junta
        }

        // Retornar la información del usuario y del miembro de junta
        return {
            usuariojunta: {
                id_Miembro_De_Junta: miembroDeJunta.id_Miembro_De_Junta,
                usuario_id: miembroDeJunta.usuario_id,
                junta_id: miembroDeJunta.junta_id,
                cargo: miembroDeJunta.cargo,
                fecha_inicio: miembroDeJunta.fecha_inicio,
                fecha_fin: miembroDeJunta.fecha_fin === null ? undefined : miembroDeJunta.fecha_fin,
                usuario: {
                    id_Usuario: miembroDeJunta.usuario.id_Usuario,
                    nombre: miembroDeJunta.usuario.nombre,
                    email: miembroDeJunta.usuario.email,
                    telefono: miembroDeJunta.usuario.telefono
                }
            },
        };
    } catch (error) {
        console.error('Error verificando si el usuario es miembro de junta:', error);
        throw new Error('Error verificando si el usuario es miembro de junta');
    }
}

}



