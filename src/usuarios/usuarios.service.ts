import { Injectable } from '@nestjs/common';
import { UsuariosResponseDto } from './dto/usuarios-response.dto';

@Injectable()
export class UsuariosService {
    async getUsuarios(){
        const usuarios: UsuariosResponseDto[] = [
            {
                id: 1,
                nombre: 'Usuario 1',
                email: 'usuario1@example.com',
                telefono: '1234567890'
            },
            {
                id: 2,
                nombre: 'Usuario 2',
                email: 'usuario2@example.com',
                telefono: '0987654321'
            },
            {
                id: 3,
                nombre: 'Usuario 3',
                email: 'usuario3@example.com',
                telefono: '1122334455'
            }
        ];

        return usuarios.map(usuario => {
            return {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email,
                telefono: usuario.telefono
            };
        });
    }
}

