import { QueryHI } from '../interfaces/query-handler.interface';

export const insertRoles: QueryHI = {
    1: 'INSERT INTO usuario VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    3: 'INSERT INTO medico (id_especialidad, id_sucursal, rut) VALUES(?, ?, ?);',
    4: 'INSERT INTO secretaria (id_sucursal, rut) VALUES(?, ?);',
    5: 'INSERT INTO cajero (id_sucursal, rut) VALUES(?, ?);'
}

export const selectRoles: QueryHI = {
    1: 'SELECT * FROM paciente WHERE rut = ?;',
    2: 'SELECT * FROM usuario WHERE rut = ?;',
    3: 'SELECT e.nombre_especialidad, s.direccion FROM medico r JOIN sucursal s ON s.id_sucursal = r.id_sucursal JOIN especialidad e ON r.id_especialidad = e.id_especialidad WHERE r.rut = ? LIMIT 1;',
    4: 'SELECT s.direccion FROM secretaria r JOIN sucursal s on r.id_sucursal = s.id_sucursal WHERE r.rut = ?;',
    5: 'SELECT s.direccion FROM cajero r JOIN sucursal s on r.id_sucursal = s.id_sucursal WHERE r.rut = ?;'
}

export const deleteRoles: QueryHI = {
    3: 'DELETE FROM medico WHERE rut = ?',
    4: 'DELETE FROM secretaria WHERE rut = ?',
    5: 'DELETE FROM cajero WHERE rut = ?'
}

export const updateRoles: QueryHI = {
    1: 'UPDATE usuario SET nombre = ?, apellido = ?, telefono = ?, email = ?, direccion = ?, rol = ? WHERE rut = ?',
    3: 'UPDATE medico SET id_especialidad = ?, id_sucursal = ? WHERE rut = ?',
    4: 'UPDATE secretaria SET id_sucursal = ? WHERE rut = ?',
    5: 'UPDATE cajero SET id_sucursal = ? WHERE rut = ?'
}

export const role: QueryHI = {
    1: 'Paciente',
    2: 'Administrador',
    3: 'Médico',
    4: 'Secretaría',
    5: 'Cajero'
}