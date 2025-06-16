import { Controller, UseGuards } from '@nestjs/common';
import { AgendasService } from './agendas.service';
import { Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { FirebaseAuthGuard } from "../auth/firebase-auth.guard";

@Controller('agendas')
export class AgendasController {
    constructor(private agendasService: AgendasService) {}

    @Get()
    @UseGuards(FirebaseAuthGuard)
    @ApiResponse({ status: 200, description: 'Lista de agendas' })
    getAgendas() {
        return this.agendasService.getAgendas();
    }
    

}