import { Injectable } from '@nestjs/common';
import { JuntaDto } from './dto/junta.dto';
import prisma from 'src/prisma.service';

@Injectable()
export class JuntaService {

    async postJunta(juntaDto: JuntaDto){
        try {
            const junta =  await prisma.junta.create({
                data: {
                    nombre: juntaDto.nombre,
                }
            });
            return junta;
        } catch (error) {
            console.error('Error al registrar la junta:', error);
            throw new Error('Error al registrar la junta');
        }
    }

    async getJuntas(): Promise<JuntaDto[]> {
        try {
            const juntas = await prisma.junta.findMany();

            return juntas.map(junta => {
                return {
                    id_Junta: junta.id_Junta,
                    nombre: junta.nombre
                };
            });
        } catch (error) {
            console.error('Error fetching juntas:', error);
            throw new Error('Error fetching juntas');
        }
    }
}   
