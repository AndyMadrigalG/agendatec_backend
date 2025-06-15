import { Controller } from '@nestjs/common';
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
    

}