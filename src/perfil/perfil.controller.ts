import {Body, Controller, Get, Post, Param} from '@nestjs/common';
import {PerfilService, Perfil_Usuario, CrearPerfilUsuarioDto} from './perfil.service';

@Controller('perfil_usuario')
export class PerfilController {
    constructor(private readonly perfilService: PerfilService) {}

    @Get()
    async getPerfilesUsuario(): Promise<Perfil_Usuario[]> {
        return this.perfilService.getPerfiles_Usuario();
    }

    @Get('/:id')
    async getPerfilUsuarioById(@Param('id') id: number) {
        return this.perfilService.getPerfilUsuarioById(Number(id));
    }

    @Post()
    async crearPerfilUsuario(@Body() data: CrearPerfilUsuarioDto) {
        return this.perfilService.crearPerfilUsuario(data);
    }
}