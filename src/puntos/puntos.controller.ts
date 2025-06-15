import { Controller } from '@nestjs/common';
import { PuntosService } from './puntos.service';
import { Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

    

@Controller('puntos')
export class PuntosController {
    constructor(private puntosService: PuntosService) {}

    @Get()
    @ApiResponse({ status: 200, description: 'Lista de puntos' })
    getUsuarios() {
        return this.puntosService.getPuntos();
    }
    

}