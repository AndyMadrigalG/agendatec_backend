import { Injectable } from '@nestjs/common';
import { AgendasResponseDto } from './dto/agendas-response.dto';
import prisma from '../prisma.service';
import { PuntoResponseDto } from 'src/puntos/dto/puntos-response.dto';

@Injectable()
export class AgendasService {

  async editEstadoAgenda(id: number, estado: number): Promise< any | undefined> {
    try {

      

      const updatedAgenda = await prisma.agenda.update({
        where: { id_Agenda: id },
        data: {
          estadoId: estado,
        },
      });

      return {
        id_Agenda: updatedAgenda.id_Agenda,
        numero: updatedAgenda.numero,
        tipo: updatedAgenda.tipo,
        fechaHora: ""+updatedAgenda.fechaHora,
        fechaFin: updatedAgenda.fechaFin ? ""+updatedAgenda.fechaFin : null,
        lugar: updatedAgenda.lugar,
        estadoId: updatedAgenda.estadoId,
      };
    }
    catch (error) {
      console.error('Error updating agenda state:', error);
      throw new Error('Could not update agenda state');
    }
  }

  async editAgenda(id: number, agenda: AgendasResponseDto): Promise<AgendasResponseDto | undefined> {
    try {
      const updatedAgenda = await prisma.agenda.update({
        where: { id_Agenda: id },
        data: {
          numero: agenda.numero,
          tipo: agenda.tipo,
          fechaHora: new Date(agenda.fechaHora.replace('T', ' ')),
          lugar: agenda.lugar,
        },
      });

      return {
        id_Agenda: updatedAgenda.id_Agenda,
        numero: updatedAgenda.numero,
        tipo: updatedAgenda.tipo,
        fechaHora: ""+updatedAgenda.fechaHora,
        fechaFin: updatedAgenda.fechaFin ? ""+updatedAgenda.fechaFin : null,
        lugar: updatedAgenda.lugar,
      };
    } catch (error) {
      console.error('Error updating agenda:', error);
      throw new Error('Could not update agenda');
    }
  }

  async postAgenda(agenda: AgendasResponseDto): Promise<AgendasResponseDto> {
    try{
      const datetime = agenda.fechaHora.replace('T',' ')
      const createdAgenda = await prisma.agenda.create({
        data: {
          numero: agenda.numero,
          tipo: agenda.tipo,
          fechaHora: new Date(datetime),
          lugar: agenda.lugar,
        },
      });

      return {
        id_Agenda: createdAgenda.id_Agenda,
        numero: createdAgenda.numero,
        tipo: createdAgenda.tipo,
        fechaHora: ""+createdAgenda.fechaHora,
        fechaFin: createdAgenda.fechaFin ? ""+createdAgenda.fechaFin : null,
        lugar: createdAgenda.lugar,
      };
    } catch (error) {
      console.error('Error creating agenda:', error);
      throw new Error('Could not create agenda');
    }
  }
  
  async getAgendas(): Promise<AgendasResponseDto[]> {
    try {
      const agendas = await prisma.agenda.findMany({
        include: {
          estado: true,
        },
      });

      return agendas.map(agenda => ({
        id_Agenda: agenda.id_Agenda,
        numero: agenda.numero,
        tipo: agenda.tipo,
        fechaHora: ""+agenda.fechaHora,
        fechaFin: agenda.fechaFin ? ""+agenda.fechaFin : null,
        lugar: agenda.lugar,
        estado: agenda.estado.nombre,
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
        include: {
          estado: true, // Incluye el estado de la agenda
        },
      });

      if (!agenda) return undefined;

      return {
        id_Agenda: agenda.id_Agenda,
        numero: agenda.numero,
        tipo: agenda.tipo,
        fechaHora: ""+agenda.fechaHora,
        fechaFin: agenda.fechaFin ? ""+agenda.fechaFin : null,
        lugar: agenda.lugar,
        estado: agenda.estado.nombre,
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

  getConvocadosByAgendaId(agendaId: number): any {
    try {
      const convocados =  prisma.miembrosConvocados.findMany({
        where: { id_Agenda: agendaId },
        include: {
          Convocado: {
            select: {
              nombre: true,
              email: true,
              telefono: true,
            },
          },
        },
      });

      if (!convocados) {
        return [];
      }

      return convocados;

    } catch (error) {
      console.error('Error fetching convocados by agenda ID:', error);
      throw new Error('Could not fetch convocados by agenda ID');
    }
  }

  postConvocados (agendaId: number, convocados: any[]): Promise<any> {
    try {
      return prisma.miembrosConvocados.createMany({
        data: convocados.map(convocado => ({
          id_Agenda: agendaId,
          id_Convocado: convocado.id_Convocado,
        })),
      });
    } catch (error) {
      console.error('Error posting convocados:', error);
      throw new Error('Could not post convocados');
    }
  }


  async deleteAgenda(id: number): Promise<boolean> {
    try {
      const deletedAgenda = await prisma.agenda.delete({
        where: { id_Agenda: id },
      });

      return !!deletedAgenda;

    } catch (error) {
      console.error('Error deleting agenda:', error);
      throw new Error('Could not delete agenda');
    }
  }

}