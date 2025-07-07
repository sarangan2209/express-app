import { Router } from 'express';
const router = Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 access_token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 */

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'secret') {
    return res.json({ message: 'Login successful', token: 'fake-jwt-token' });
  }

  res.status(401).json({ message: 'Invalid username or password' });
});

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Log out a user
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Logout successful
 */

router.post('/logout', (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

export default router;
