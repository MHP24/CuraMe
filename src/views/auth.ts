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
    try {
        const { mail, password } = body;
        if(!mail || !password) {
            return res.render('login', {msg: 'Error: Complete todos los campos.'});
        }

        const userData = await DatabaseConnection.getInstance().executeQuery('SELECT * FROM usuario WHERE email = ?', [mail]);
        if(!userData[0]) {
            return res.render('login', {msg: 'Error: La cuenta no existe.'});
        }
        const { rut, contrasena } = userData[0];

        if(!await bcryptjs.compare(password, contrasena)) {
            return res.render('login', {msg: 'Error: Contraseña incorrecta.'});
        }
    
        const token = jwt.sign({id: rut}, 'KEY_SECRET', {
            expiresIn: process.env.JWT_TOKEN_EXPIRES
        });
    
        const cookieOptions = {
            expires: new Date(Date.now()+90 * 24 * 60 * 60 * 1000),
            httpOnly: true
        };
        res.cookie('jwt', token, cookieOptions);

        if(userData[0].rol === 2) {
            return res.redirect('/admin/users');
        }

        return res.redirect('/home')
    }catch(err) {
        return res.render('login', {msg: 'Error: reintente nuevamente.'});
    }
}

export const isAuthenticated = async (req: any, res: any, next: any) => {

    if(!req.cookies.jwt) {
        return res.redirect('/login');
    }

    try {
        const decode = jwt.verify(req.cookies.jwt, 'KEY_SECRET');
        const { id } = JSON.parse(JSON.stringify(decode));
        const userData = await DatabaseConnection.getInstance().executeQuery('SELECT * FROM usuario WHERE rut = ?', [id]);
        req.user = userData;

        if((req.path).includes('admin') && userData[0].rol !== 2) {
            return res.redirect('/');
        }

        return next();
    } catch (err) {
        console.log(err);
        return next();
    }
}

export const logout = (_: any, res: any) => {
    res.clearCookie('jwt');
    return res.redirect('/');
}