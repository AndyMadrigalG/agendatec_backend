import { Injectable } from '@nestjs/common';
import prisma from '../prisma.service';

export interface CrearPerfilUsuarioDto {
    id_Usuario: number;
    id_Tipo_Perfil: number;
    username: string;
}

export interface Perfil_Usuario {
    id_Perfil: number;
    username: string;
    tipoPerfil: string;
    id_Usuario: number;
    nombre: string;
    email: string;
    telefono: string;
}

@Injectable()
export class PerfilService {
    async getPerfiles_Usuario(): Promise<Perfil_Usuario[]> {
        try {
            const perfiles = await prisma.perfil_Usuario.findMany({
                include: {
                    usuario: true,     // Incluye la relación con usuario
                    tipoPerfil: true, // Incluye la relación con tipoPerfil
                },
            });

            return perfiles.map(perfil => ({
                id_Perfil: perfil.id_Perfil,
                username: perfil.username,
                tipoPerfil: perfil.tipoPerfil.descripcion,
                id_Usuario: perfil.usuario.id_Usuario,
                nombre: perfil.usuario.nombre,
                email: perfil.usuario.email,
                telefono: perfil.usuario.telefono,
            }));
        } catch (error) {
            console.error('Error al obtener perfiles con información:', error);
            throw new Error('Error al obtener perfiles con información');
        }
    }

    async crearPerfilUsuario(data: CrearPerfilUsuarioDto): Promise<any> {
        try {
            const nuevoPerfil = await prisma.perfil_Usuario.create({
                data: {
                    adaptado_Id: data.id_Usuario,
                    tipoPerfilId: data.id_Tipo_Perfil,
                    username: data.username,
                },
            });
            return nuevoPerfil;
        } catch (error) {
            console.error('Error al crear un nuevo perfil de usuario:', error);
            throw new Error('No se pudo crear el perfil de usuario.');
        }
    }

    async getPerfilUsuarioById(id: number): Promise<Perfil_Usuario> {
        try {
            const perfil = await prisma.perfil_Usuario.findUnique({
                where: { id_Perfil: id },
                include: {
                    usuario: true,
                    tipoPerfil: true,
                },
            });

            if (!perfil) {
                throw new Error(`Perfil de usuario con ID ${id} no encontrado.`);
            }

            return {
                id_Perfil: perfil.id_Perfil,
                username: perfil.username,
                tipoPerfil: perfil.tipoPerfil.descripcion,
                id_Usuario: perfil.usuario.id_Usuario,
                nombre: perfil.usuario.nombre,
                email: perfil.usuario.email,
                telefono: perfil.usuario.telefono,
            };
        } catch (error) {
            console.error('Error al obtener perfil de usuario por ID:', error);
            throw new Error('No se pudo obtener el perfil de usuario.');
        }
    }

}