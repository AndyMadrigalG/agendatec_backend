import { Injectable } from '@nestjs/common';
import { AgendasResponseDto } from './dto/agendas-response.dto';
import prisma from '../prisma.service';

@Injectable()
export class AgendasService {
  async postAgenda(agenda: AgendasResponseDto): Promise<AgendasResponseDto> {
    // Crear la agenda en la base de datos
    const createdAgenda = await prisma.agenda.create({
      data: {
        numero: agenda.numero,
        tipo: agenda.tipo,
        fechaHora: agenda.fechaHora,
        lugar: agenda.lugar,
      },
    });

    // Retornar la agenda creada
    return {
      id_Agenda: createdAgenda.id_Agenda,
      numero: createdAgenda.numero,
      tipo: createdAgenda.tipo,
      fechaHora: createdAgenda.fechaHora,
      lugar: createdAgenda.lugar,
    };
  }

  async getAgendas(): Promise<AgendasResponseDto[]> {
    try {
      const agendas = await prisma.agenda.findMany();

      return agendas.map(agenda => ({
        id_Agenda: agenda.id_Agenda,
        numero: agenda.numero,
        tipo: agenda.tipo,
        fechaHora: agenda.fechaHora,
        lugar: agenda.lugar,
      }));

    } catch (error) {
      console.error('Error fetching agendas:', error);
      throw new Error('Could not fetch agendas');
    }
  }

}