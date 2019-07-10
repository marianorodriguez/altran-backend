import express from 'express';
import controller from './clients.controller';

const router = express.Router();

router.get('/byId/:clientId', controller.getOneById);
router.get('/byName/:name', controller.getAllByName);

export default router;
