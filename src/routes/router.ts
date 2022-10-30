import express from 'express';

export const router = express.Router();

router.get('/', (_, res) => res.render('index'));
router.get('/login', (_, res) => res.render('login'));
router.get('/register', (_, res) => res.render('register'));