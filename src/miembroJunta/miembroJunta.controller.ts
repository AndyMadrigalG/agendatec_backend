import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
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

    @Patch(':id')  // Modificar un miembro de la junta
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiResponse({ status: HttpStatus.OK, description: 'Miembro de la junta modificado' })
    async updateMiembroJunta(@Param('id') id: string, @Body() data: Partial<MiembroJuntaDto>) {
        const numericId = parseInt(id, 10);
        if (isNaN(numericId)) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Formato de ID inválido',
            };
        }
        try {
            const updatedMiembro = await this.miembroJuntaService.updateMiembroJunta(numericId, data);
            return updatedMiembro;
        } catch (error) {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Error al modificar el miembro de la junta',
            };
        }
    }

    @Delete(':id')  // Eliminar un miembro de la junta
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiResponse({ status: HttpStatus.OK, description: 'Miembro de la junta eliminado' })
    async deleteMiembroJunta(@Param('id') id: string) {
        const numericId = parseInt(id, 10);
        if (isNaN(numericId)) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Formato de ID inválido',
            };
        }
        try {
            await this.miembroJuntaService.deleteMiembroJunta(numericId);
            return {
                statusCode: HttpStatus.OK,
                message: 'Miembro de la junta eliminado correctamente',
            };
        } catch (error) {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Error al eliminar el miembro de la junta',
            };
        }
    }

}
