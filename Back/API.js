import config from './dbconfig.js';
import sql from 'mssql';

export class Usuario {

    static Login = async (nombre, contrasenia) => {
        console.log("Estoy en log-in", nombre, contrasenia);
        let returnEntity = null;
        try {
            console.log("config:",config)
            let pool = await sql.connect(config)
            let result = await pool.request()
                .input("pNombre", sql.NVarChar(4000), nombre)
                .input("pContrasenia", sql.NVarChar(4000), contrasenia)
                .query("SELECT * FROM Usuario WHERE Nombre = @pNombre AND Contrasenia = @pContrasenia");
                console.log("result.recordsets:",result.recordsets)
            returnEntity = result.recordsets[0];
            console.log(returnEntity)
        } catch (error) {
            console.log(error, "");
        }
        console.log("returnEntity:", returnEntity)
        return returnEntity;
    }

    static Register = async (Usuario) => {
        const { nombre, telefono, mail, contrasenia, } = Usuario
        let pool = await sql.connect(config)
        let result = await pool.request()
            .input('Nombre', sql.NVarChar(4000), nombre)
            .input('Telefono', sql.NVarChar(4000), telefono)
            .input('Mail', sql.NVarChar(4000), mail)
            .input('Contrasenia', sql.NVarChar(4000), contrasenia)
            .query('INSERT INTO Usuario (Nombre, Telefono, Mail, Contrasenia) VALUES (@Nombre, @Telefono, @Mail, @Contrasenia)')
    }
}
