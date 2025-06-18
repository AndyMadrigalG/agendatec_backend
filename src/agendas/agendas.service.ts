import { Injectable } from '@nestjs/common';
import { AgendasResponseDto } from './dto/agendas-response.dto';
import prisma from '../prisma.service';
import { PuntoResponseDto } from 'src/puntos/dto/puntos-response.dto';

@Injectable()
export class AgendasService {
  async postAgenda(agenda: AgendasResponseDto): Promise<AgendasResponseDto> {
    const createdAgenda = await prisma.agenda.create({
      data: {
        numero: agenda.numero,
        tipo: agenda.tipo,
        fechaHora: agenda.fechaHora,
        lugar: agenda.lugar,
      },
    });

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
          Punto_Aprobacion: true,
          Punto_Informativo: true,
          Punto_Estrategia: true,
          Punto_Varios: true,
        },
      });

      return puntos.map(punto => ({
        id_Punto: punto.id_Punto,
        numeracion: punto.numeracion,
        expositorId: punto.expositorId,
        tipo: punto.tipo,
        duracionMin: punto.duracionMin,
        cuerpo: punto.cuerpo,
        archivos: punto.archivos,
        enunciado: punto.enunciado,
        agendaId: punto.agendaId,
        Punto_Aprobacion: punto.Punto_Aprobacion,
        Punto_Informativo: punto.Punto_Informativo,
        Punto_Estrategia: punto.Punto_Estrategia,
        Punto_Propuesta: punto.Punto_Varios,
      }));
    } catch (error) {
      console.error('Error fetching puntos by agenda ID:', error);
      throw new Error('Could not fetch puntos by agenda ID');
    }
  }

}