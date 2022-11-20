import { DatabaseConnection } from '../database/db';
import bcryptjs from 'bcryptjs';

const insertRoles: any = {
    3: 'INSERT INTO medico (id_especialidad, id_sucursal, rut) VALUES(?, ?, ?);',
    4: 'INSERT INTO secretaria (id_sucursal, rut) VALUES(?, ?);',
    5: 'INSERT INTO cajero (id_sucursal, rut) VALUES(?, ?);'
}

const selectRoles: any = {
    1: 'SELECT * FROM paciente WHERE rut = ?;',
    2: 'SELECT * FROM paciente WHERE rut = ?;',
    3: 'SELECT e.nombre_especialidad, s.direccion FROM medico r JOIN sucursal s ON s.id_sucursal = r.id_sucursal JOIN especialidad e ON r.id_especialidad = e.id_especialidad WHERE r.rut = ? LIMIT 1;',
    4: 'SELECT s.direccion FROM secretaria r JOIN sucursal s on r.id_sucursal = s.id_sucursal WHERE r.rut = ?;',
    5: 'SELECT s.direccion FROM cajero r JOIN sucursal s on r.id_sucursal = s.id_sucursal WHERE r.rut = ?;'
}

const selectOldData: any = {
    3: 'SELECT id_especialidad, id_sucursal FROM medico WHERE rut = ?;',
    4: 'SELECT id_sucursal FROM secretaria WHERE rut = ?;',
    5: 'SELECT id_sucursal FROM cajero WHERE rut = ?;'
}

// const deletRoles: any = {
//     3: 'DELETE FROM medico WHERE rut = ?',
//     4: 'DELETE FROM secretaria WHERE rut = ?',
//     5: 'DELETE FROM cajero WHERE rut = ?'
// }

const role: any = {
    1: 'Paciente',
    2: 'Administrador',
    3: 'Médico',
    4: 'Secretaría',
    5: 'Cajero'
}



export const adminUsers = async ({ user }: any, res: any) => {
    const users = await DatabaseConnection.getInstance().executeQuery('SELECT * FROM usuario', []);
    return res.render('admin-users', { reqUser: user, users });
}

export const addUser = async (_: any, res: any) => {
    const skills = await DatabaseConnection.getInstance().executeQuery('SELECT * FROM especialidad', []);
    const centers = await DatabaseConnection.getInstance().executeQuery('SELECT * FROM sucursal', []);
    res.render('admin-users-data', { skills, centers, msgType: '', msg: '' });
}

export const createUser = async ({ body }: any, res: any) => {
    const skills = await DatabaseConnection.getInstance().executeQuery('SELECT * FROM especialidad', []);
    const centers = await DatabaseConnection.getInstance().executeQuery('SELECT * FROM sucursal', []);

    try {
        const {
            rut, name, lastname, address,
            phone, role, center, skill, mail, password
        } = body;

        if (!rut || !name || !lastname || !address ||
            !phone || !role || !center || !skill || !mail || !password) {
            return res.render('admin-users-data', {
                skills, centers, msgType:
                    'error', msg: 'Error: Complete todos los campos.'
            });
        }

        const passwordHash = await bcryptjs.hash(password, 8);
        DatabaseConnection.getInstance().doQuery('INSERT INTO usuario VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
            +rut, role, name, lastname, +phone, mail, passwordHash, address, +center, 1]);

        let params: String[] = [center, rut];

        if (Number(role) === 3) {
            params = [skill, ...params];
        }

        DatabaseConnection.getInstance().doQuery(getQuery(Number(role), insertRoles), params);
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

export const deleteUser = async ({ params }: any, res: any) => {
    const { rut } = params;
    DatabaseConnection.getInstance().doQuery('UPDATE usuario SET activo = ? WHERE rut = ?', [0, +rut]);
    res.redirect('/admin/users');
}

export const updateMenu = async ({ params }: any, res: any) => {
    const { rut } = params;
    const userData = await DatabaseConnection.getInstance().executeQuery('SELECT * FROM usuario WHERE rut = ?', [rut]);
    const skills = await DatabaseConnection.getInstance().executeQuery('SELECT * FROM especialidad', []);
    const centers = await DatabaseConnection.getInstance().executeQuery('SELECT * FROM sucursal', []);
    const roleData = await DatabaseConnection.getInstance().executeQuery(getQuery(Number(userData[0].rol), selectRoles), rut);
    let sucursal = 'Sin sucursal';
    let especialidad = 'Sin especialidad';

    if (roleData[0].direccion !== undefined) {
        sucursal = roleData[0].direccion;
    }

    if (roleData[0].nombre_especialidad !== undefined) {
        especialidad = roleData[0].nombre_especialidad
    }
    return res.render('admin-users-edit', { userData, skills, centers, roleData, role: role[userData[0].rol], sucursal, especialidad });
}

export const updateUser = async (req: any, res: any) => {
    const { rut } = req.params;
    const { name, lastname, address, role, phone, mail } = req.body
    console.log(req.body);
    const userData = await DatabaseConnection.getInstance().executeQuery('SELECT rol, rut FROM usuario WHERE rut = ?', [rut]);
    const oldRoleData = await DatabaseConnection.getInstance().executeQuery(getQuery(Number(userData[0].rol), selectOldData), rut);

    DatabaseConnection.getInstance().doQuery('UPDATE usuario SET nombre = ?, apellido = ?, telefono = ?, email = ?, direccion = ? WHERE rut = ?', 
    [name, lastname, +phone, mail, address, rut]);

    console.log(oldRoleData);
    // roleHandler(Number(role), userData[0]);
    console.log(role, userData[0]);
    return res.send(role);
}

const getQuery = (role: number, queries: any) => {
    return queries[role];
}

// const roleHandler = (role: number, user: any) => {
//     if(user.rol !== role) {
//         console.log(deletRoles[user.rol]);
//         DatabaseConnection.getInstance().doQuery(deletRoles[user.rol], [user.rut]);
//         console.log(deletRoles[user.rol]);

//     }else {
//         console.log(`NO Cambia de rol ${user.rol} - ${role}`);
//     }
// }