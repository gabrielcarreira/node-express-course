import { Router } from 'express';
import clientController from '../controllers/clientController';

const router = Router();

router.get('/', clientController.home);
router.get('/clients/', clientController.index);
router.get('/clients/create', clientController.create);
router.post('/clients/', clientController.store);
router.get('/clients/:id', clientController.show);
router.put('/clients/:id', clientController.update);
router.get('/clients/:id/edit', clientController.edit);
router.delete('/clients/:id', clientController.destroy);

export default router;

//``