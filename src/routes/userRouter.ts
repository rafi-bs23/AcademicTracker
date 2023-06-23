import express from 'express';

import * as userController from '../controllers/userController';
import * as authController from '../controllers/authController';

const router = express.Router();

/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreateRequest'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserCreateResponse'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserCreateRequest:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *         password:
 *           type: string
 *         confirmPassword:
 *           type: string
 *         role:
 *           type: string
 *         oneOf:
 *           - $ref: '#/components/schemas/TeacherCreateRequest'
 *           - $ref: '#/components/schemas/StudentCreateRequest'
 *           - $ref: '#/components/schemas/ParentCreateRequest'
 *       required:
 *         - username
 *         - password
 *         - confirmPassword
 *         - role
 *
 *     TeacherCreateRequest:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         dateOfBirth:
 *           type: string
 *           format: date
 *         gender:
 *           type: string
 *         phone:
 *           type: string
 *         address:
 *           type: string
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - dateOfBirth
 *         - gender
 *         - phone
 *         - address
 *
 *     StudentCreateRequest:
 *       type: object
 *       properties:
 *         grade:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         dateOfBirth:
 *           type: string
 *           format: date
 *         gender:
 *           type: string
 *         phone:
 *           type: string
 *         address:
 *           type: string
 *       required:
 *         - grade
 *         - firstName
 *         - lastName
 *         - email
 *         - dateOfBirth
 *         - gender
 *         - phone
 *         - address
 *
 *     ParentCreateRequest:
 *       type: object
 *       properties:
 *         student:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         phone:
 *           type: string
 *         address:
 *           type: string
 *       required:
 *         - student
 *         - firstName
 *         - lastName
 *         - email
 *         - phone
 *         - address
 *
 *     UserCreateResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         data:
 *           oneOf:
 *             - $ref: '#/components/schemas/UserResponse'
 *             - $ref: '#/components/schemas/RoleSpecificUserResponse'
 *
 *     UserResponse:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *         role:
 *           type: string
 *       required:
 *         - username
 *         - role
 *
 *     RoleSpecificUserResponse:
 */

router.post(
  '/create',
  authController.protect,
  authController.restrictTo('admin', 'teacher'),
  userController.createUser
);

/**
 * @swagger
 *  /{role}:
 *    get:
 *      summary: Get all role base user
 *      tags: [User]
 *
 */
router.get('/:role', authController.protect, userController.getAllRolebaseUser);

router.delete(
  '/:id/:role',
  authController.protect,
  authController.restrictTo('admin'),
  userController.deleteUserByIdandRole
);

router.post('/login', authController.login);

export default router;
