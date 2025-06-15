import { Body, Controller, Get, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { JuntaService } from './junta.service';
import { ApiResponse } from '@nestjs/swagger';
import { JuntaDto } from './dto/junta.dto';

@Controller('junta')
export class JuntaController {
    constructor(private juntaService: JuntaService) {}

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Registra una nueva junta',
    })
    postJunta(@Body() juntaDto: JuntaDto) {
        return this.juntaService.postJunta(juntaDto);
    }

    @Get()
    @ApiResponse({ status: 200, description: 'Lista de juntas' })
    getJuntas() {
        return this.juntaService.getJuntas();
    }
}