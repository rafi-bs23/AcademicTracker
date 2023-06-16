import express from 'express';

import * as userController from '../controllers/userController';
import * as authController from '../controllers/authController';

const router = express.Router();

//route for creating user
router.post(
  '/create',
  authController.protect,
  authController.restrictTo('admin', 'teacher'),
  userController.createUser
);
router.get('/:role', authController.protect, userController.getAllRolebaseUser);
router.delete(
  '/:id/:role',
  authController.protect,
  authController.restrictTo('admin'),
  userController.deleteUserByIdandRole
);

//route for login user
router.post('/login', authController.login);

export default router;
