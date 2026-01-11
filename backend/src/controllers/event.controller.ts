import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const createEventSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  price: z.number().min(0),
  date: z.string().datetime(),
  location: z.string().min(3),
  bannerUrl: z.string().url().optional(),
  capacity: z.number().min(1).optional(),
  createdBy: z.string().uuid()
});

export class EventController {
  /**
   * CRÍTICO: Cria evento apenas se organizador tem assinatura ativa
   */
  async create(req: Request, res: Response) {
    try {
      const validatedData = createEventSchema.parse(req.body);

      // Verifica se o usuário existe e tem assinatura ativa
      const user = await prisma.user.findUnique({
        where: { id: validatedData.createdBy }
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'Usuário não encontrado'
        });
      }

      // REGRA CRÍTICA: Verifica assinatura ativa
      if (user.subscriptionStatus !== 'ACTIVE') {
        return res.status(403).json({
          success: false,
          error: 'Você precisa de uma assinatura ativa para criar eventos',
          message: 'Assine o plano de R$ 24,90/mês para começar a vender ingressos'
        });
      }

      // Cria o evento
      const event = await prisma.event.create({
        data: {
          title: validatedData.title,
          description: validatedData.description,
          price: validatedData.price,
          date: new Date(validatedData.date),
          location: validatedData.location,
          bannerUrl: validatedData.bannerUrl,
          capacity: validatedData.capacity,
          createdBy: validatedData.createdBy
        },
        include: {
          organizer: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      });

      return res.status(201).json({
        success: true,
        event
      });

    } catch (error: any) {
      console.error('Erro ao criar evento:', error);

      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: 'Dados inválidos',
          details: error.errors
        });
      }

      return res.status(500).json({
        success: false,
        error: 'Erro ao criar evento'
      });
    }
  }

  /**
   * Lista todos os eventos publicados
   */
  async list(req: Request, res: Response) {
    try {
      const events = await prisma.event.findMany({
        where: { published: true },
        include: {
          organizer: {
            select: {
              id: true,
              name: true
            }
          },
          _count: {
            select: {
              tickets: true
            }
          }
        },
        orderBy: {
          date: 'asc'
        }
      });

      return res.json({
        success: true,
        events
      });

    } catch (error: any) {
      console.error('Erro ao listar eventos:', error);
      return res.status(500).json({
        success: false,
        error: 'Erro ao listar eventos'
      });
    }
  }

  /**
   * Busca evento por ID
   */
  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const event = await prisma.event.findUnique({
        where: { id },
        include: {
          organizer: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          _count: {
            select: {
              tickets: true
            }
          }
        }
      });

      if (!event) {
        return res.status(404).json({
          success: false,
          error: 'Evento não encontrado'
        });
      }

      return res.json({
        success: true,
        event
      });

    } catch (error: any) {
      console.error('Erro ao buscar evento:', error);
      return res.status(500).json({
        success: false,
        error: 'Erro ao buscar evento'
      });
    }
  }
}

export default new EventController();
