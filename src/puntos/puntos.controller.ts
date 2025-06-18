import { Body, Controller, Delete, HttpStatus, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { PuntosService } from './puntos.service';
import { Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { PuntoResponseDto } from './dto/puntos-response.dto';

    

@Controller('puntos')
export class PuntosController {
    constructor(private puntosService: PuntosService) {}

    @Get()
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiResponse({ status: HttpStatus.OK, description: 'Lista de puntos' })
    async getPuntos(): Promise<PuntoResponseDto[]> {
        return this.puntosService.getPuntos();
    }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiResponse({ status: HttpStatus.OK, description: 'Punto creado exitosamente' })
    async postPunto(@Body() punto: PuntoResponseDto): Promise<PuntoResponseDto> {
        return this.puntosService.postPunto(punto);
    }

    @Delete(':id')
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiResponse({ status: HttpStatus.OK, description: 'Punto eliminado exitosamente' })
    async deletePunto(@Param('id') id: number): Promise<boolean> {
        return this.puntosService.deletePunto(id);
    }

}