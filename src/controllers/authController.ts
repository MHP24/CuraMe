// import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import { DatabaseConnection } from '../database/db';
// import { promisify } from 'util';

export const register = async ({ body }: any, res: any) => {
    const { rut, name, lastname, phone, address, mail, password } = body;
    const passwordHash = await bcryptjs.hash(password, 8);
    try {
        DatabaseConnection.getInstance().executeQuery('INSERT INTO usuario VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [+rut, 1, name, lastname, +phone, mail, passwordHash, address, 1, 1]);
    }catch(err) {
        console.log(err);
    }
    res.json(body);
}