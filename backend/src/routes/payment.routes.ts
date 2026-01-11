import { Router } from 'express';
import paymentController from '../controllers/payment.controller';

const router = Router();

/**
 * POST /api/payments/checkout
 * Processa pagamento de ingresso com split
 */
router.post('/checkout', (req, res) => paymentController.checkout(req, res));

/**
 * GET /api/payments/ticket/:ticketId
 * Consulta status de um ticket
 */
router.get('/ticket/:ticketId', (req, res) => paymentController.getTicketStatus(req, res));

export { router as paymentRoutes };
