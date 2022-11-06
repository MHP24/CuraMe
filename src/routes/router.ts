import express from 'express';
import { register } from '../controllers/authController';
export const router = express.Router();
router.get('/', (_, res) => res.render('index'));
router.get('/login', (_, res) => res.render('login'));
router.get('/register', (_, res) => res.render('register'));
router.post('/register', register);
router.get('/admin', (_, res) => res.render('admin-users'));