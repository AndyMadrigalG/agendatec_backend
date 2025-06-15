import { Controller, Delete, Param, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

@Controller('usuarios')
export class UsuariosController {
    constructor(private usuariosService: UsuariosService) {}

    @Get()
    @ApiResponse({ status: 200, description: 'Lista de usuarios' })
    getUsuarios() {
        return this.usuariosService.getUsuarios();
    }

    @Get(':id')
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiResponse({ status: 200, description: 'Usuario encontrado' })
    async getUsuarioById(@Param('id') id: string) {
        const numericId = parseInt(id, 10);
        if (isNaN(numericId)) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Formato de ID inválido',
            };
        }
        try {
            const usuario = await this.usuariosService.getUsuarioById(numericId);
            return usuario;
        } catch (error) {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Error al obtener el usuario',
            };
        }
    }

    @Delete(':id')
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiResponse({ status: 200, description: 'Usuario eliminado' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Usuario no encontrado' })
    async deleteUsuario(@Param('id') id: string) {
        const numericId = parseInt(id, 10);
        if (isNaN(numericId)) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Formato de ID inválido',
            };
        }
        const deleted = await this.usuariosService.deleteUsuario(numericId);
        if (!deleted) {
            return {
                statusCode: HttpStatus.NOT_FOUND,
                message: 'Usuario no encontrado',
            };
        }
        return {
            statusCode: HttpStatus.OK,
            message: 'Usuario eliminado',
        };
    }
}