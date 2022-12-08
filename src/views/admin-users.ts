import { Request, Response } from 'express';
// import { ReqExtUserI } from '../interfaces/req-extends.interface';
import { DatabaseConnection } from '../models/database/db';
import bcryptjs from 'bcryptjs';
import { insertRoles, selectRoles, deleteRoles, updateRoles, role } from '../utils/utils.module.';

//Renders & forms

export const adminUsers = async ({ user }: any, res: Response) => {
    const users = await DatabaseConnection.getInstance().executeQuery('SELECT * FROM usuario', []);
    return res.render('admin-users', { reqUser: user, users });
}

export const addUser = async (_: Request, res: Response) => {
    const skills = await DatabaseConnection.getInstance().executeQuery('SELECT * FROM especialidad', []);
    const centers = await DatabaseConnection.getInstance().executeQuery('SELECT * FROM sucursal', []);
    res.render('admin-users-data', { skills, centers, msgType: '', msg: '' });
}

export const updateMenu = async ({ params }: Request, res: Response) => {
    const { rut } = params;
    // Data from db
    const userData = await DatabaseConnection.getInstance().executeQuery('SELECT * FROM usuario WHERE rut = ?', [rut]);
    const { rol } = userData[0];
    const skills = await DatabaseConnection.getInstance().executeQuery('SELECT * FROM especialidad', []);
    const centers = await DatabaseConnection.getInstance().executeQuery('SELECT * FROM sucursal', []);
    const roleData = await DatabaseConnection.getInstance().executeQuery(selectRoles[rol], rut);
    const { direccion, nombre_especialidad } = roleData[0];

    // Label manipulation
    let sucursal = 'Sin sucursal';
    let especialidad = 'Sin especialidad';

    if (direccion !== undefined) {
        sucursal = direccion;
    }

    if (nombre_especialidad !== undefined) {
        especialidad = nombre_especialidad;
    }
    return res.render('admin-users-edit', 
    { 
        userData, 
        skills, 
        centers, 
        roleData, 
        role: role[rol], 
        sucursal, 
        especialidad
    });
}

//  CRUD Methods

export const createUser = async ({ body }: Request, res: Response) => {
    const skills = await DatabaseConnection.getInstance().executeQuery('SELECT * FROM especialidad', []);
    const centers = await DatabaseConnection.getInstance().executeQuery('SELECT * FROM sucursal', []);

    try {
        const {
            rut, name, lastname, address,
            phone, role, center, skill, mail, 
            password
        } = body;

        const passwordHash = await bcryptjs.hash(password, 8);
        DatabaseConnection.getInstance().doQuery('INSERT INTO usuario VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
            +rut, role, name, lastname, +phone, mail, passwordHash, address, +center, 1]);

        let params: String[] = [center, rut];

        if (Number(role) === 3) {
            params = [skill, ...params];
        }

        DatabaseConnection.getInstance().doQuery(insertRoles[Number(role)], params);
        return res.render('admin-users-data', {
            skills, centers, msgType:
                'success', msg: 'Usuario agregado correctamente.'
        });
    } catch (err) {
        return res.render('admin-users-data', {
            skills, centers, msgType:
                'error', msg: 'Error: revise los campos o reintente nuevamente.'
        });
    }
}

export const deleteUser = async ({ params }: Request, res: Response) => {
    const { rut } = params;
    DatabaseConnection.getInstance().doQuery('UPDATE usuario SET activo = ? WHERE rut = ?', [0, +rut]);
    res.redirect('/admin/users');
}

export const updateUser = async (req: Request, res: Response) => {
    const { rut } = req.params;
    const { name, lastname, address, phone, mail, role:_role, center, skill } = req.body;
    const role = Number(_role);
    const oldData = await DatabaseConnection.getInstance().executeQuery('SELECT rol, rut FROM usuario WHERE rut = ?', [rut]);
    const { rol: oldRole } = oldData[0];

    // Update user table data
    DatabaseConnection.getInstance().doQuery('UPDATE usuario SET nombre = ?, apellido = ?, telefono = ?, email = ?, direccion = ?, rol = ? WHERE rut = ?', 
    [name, lastname, Number(phone), mail, address, Number(role), rut]);

    // Update role data
    let params: Number[] = [Number(center)];
    if(role == 3 ) {
        params = [Number(skill), ...params];
    }

    if(role !== oldRole) {
        if(oldRole !== 1) {
            DatabaseConnection.getInstance().doQuery(deleteRoles[oldRole], [rut]);
        }
        DatabaseConnection.getInstance().doQuery(insertRoles[role], [...params, rut]);
    }else {
        DatabaseConnection.getInstance().doQuery(updateRoles[role], [...params, rut]);
    }
    return res.redirect('/admin/users');
}