import { Router } from 'express';
import eventController from '../controllers/event.controller';

const router = Router();

/**
 * POST /api/events
 * Cria novo evento (requer assinatura ativa)
 */
router.post('/', (req, res) => eventController.create(req, res));

/**
 * GET /api/events
 * Lista todos os eventos publicados
 */
router.get('/', (req, res) => eventController.list(req, res));

/**
 * GET /api/events/:id
 * Busca evento por ID
 */
router.get('/:id', (req, res) => eventController.getById(req, res));

export { router as eventRoutes };
