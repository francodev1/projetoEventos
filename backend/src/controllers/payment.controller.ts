import { Request, Response } from 'express';
// import { PrismaClient } from '@prisma/client';
import pagarmeService from '../services/pagarme.service';
import QRCode from 'qrcode';
import { z } from 'zod';

// const prisma = new PrismaClient();

// Schema de validação para checkout
const checkoutSchema = z.object({
  eventId: z.string().uuid(),
  userId: z.string().uuid(),
  creditCard: z.object({
    number: z.string().min(13).max(19),
    holder_name: z.string().min(3),
    exp_month: z.number().min(1).max(12),
    exp_year: z.number().min(2024),
    cvv: z.string().min(3).max(4)
  }),
  customer: z.object({
    name: z.string().min(3),
    email: z.string().email(),
    document: z.string().min(11).max(14),
    document_type: z.enum(['CPF', 'CNPJ']),
    phone: z.object({
      country_code: z.string().default('55'),
      area_code: z.string().min(2).max(2),
      number: z.string().min(8).max(9)
    })
  })
});

export class PaymentController {
  /**
   * CRÍTICO: Checkout transparente com split de pagamento
   * Verifica assinatura do organizador antes de processar
   */
  async checkout(req: Request, res: Response) {
    try {
      // Valida dados de entrada
      const validatedData = checkoutSchema.parse(req.body);
      const { eventId, userId, creditCard, customer } = validatedData;

      // 1. Busca o evento
      const event = await prisma.event.findUnique({
        where: { id: eventId },
        include: {
          organizer: true
        }
      });

      if (!event) {
        return res.status(404).json({
          success: false,
          error: 'Evento não encontrado'
        });
      }

      // 2. CRÍTICO: Verifica se o organizador tem assinatura ativa
      if (event.organizer.subscriptionStatus !== 'ACTIVE') {
        return res.status(403).json({
          success: false,
          error: 'O organizador deste evento não possui assinatura ativa'
        });
      }

      // 3. Verifica se o organizador tem recipient configurado
      if (!event.organizer.pagarmeRecipientId) {
        return res.status(400).json({
          success: false,
          error: 'O organizador não possui conta de recebimento configurada'
        });
      }

      // 4. Verifica capacidade do evento
      if (event.capacity) {
        const ticketCount = await prisma.ticket.count({
          where: {
            eventId: eventId,
            status: { in: ['PAID', 'PENDING'] }
          }
        });

        if (ticketCount >= event.capacity) {
          return res.status(400).json({
            success: false,
            error: 'Evento com capacidade esgotada'
          });
        }
      }

      // 5. Converte preço para centavos
      const amountInCents = Math.round(Number(event.price) * 100);

      // 6. Cria transação com split no Pagar.me
      const transactionResult = await pagarmeService.createTransactionWithSplit({
        amount: amountInCents,
        description: `Ingresso - ${event.title}`,
        creditCard,
        customer,
        organizerRecipientId: event.organizer.pagarmeRecipientId,
        metadata: {
          eventId: event.id,
          userId: userId,
          eventTitle: event.title
        }
      });

      if (!transactionResult.success) {
        return res.status(400).json({
          success: false,
          error: transactionResult.error,
          details: transactionResult.details
        });
      }

      // 7. Gera QR Code único para o ingresso
      const ticketId = crypto.randomUUID();
      const qrCodeData = `FONTECHURCH:${ticketId}:${eventId}:${userId}`;
      const qrCodeImage = await QRCode.toDataURL(qrCodeData);

      // 8. Cria o ticket no banco
      const ticket = await prisma.ticket.create({
        data: {
          id: ticketId,
          qrCode: qrCodeImage,
          status: transactionResult.status === 'paid' ? 'PAID' : 'PENDING',
          purchasePrice: event.price,
          eventId: event.id,
          ownerId: userId,
          transactionId: transactionResult.transactionId
        },
        include: {
          event: true,
          owner: {
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
        message: 'Pagamento processado com sucesso',
        ticket: ticket,
        transaction: {
          id: transactionResult.transactionId,
          status: transactionResult.status
        }
      });

    } catch (error: any) {
      console.error('Erro no checkout:', error);

      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: 'Dados inválidos',
          details: error.errors
        });
      }

      return res.status(500).json({
        success: false,
        error: 'Erro ao processar pagamento',
        message: error.message
      });
    }
  }

  /**
   * Consulta status de um pagamento/ticket
   */
  async getTicketStatus(req: Request, res: Response) {
    try {
      const { ticketId } = req.params;

      const ticket = await prisma.ticket.findUnique({
        where: { id: ticketId },
        include: {
          event: true,
          owner: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      });

      if (!ticket) {
        return res.status(404).json({
          success: false,
          error: 'Ticket não encontrado'
        });
      }

      // Se houver transactionId, consulta status no Pagar.me
      let transactionStatus = null;
      if (ticket.transactionId) {
        const result = await pagarmeService.getTransaction(ticket.transactionId);
        if (result.success) {
          transactionStatus = result.data;
        }
      }

      return res.json({
        success: true,
        ticket,
        transactionStatus
      });

    } catch (error: any) {
      console.error('Erro ao consultar ticket:', error);
      return res.status(500).json({
        success: false,
        error: 'Erro ao consultar ticket'
      });
    }
  }
}

export default new PaymentController();
