import express from 'express';
import controller from './policies.controller';

const router = express.Router();

router.get('/user/:policyId', controller.getUserById);
router.get('/byUsername/:name', controller.getAllByName);

export default router;
