import { DatabaseConnection } from '../database/db';
import bcryptjs from 'bcryptjs';


const roles: any = {
    3: 'INSERT INTO medico (id_especialidad, id_sucursal, rut) VALUES(?, ?, ?);',
    4: 'INSERT INTO secretaria (id_sucursal, rut) VALUES(?, ?);',
    5: 'INSERT INTO cajero (id_sucursal, rut) VALUES(?, ?);'
}

export const adminUsers = ({ user }: any, res: any) => {
    return res.render('admin-users', {reqUser: user});
}

export const addUser = async (_: any, res: any) => {
    const skills = await DatabaseConnection.getInstance().executeQuery('SELECT * FROM especialidad', []);
    const centers = await DatabaseConnection.getInstance().executeQuery('SELECT * FROM sucursal', []);
    res.render('admin-users-data', {skills, centers});
}

const getQuery = (role: number) => {
    return roles[role];
}

export const createUser = async ({body}: any, res: any ) => {
    const { 
        rut, name, lastname, address,
        phone, role, center, skill, mail, password 
    } = body;
    const passwordHash = await bcryptjs.hash(password, 8);
    DatabaseConnection.getInstance().doQuery('INSERT INTO usuario VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
        Number(rut), role, name, lastname, Number(phone), mail, passwordHash, address, Number(center), 1]);

    let params: String[] = [center, rut];

    if(Number(role) === 3) {
        params = [skill, ...params];
    }

    DatabaseConnection.getInstance().doQuery(getQuery(Number(role)), params);
    res.redirect('/admin/users');
}


