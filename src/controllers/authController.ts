import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import { DatabaseConnection } from '../database/db';

export const register = async ({ body }: any, res: any) => {
    const { rut, name, lastname, phone, address, mail, password } = body;
    const passwordHash = await bcryptjs.hash(password, 8);
    try {
        /* User query */
        DatabaseConnection.getInstance().doQuery('INSERT INTO usuario VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [+rut, 1, name, lastname, +phone, mail, passwordHash, address, 1, 1]);
        /* Patient query */
        DatabaseConnection.getInstance().doQuery('INSERT INTO paciente (id_prevision, rut) VALUES(?, ?)',
        [1, +rut]);
    }catch(err) {
        console.log(err);
    }
    res.redirect('/login');
}

export const login = async ({ body }: any, res: any) => {
    const { mail, password } = body;
    if(!mail || !password) {
        res.render('login', {msg: 'Error, complete todos los campos.'});
        return;
    }
    const userData = await DatabaseConnection.getInstance().executeQuery('SELECT * FROM usuario WHERE email = ?', [mail]);
    const { rut } = userData[0];

    const token = jwt.sign({id: rut}, 'KEY_SECRET', {
        expiresIn: process.env.JWT_TOKEN_EXPIRES
    });

    const cookieOptions = {
        expires: new Date(Date.now()+90 * 24 * 60 * 60 * 1000),
        httpOnly: true
    };

    res.cookie('jwt', token, cookieOptions);
    res.redirect('/admin');
}

export const logout = (_: any, res: any) => {
    res.clearCookie('jwt');
    return res.redirect('/');
}