import express from 'express';

import * as userController from '../controllers/userController';

const router = express.Router();

router.post('/create', userController.createUser);
router.get('/:role', userController.getAllRolebaseUser);
router.delete('/:id/:role', userController.deleteUserByIdandRole);
// router.get('/:id/:role', userController.getUserById); //provide role based user id and role like: teacher, student, parent, admin

export default router;
