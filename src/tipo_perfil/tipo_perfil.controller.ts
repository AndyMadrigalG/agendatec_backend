import { Controller, Get } from '@nestjs/common';
import { TipoPerfilService } from './tipo_perfil.service';
import {ApiResponse} from "@nestjs/swagger";

@Controller('tipo_perfil')
export class TipoPerfilController {
    constructor(private readonly tipoPerfilService: TipoPerfilService) {}

    @Get()
    @ApiResponse({ status: 200, description: 'Lista de Tipos de Perfil' })
    async getTipoPerfil() {
        return this.tipoPerfilService.getPefiles();
    }
}