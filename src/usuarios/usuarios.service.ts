import { Injectable } from '@nestjs/common';
import { UsuariosResponseDto } from './dto/usuarios-response.dto';
import prisma from '../prisma.service';

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
}

