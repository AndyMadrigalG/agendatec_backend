import { Injectable } from '@nestjs/common';
import { PuntoResponseDto, PuntoType } from './dto/puntos-response.dto';

@Injectable()
export class PuntosService {
  private readonly puntos: PuntoResponseDto[] = [
    {
      id_Punto: 1,
      expositorId: 2,
      tipo: PuntoType.Informativo,
      duracionMin: 30,
      archivos: "undefined",
      titulo: 'Aprobación del acta anterior',
      agendaId: 1,
    },
    {
      id_Punto: 2,
      expositorId: 3,
      tipo: PuntoType.Estrategia,
      duracionMin: 45,
      archivos: '["https://example.com/doc.pdf"]',
      titulo: 'Revisión del presupuesto',
      agendaId: 1,
    },
    {
      id_Punto: 3,
      expositorId: 2,
      tipo: PuntoType.Aprobacion,
      duracionMin: 60,
      archivos: "undefined",
      titulo: 'Decisión sobre nuevos proyectos',
      agendaId: 2,
    },
  ];

  async getPuntos(): Promise<PuntoResponseDto[]> {
    return this.puntos;
  }

  async getPuntosByAgenda(agendaId: number): Promise<PuntoResponseDto[]> {
    return this.puntos.filter(p => p.agendaId === agendaId);
  }

  async getPuntoById(id: number): Promise<PuntoResponseDto | undefined> {
    return this.puntos.find(p => p.id_Punto === id);
  }

  async createPunto(data: Omit<PuntoResponseDto, 'id_Punto'>): Promise<PuntoResponseDto> {
    const nextId = Math.max(...this.puntos.map(p => p.id_Punto), 0) + 1;
    const newPoint: PuntoResponseDto = { id_Punto: nextId, ...data };
    this.puntos.push(newPoint);
    return newPoint;
  }

  async updatePunto(id: number, data: Partial<Omit<PuntoResponseDto, 'id_Punto' | 'agendaId'>>): Promise<PuntoResponseDto | undefined> {
    const index = this.puntos.findIndex(p => p.id_Punto === id);
    if (index === -1) return undefined;
    this.puntos[index] = { ...this.puntos[index], ...data };
    return this.puntos[index];
  }

  async deletePunto(id: number): Promise<boolean> {
    const index = this.puntos.findIndex(p => p.id_Punto === id);
    if (index === -1) return false;
    this.puntos.splice(index, 1);
    return true;
  }
}
