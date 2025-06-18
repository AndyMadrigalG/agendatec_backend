import { Body, Controller, Delete, HttpStatus, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { PuntosService } from './puntos.service';
import { Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { PuntoResponseDto } from './dto/puntos-response.dto';
import { VotacionResponseDto } from './dto/votacion-response.dto';
    

@Controller('puntos')
export class PuntosController {
    constructor(private puntosService: PuntosService) {}

    @Get()
    @ApiResponse({ status: 200, description: 'Lista de puntos' })
    getUsuarios() {
        return this.puntosService.getPuntos();
    }
    

    @Post(':id/votacion')
    @UsePipes(new ValidationPipe({ transform: true }))
    async postVotacion(@Param('id') id_Punto: number): Promise<VotacionResponseDto> {
        return this.puntosService.postVotacion(id_Punto);
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe({ transform: true }))
    async editPunto(@Param('id') id: number, @Body() punto: any): Promise<any> {
        return this.puntosService.editPunto(id, punto);
    }

    @Patch(':id/votacion')
    @UsePipes(new ValidationPipe({ transform: true }))
    async editVotacion(@Param('id') id_Punto: number, @Body() votacion: any): Promise<any> {
        return this.puntosService.editVotacion(id_Punto, votacion);
    }
}