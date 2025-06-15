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
}

