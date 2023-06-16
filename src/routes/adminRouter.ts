import express from 'express';

import * as adminController from '../controllers/userController';

const router = express.Router();

router.post('/create', adminController.createUser);

export default router;
