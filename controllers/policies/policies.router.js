import express from 'express';
import controller from './policies.controller';
import auth from '../middleware/authentication';

const router = express.Router();

router.use(auth.isLogged);
router.get('/user/:policyId', controller.getUserById);
router.get('/byUsername/:name', controller.getAllByName);

export default router;
