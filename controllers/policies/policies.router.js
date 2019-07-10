import express from 'express';
import controller from './policies.controller';
import authorization from '../middleware/authorization';
import authentication from '../middleware/authentication';

const router = express.Router();

router.use(
  authentication.isLogged,
  authorization.hasRole('admin'),
);

router.get('/user/:policyId', controller.getUserById);
router.get('/byUsername/:name', controller.getAllByName);

export default router;
