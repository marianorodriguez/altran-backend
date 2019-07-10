import express from 'express';
import controller from './clients.controller';
import auth from '../../middleware/authentication';

const router = express.Router();

router.use(auth.isLogged);
router.get('/byId/:clientId', controller.getOneById);
router.get('/byName/:name', controller.getAllByName);

export default router;
