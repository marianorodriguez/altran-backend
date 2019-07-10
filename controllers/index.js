import express from 'express';

import clientRoutes from './clients/clients.router';
import policiesRoutes from './policies/policies.router';

const router = express.Router();

router.use('/clients', clientRoutes);
router.use('/policies', policiesRoutes);

router.get('/ping', (req, res) => {
  res.send('PONG');
});

export default router;
