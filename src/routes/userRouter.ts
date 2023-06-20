import express from 'express';

import * as userController from '../controllers/userController';
import * as authController from '../controllers/authController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 */

/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user with the provided data.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token with JWT
 *         required: true
 *         type: string
 *       - in: body
 *         name: user
 *         description: User object
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid request body or missing required fields
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Access forbidden
 *       500:
 *         description: Internal server error
 */
router.post(
  '/create',
  authController.protect,
  authController.restrictTo('admin', 'teacher'),
  userController.createUser
);
/**
 * @swagger
 * /user/{role}:
 *   get:
 *     summary: Get all users by role
 *     description: Retrieve all users based on the specified role.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: role
 *         description: Role of the users to retrieve (teachers, students, parents)
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Role not found or invalid role
 *       500:
 *         description: Internal server error
 */
router.get('/:role', authController.protect, userController.getAllRolebaseUser);

/**
 * @swagger
 * /user/{id}/{role}:
 *   delete:
 *     summary: Delete a user by ID and role
 *     description: Delete a user based on the specified ID and role.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the user to delete
 *         required: true
 *         type: string
 *       - in: path
 *         name: role
 *         description: Role of the user to delete (teacher, student, parent)
 *         required: true
 *         type: string
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Role not found or invalid role
 *       500:
 *         description: Internal server error
 */
router.delete(
  '/:id/:role',
  authController.protect,
  authController.restrictTo('admin'),
  userController.deleteUserByIdandRole
);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Authenticate and log in a user with the provided credentials.
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: body
 *         name: credentials
 *         description: User credentials
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Invalid request body or missing required fields
 *       401:
 *         description: Unauthorized access, invalid credentials
 *       500:
 *         description: Internal server error
 */

router.post('/login', authController.login);

export default router;
