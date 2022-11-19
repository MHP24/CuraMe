import express from 'express';
import { register, login, logout, isAuthenticated } from '../controllers/authController';
import { addUser, adminUsers, createUser } from '../controllers/userController';
export const router = express.Router();
router.get('/', (_, res) => res.render('index'));
router.get('/login', (_, res) => res.render('login', {msg: ''}));
router.post('/login', login);
router.get('/register', (_, res) => res.render('register'));
router.post('/register', register);
router.get('/logout', logout);
router.get('/admin/users', isAuthenticated, adminUsers);
router.get('/admin/create-user', addUser);
router.post('/admin/create-user', createUser);
router.get('/admin/edit-user', (_, res) => res.render('admin-users-edit'));
router.get('/admin/payment/1', (_, res) => res.render('payment'));
router.get('/admin/payment/2', (_, res) => res.render('payment-2'));
router.get('/admin/payment/3', (_, res) => res.render('payment-3'));