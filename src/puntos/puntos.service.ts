import { Injectable } from '@nestjs/common';
import { PuntoAprobacionResponseDto, PuntoEstrategiaResponseDto, PuntoInformacionResponseDto, PuntoResponseDto, PuntoVariosResponseDto } from './dto/puntos-response.dto';
import prisma from 'src/prisma.service';

@Injectable()
export class PuntosService {

  private tipoPuntoHandlers = {
    aprobacion: async (id_Punto: number) =>
      prisma.punto_Aprobacion.create({
        data: {
          id_Punto,
          votos_a_Favor: 0,
          votos_en_Contra: 0,
          votos_Abstencion: 0,
          acuerdo: '',
        },
      }),
    informativo: async (id_Punto: number) =>
      prisma.punto_Informativo.create({
        data: {
          id_Punto,
          detalles: '',
        },
      }),
    estrategia: async (id_Punto: number) =>
      prisma.punto_Estrategia.create({
        data: {
          id_Punto,
          consideraciones: '',
        },
      }),
    varios: async (id_Punto: number) =>
      prisma.punto_Varios.create({
        data: {
          id_Punto,
          propuesta: '',
        },
      }),
  };

  async deletePunto(id: number): Promise<boolean> {
    try {
      await prisma.punto_Aprobacion.deleteMany({ where: { id_Punto: id } });
      await prisma.punto_Informativo.deleteMany({ where: { id_Punto: id } });
      await prisma.punto_Estrategia.deleteMany({ where: { id_Punto: id } });
      await prisma.punto_Varios.deleteMany({ where: { id_Punto: id }   });

      const punto = await prisma.punto.delete({
        where: { id_Punto: id },
        include: {
          Punto_Aprobacion: true,
          Punto_Informativo: true,
          Punto_Estrategia: true,
          Punto_Varios: true,
        },
      });
      return !!punto;

    } catch (error) {
      console.error('Error deleting punto:', error);
      throw new Error('Could not delete punto');
    }
  }

  async getPuntoById(id: number): Promise<any> {
    try {
      const punto = await prisma.punto.findUnique({
        where: { id_Punto: id },
        include: {
          Punto_Aprobacion: true,
          Punto_Informativo: true,
          Punto_Estrategia: true,
          Punto_Varios: true,
        },
      });

      if (!punto) {
        throw new Error('Punto not found');
      }

      return {
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
        Punto_Varios: punto.Punto_Varios,
      };
    } catch (error) {
      console.error('Error fetching punto by ID:', error);
      throw new Error('Could not fetch punto by ID');
    }
  }

  async getPuntos(): Promise<PuntoResponseDto[]> {
    try {
      const puntos = await prisma.punto.findMany({
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
        Punto_Varios: punto.Punto_Varios,
      }));
    } catch (error) {
      console.error('Error fetching puntos:', error);
      throw new Error('Could not fetch puntos');
    }
  }

  async postPunto(punto: PuntoResponseDto): Promise<any> {
    try {
      const createdPunto = await prisma.punto.create({
        data: {
          expositorId: punto.expositorId,
          numeracion: punto.numeracion,
          tipo: punto.tipo,
          duracionMin: punto.duracionMin,
          cuerpo: punto.cuerpo ?? undefined,
          archivos: punto.archivos,
          enunciado: punto.enunciado,
          agendaId: punto.agendaId,
        },
      });

      const handler = this.tipoPuntoHandlers[createdPunto.tipo];
      if (!handler) {
        throw new Error(`Tipo de punto inválido: ${createdPunto.tipo}`);
      }

      const tipoPunto = await handler(createdPunto.id_Punto);

      return {
        id_Punto: createdPunto.id_Punto,
        numeracion: createdPunto.numeracion,
        expositorId: createdPunto.expositorId,
        tipo: createdPunto.tipo,
        duracionMin: createdPunto.duracionMin,
        cuerpo: createdPunto.cuerpo,
        archivos: createdPunto.archivos,
        enunciado: createdPunto.enunciado,
        agendaId: createdPunto.agendaId,
        tipoPunto: tipoPunto,
      };
    } catch (error) {
      console.error('Error creating punto:', error);
      throw new Error('Could not create punto');
    }
  }
}
