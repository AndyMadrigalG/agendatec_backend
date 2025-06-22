import { Injectable } from '@nestjs/common';
import { PuntoResponseDto } from './dto/puntos-response.dto';
import prisma from 'src/prisma.service';
import { VotacionResponseDto } from './dto/votacion-response.dto';

@Injectable()
export class PuntosService {

  async deletePunto(id: number): Promise<boolean> {
    try {
      const punto = await prisma.punto.delete({
        where: { id_Punto: id },
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
          Votacion: true,
          archivos: true,
        },
      });

      if (!punto) {
        throw new Error('Punto not found');
      }

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
          id_Punto: punto.Votacion.id_Punto,
          votos_a_Favor: punto.Votacion.votos_a_Favor,
          votos_en_Contra: punto.Votacion.votos_en_Contra,
          votos_Abstencion: punto.Votacion.votos_Abstencion,
          acuerdo: punto.Votacion.acuerdo,
        };
      }

      return puntoResponse;

    } catch (error) {
      console.error('Error fetching punto by ID:', error);
      throw new Error('Could not fetch punto by ID');
    }
  }

  async getPuntos(): Promise<PuntoResponseDto[]> {
    try {
      const puntos = await prisma.punto.findMany({
        include: {
          Votacion: true, 
        },
      });

      if (!puntos || puntos.length === 0) {
        return [];
      }

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
          enunciado: punto.enunciado,
          contenido: punto.contenido,
          agendaId: punto.agendaId,
        },
      });

      return createdPunto;

    } catch (error) {
      console.error('Error creating punto:', error);
      throw new Error('Could not create punto');
    }
  }

  async postVotacion(id_Punto: number): Promise<VotacionResponseDto> {
    try {
      const votacion = await prisma.votacion.create({
        data: {
          id_Punto: id_Punto,
          votos_a_Favor: 0,
          votos_en_Contra: 0,
          votos_Abstencion: 0,
          acuerdo: '',
        },
      });
      return votacion

    } catch (error) {
      console.error('Error creating votacion:', error);
      throw new Error('Could not create votacion');
    }
  }

  async editPunto(id: number, punto: PuntoResponseDto): Promise<any> {
    try {
      const updatedPunto = await prisma.punto.update({
        where: { id_Punto: id },
        data: {
          expositorId: punto.expositorId,
          numeracion: punto.numeracion,
          tipo: punto.tipo,
          duracionMin: punto.duracionMin,
          enunciado: punto.enunciado,
          contenido: punto.contenido,
          agendaId: punto.agendaId,
        },
      });

      return updatedPunto;

    } catch (error) {
      console.error('Error updating punto:', error);
      throw new Error('Could not update punto');
    }
  }

  editVotacion(id_Punto: number, votacion: VotacionResponseDto): Promise<VotacionResponseDto> {
    return prisma.votacion.update({
      where: { id_Punto: id_Punto },
      data: {
        ...votacion,
      },
    });
  }

  getVotaciones(){
    return prisma.votacion.findMany();
  }
}
