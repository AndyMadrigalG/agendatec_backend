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
    adaptado_Id: number;
    detallesAdaptado?: any; // Información adicional del adaptado
}

@Injectable()
export class PerfilService {
    async getPerfiles_Usuario(): Promise<Perfil_Usuario[]> {
        try {
            const perfiles = await prisma.perfil_Usuario.findMany({
                include: {
                    tipoPerfil: true,
                },
            });

            const perfilesConDetalles = await Promise.all(
                perfiles.map(async (perfil) => {
                    const detallesAdaptado = await this.procesarAdaptadoId(
                        perfil.adaptado_Id,
                        perfil.tipoPerfil.descripcion
                    );

                    return {
                        id_Perfil: perfil.id_Perfil,
                        username: perfil.username,
                        tipoPerfil: perfil.tipoPerfil.descripcion,
                        adaptado_Id: perfil.adaptado_Id,
                        detallesAdaptado,
                    };
                })
            );

            return perfilesConDetalles;
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
                    tipoPerfil: true,
                },
            });

            if (!perfil) {
                throw new Error(`Perfil de usuario con ID ${id} no encontrado.`);
            }

            const detallesAdaptado = await this.procesarAdaptadoId(
                perfil.adaptado_Id,
                perfil.tipoPerfil.descripcion
            );

            return {
                id_Perfil: perfil.id_Perfil,
                username: perfil.username,
                tipoPerfil: perfil.tipoPerfil.descripcion,
                adaptado_Id: perfil.adaptado_Id,
                detallesAdaptado,
            };
        } catch (error) {
            console.error('Error al obtener perfil de usuario por ID:', error);
            throw new Error('No se pudo obtener el perfil de usuario.');
        }
    }

    async procesarAdaptadoId(adaptado_id: number, tipo_perfil: string): Promise<any> {
        try {
            let resultado;

            if (tipo_perfil === 'Admin') {
                resultado = await prisma.usuario.findUnique({
                    where: { id_Usuario: adaptado_id },
                });

                if (!resultado) {
                    throw new Error(`Usuario con ID ${adaptado_id} no encontrado.`);
                }
            } else if (tipo_perfil === 'Miembro De Junta') {
                resultado = await prisma.miembro_De_Junta.findUnique({
                    where: { id_Miembro_De_Junta: adaptado_id },
                    include: {
                        usuario: true,
                    },
                });

                if (!resultado) {
                    throw new Error(`Miembro de junta con ID ${adaptado_id} no encontrado.`);
                }
            } else {
                throw new Error(`Error al obtener perfil`);
            }

            return resultado;
        } catch (error) {
            console.error('Error al procesar adaptado_Id:', error);
            throw new Error('No se pudo procesar el adaptado_Id.');
        }
    }
}