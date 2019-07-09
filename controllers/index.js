import express from 'express';

import clientRoutes from './clients';
import policiesRoutes from './policies';

const router = express.Router();

router.use('/clients', clientRoutes);
router.use('/policies', policiesRoutes);

router.get('/ping', (req, res) => {
  res.send('PONG');
});

export default router;
