import express from 'express';
import { DatabaseConnection } from '../database/db';
export const router = express.Router();
DatabaseConnection.getInstance();
router.get('/', (_, res) => res.render('index'));
router.get('/login', (_, res) => res.render('login'));
router.get('/register', (_, res) => res.render('register'));