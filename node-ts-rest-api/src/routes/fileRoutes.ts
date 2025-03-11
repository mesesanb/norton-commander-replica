import { Router } from 'express';
import { listFiles, getFileDetails } from '../controllers/fileController';

const router = Router();

router.get('/files', listFiles);
router.get('/file', getFileDetails);

export default router;
