import { Router } from 'express';

const router = Router();

router.get('/streams/', async (req, res) => {
  res.send('Success');
});

export default router;
