import { Controller, Get, Param, UsePipes, ValidationPipe, HttpStatus, Post, Body, UseGuards } from '@nestjs/common';
import { AgendasService } from './agendas.service';
import { ApiResponse } from '@nestjs/swagger';
import { AgendasResponseDto } from './dto/agendas-response.dto';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { PuntoResponseDto } from 'src/puntos/dto/puntos-response.dto';

@Controller('agendas')
export class AgendasController {
    constructor(private agendasService: AgendasService) {}

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiResponse({ status: HttpStatus.CREATED, type: AgendasResponseDto, description: 'Agenda creada exitosamente' })
    async postAgenda(@Body() agenda: AgendasResponseDto): Promise<AgendasResponseDto> {
        return this.agendasService.postAgenda(agenda);
    }

    @Get()
    @UseGuards(FirebaseAuthGuard)
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiResponse({ status: HttpStatus.OK, type: [AgendasResponseDto], description: 'Lista de agendas' })
    async getAgendas(): Promise<AgendasResponseDto[]> {
        return this.agendasService.getAgendas();
    }

    @Get(':id')
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiResponse({ status: HttpStatus.OK, type: AgendasResponseDto, description: 'Agenda encontrada' })
    async getAgendaById(@Param('id') id: number): Promise<AgendasResponseDto | undefined> {
        return this.agendasService.getAgendaById(id);
    }

    @Get(':id/puntos')
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiResponse({ status: HttpStatus.OK, description: 'Lista de puntos de la agenda' })
    async getPuntosByAgendaId(@Param('id') id: number): Promise<PuntoResponseDto[]> {
        return this.agendasService.getPuntosByAgendaId(id);
    }
}