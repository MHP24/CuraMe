import express, { Response } from 'express';
import { register, login, logout, isAuthenticated } from '../views/auth';
import { addUser, adminUsers, createUser, deleteUser, updateMenu, updateUser } from '../views/admin-users';
import { profile } from '../views/users';

export const router = express.Router();

router.get('/', (_, res: Response) => res.render('index'));
router.get('/login', (_, res: Response) => res.render('login', {msg: ''}));
router.post('/login', login);
router.get('/register', (_, res: Response) => res.render('register'));
router.post('/register', register);
router.get('/logout', logout);
router.get('/admin/users', isAuthenticated, adminUsers);
router.get('/admin/create-user', addUser);
router.post('/admin/create-user', createUser);
router.get('/admin/delete-user/:rut', deleteUser);
router.get('/admin/edit-user/:rut', updateMenu);
router.post('/update-user/:rut', updateUser);
router.get('/admin/payment/1', (_, res: Response) => res.render('payment'));
router.get('/admin/payment/2', (_, res: Response) => res.render('payment-2'));
router.get('/admin/payment/3', (_, res: Response) => res.render('payment-3'));
router.get('/admin/bills', (_, res: Response) => res.render('bills'));
router.get('/doc-profile', (_, res: Response) => res.render('doc-profile'));
router.get('/admin/docs', (_, res: Response) => res.render('docs'));
router.get('/profile', isAuthenticated, profile);
router.get('/admin/schedule', (_, res: Response) => res.render('schedule'));