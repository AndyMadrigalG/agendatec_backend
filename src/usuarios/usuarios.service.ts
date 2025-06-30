import { Injectable } from '@nestjs/common';
import { UsuariosDto } from './dto/usuarios.dto';
import prisma from '../prisma.service';
import { MiembroJuntaDto } from 'src/miembroJunta/dto/miembroJunta.dto';
import { UsuarioJuntaDto } from 'src/junta/dto/usuarioJunta.dto';

@Injectable()
export class UsuariosService {

    // Obtener todos los usuarios
    async getUsuarios(): Promise<UsuariosDto[]> {
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

    // Obtener un usuario por ID
    async getUsuarioById(id: number): Promise<UsuariosDto> {
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

    // Eliminar un usuario por ID
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

    // Actualizar un usuario por ID
    async updateUsuario(id: number, data: Partial<UsuariosDto>): Promise<UsuariosDto> {
        try {
            const usuario = await prisma.usuario.update({
                where: { id_Usuario: id },
                data: {
                    ...data
                }
            });

            return {
                id: usuario.id_Usuario,
                nombre: usuario.nombre,
                email: usuario.email,
                telefono: usuario.telefono
            };
        } catch (error) {
            console.error('Error updating usuario:', error);
            throw new Error('Error updating usuario');
        }
    }

    // Verificar si un usuario es miembro de una junta
    async isUsuarioMiembroDeJunta(usuarioId: number): Promise<{ usuariojunta: UsuarioJuntaDto } | null> {
        try {
            const usuario = await prisma.usuario.findUnique({
                where: { id_Usuario: usuarioId },
            });

            if (!usuario) {
                throw new Error('Usuario no encontrado');
            }
            
            const miembroDeJunta = await prisma.miembro_De_Junta.findFirst({
                where: { usuario_id: usuarioId },
                include: {
                    usuario: true 
                }
            });

            if (!miembroDeJunta) {
                return null; 
            }

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



