const { router, baseRouter } = require("./baseRouter");
const userController = require("../controllers/userController");
const { ROLE_ENUM, METHOD_ENUM } = require("../utils/enumSystem");
const tryCatch = require("../helper/tryCatch");
/**
 * @swagger
 * /api/user/{username}:
 *   get:
 *     summary: Get user profile by username
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       404:
 *         description: User not found
 */
baseRouter(METHOD_ENUM.GET, "/:username", tryCatch(userController.getUserByUsername), { role: ROLE_ENUM.USER }); 

/**
 * @swagger
 * /api/user/register-user:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 */
baseRouter(METHOD_ENUM.POST, "/register-user", tryCatch(userController.register));

/**
 * @swagger
 * /api/user/update-username:
 *   put:
 *     summary: Update username
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newUsername:
 *                 type: string
 *               userId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: User registered successfully
 */
baseRouter(METHOD_ENUM.PUT, "/update-username", tryCatch(userController.updateUserName), { role: ROLE_ENUM.ADMIN });

/**
 * @swagger
 * /api/user/delete-user:
 *   delete:
 *     summary: Delete user by userId
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: User registered successfully
 */
baseRouter(METHOD_ENUM.DELETE, "/delete-user", tryCatch(userController.deleteUser), { role: ROLE_ENUM.ADMIN });

module.exports = router;