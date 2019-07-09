import express from 'express';
import controller from './client.controller';

const router = express.Router();

router.get('/byId/:clientId', controller.getOneById);
router.get('/byName/:name', controller.getAllByName);

export default router;
