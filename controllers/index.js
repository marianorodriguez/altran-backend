import express from 'express';

import clientRoutes from './clients';

const router = express.Router();

router.use('/clients', clientRoutes);

router.get('/ping', (req, res) => {
  res.send('PONG');
});

export default router;
