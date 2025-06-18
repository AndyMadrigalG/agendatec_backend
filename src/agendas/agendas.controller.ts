import { Controller, Get, Param, UsePipes, ValidationPipe, HttpStatus, Post, Body, Delete } from '@nestjs/common';
import { AgendasService } from './agendas.service';
import { ApiResponse } from '@nestjs/swagger';
import { AgendasResponseDto } from './dto/agendas-response.dto';
import { get } from 'http';
import { PuntoResponseDto } from 'src/puntos/dto/puntos-response.dto';

@Controller('agendas')
export class AgendasController {
    constructor(private agendasService: AgendasService) {}

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiResponse({ status: HttpStatus.CREATED,  description: 'Agenda creada exitosamente' })
    async postAgenda(@Body() agenda: AgendasResponseDto): Promise<AgendasResponseDto> {
        return this.agendasService.postAgenda(agenda);
    }

    @Get()
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiResponse({ status: HttpStatus.OK, description: 'Lista de agendas'})
    async getAgendas(): Promise<AgendasResponseDto[]> {
        return this.agendasService.getAgendas();
    }

    @Get(':id')
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiResponse({ status: HttpStatus.OK, description: 'Agenda encontrada' })
    async getAgendaById(@Param('id') id: number): Promise<AgendasResponseDto | undefined> {
        return this.agendasService.getAgendaById(id);
    }

    @Get(':id/puntos')
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiResponse({ status: HttpStatus.OK, description: 'Lista de puntos de la agenda' })
    async getPuntosByAgendaId(@Param('id') id: number): Promise<PuntoResponseDto[]> {
        return this.agendasService.getPuntosByAgendaId(id);
    }

    @Delete(':id')
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiResponse({ status: HttpStatus.OK, description: 'Agenda eliminada exitosamente' })
    async deleteAgenda(@Param('id') id: number): Promise<boolean> {
        return this.agendasService.deleteAgenda(id);
    }

    @Get(':id/convocados')
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiResponse({ status: HttpStatus.OK, description: 'Lista de convocados de la agenda' })
    async getConvocadosByAgendaId(@Param('id') id: number): Promise<any[]> {
        return this.agendasService.getConvocadosByAgendaId(id);
    }

    @Post(':id/convocados')
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiResponse({ status: HttpStatus.OK, description: 'Convocados añadidos exitosamente' })
    async postConvocados(@Param('id') id: number, @Body() convocados: any[]): Promise<any> {
        return this.agendasService.postConvocados(id, convocados);
    }
}