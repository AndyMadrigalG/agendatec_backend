import { Controller } from '@nestjs/common';
import { AgendasService } from './agendas.service';
import { Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

    

@Controller('agendas')
export class AgendasController {
    constructor(private agendasService: AgendasService) {}

    @Get()
    @ApiResponse({ status: 200, description: 'Lista de agendas' })
    getAgendas() {
        return this.agendasService.getAgendas();
    }
    

}