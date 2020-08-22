import express from 'express';

const router = express.Router();
import diagService  from '../services/diagServices';

router.get('/', (_req, res) => {
    res.send(diagService.getEntries());
});



export default router;