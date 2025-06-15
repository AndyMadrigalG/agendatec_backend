import { Injectable } from '@nestjs/common';
import { AgendasResponseDto, SessionType, Modalidad } from './dto/agendas-response.dto';
import { PuntoResponseDto, PuntoType } from '../puntos/dto/puntos-response.dto';

@Injectable()
export class AgendasService {
  private readonly agendas: AgendasResponseDto[] = [
    {
      id_Agenda: 1,
      numero: '01-2025',
      tipo: SessionType.Ordinaria,
      fechaHora: '2025-06-20T15:00:00.000Z',
      modalidad: Modalidad.Presencial,
      lugar: 'Sala Principal',
      link: '',
      convocarMiembros: '',
      juntaDirectiva: true,
      puntos: [
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
          archivos: '["https://example.com/doc1.pdf"]',
          titulo: 'Revisión del presupuesto',
          agendaId: 1,
        },
      ],
    },
    {
      id_Agenda: 2,
      numero: '02-2025',
      tipo: SessionType.Extraordinaria,
      fechaHora: '2025-07-05T10:00:00.000Z',
      modalidad: Modalidad.Remota,
      lugar: '',
      link: 'https://zoom.com/abc',
      convocarMiembros: 'correo1@mail.com,correo2@mail.com',
      juntaDirectiva: false,
      puntos: [
        {
          id_Punto: 3,
          expositorId: 4,
          tipo: PuntoType.Aprobacion,
          duracionMin: 60,
          archivos: "undefined",
          titulo: 'Decision sobre nuevos proyectos',
          agendaId: 2,
        },
      ],
    },
  ];

  async getAgendas(): Promise<AgendasResponseDto[]> {
    return this.agendas;
  }

  async getAgendaById(id: number): Promise<AgendasResponseDto | undefined> {
    return this.agendas.find(a => a.id_Agenda === id);
  }

  async createAgenda(data: Omit<AgendasResponseDto, 'id_Agenda' | 'puntos'>): Promise<AgendasResponseDto> {
    const newId = Math.max(...this.agendas.map(a => a.id_Agenda), 0) + 1;
    const newAgenda: AgendasResponseDto = { ...data, id_Agenda: newId, puntos: [] };
    this.agendas.push(newAgenda);
    return newAgenda;
  }

  async updateAgenda(
    id: number,
    data: Partial<Omit<AgendasResponseDto, 'id_Agenda' | 'puntos'>>
  ): Promise<AgendasResponseDto | undefined> {
    const idx = this.agendas.findIndex(a => a.id_Agenda === id);
    if (idx === -1) return undefined;
    this.agendas[idx] = { ...this.agendas[idx], ...data };
    return this.agendas[idx];
  }

  async deleteAgenda(id: number): Promise<boolean> {
    const idx = this.agendas.findIndex(a => a.id_Agenda === id);
    if (idx === -1) return false;
    this.agendas.splice(idx, 1);
    return true;
  }
}
