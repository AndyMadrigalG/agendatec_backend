import { Body, Controller, Get, HttpStatus, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { MiembroJuntaService } from './miembroJunta.service';
import { MiembroJuntaDto } from './dto/miembroJunta.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('miembro-junta')
export class MiembroJuntaController {
    constructor(private miembroJuntaService: MiembroJuntaService) {}

    @Get()  // Get todos los miembros de junta
    @ApiResponse({ 
        status: HttpStatus.OK, 
        description: 'Lista de miembros de la junta' 
    })
    getMiembrosJunta()  {
        return this.miembroJuntaService.getMiembrosJunta();
    }

    @Post()         // Registrar un nuevo miembro de la junta
    @UsePipes(new ValidationPipe({transform: true}))
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Registra un nuevo miembro de la junta',
    })
    postMiembroJunta(@Body() miembroJuntaDto: MiembroJuntaDto) {
        return this.miembroJuntaService.postMiembroJunta(miembroJuntaDto);
    }
}
