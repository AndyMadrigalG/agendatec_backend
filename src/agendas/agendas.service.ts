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

  async getAgendaById(id: number): Promise<AgendasResponseDto | undefined> {
    try {
      const agenda = await prisma.agenda.findUnique({
        where: { id_Agenda: id },
      });

      if (!agenda) return undefined;

      return {
        id_Agenda: agenda.id_Agenda,
        numero: agenda.numero,
        tipo: agenda.tipo,
        fechaHora: agenda.fechaHora,
        lugar: agenda.lugar,
      };
    } catch (error) {
      console.error('Error fetching agenda by ID:', error);
      throw new Error('Could not fetch agenda by ID');
    }
  }

  async getPuntosByAgendaId(agendaId: number): Promise<PuntoResponseDto[]> {
    try {
      const puntos = await prisma.punto.findMany({
        where: { agendaId: agendaId },
        include: {
          Votacion: true,
        }
      });

      return puntos.map(punto => {
        const puntoResponse: any = { 
          id_Punto: punto.id_Punto,
          expositorId: punto.expositorId,
          numeracion: punto.numeracion,
          tipo: punto.tipo,
          duracionMin: punto.duracionMin,
          enunciado: punto.enunciado,
          archivos: punto.archivos,
          contenido: punto.contenido,
          agendaId: punto.agendaId,
        };

        if (punto.Votacion) {
          puntoResponse.votacion = {
            votos_a_Favor: punto.Votacion.votos_a_Favor,
            votos_en_Contra: punto.Votacion.votos_en_Contra,
            votos_Abstencion: punto.Votacion.votos_Abstencion,
            acuerdo: punto.Votacion.acuerdo,
          };
        }
        return puntoResponse;
      });
    } catch (error) {
      console.error('Error fetching puntos by agenda ID:', error);
      throw new Error('Could not fetch puntos by agenda ID');
    }
  }

}