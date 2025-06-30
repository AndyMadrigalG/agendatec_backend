import { Injectable } from '@nestjs/common';
import prisma from "../prisma.service"

@Injectable()
export class TipoPerfilService {

    async getPefiles(): Promise<any[]> {
        try {
            const tipos_perfil = await prisma.tipo_Perfil.findMany();

            return tipos_perfil.map(tipo_perfil => {
                return {
                    id: tipo_perfil.id_Tipo_Perfil,
                    descripcion: tipo_perfil.descripcion
                };
            });
        } catch (error) {
            console.error('Error fetching Tipos de perfil:', error);
            throw new Error('Error fetching Tipos de perfil');
        }
    }

}