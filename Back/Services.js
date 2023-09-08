import config from './dbconfig.js';
import sql from 'mssql';

export class Usuario {

    static Login = async (nombre, contrasenia) => {
        console.log("Estoy en log-in", nombre, contrasenia);
        let returnEntity = null;
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
                .input("pNombre", sql.NVarChar(4000), nombre)
                .input("pContrasenia", sql.NVarChar(4000), contrasenia)
                .query("SELECT * FROM Usuario WHERE Nombre = @pNombre AND Contrasenia = @pContrasenia");
            returnEntity = result.recordset[0];
        } catch (error) {
            console.log(error, "");
        }
        return returnEntity;
    }

    static Register = async (Usuario) => {
        const { nombre, contrasenia, } = Usuario
        let pool = await sql.connect(config)
        let result = await pool.request()
            .input('pNombre', sql.NVarChar(4000), nombre)
            .input('pContrasenia', sql.NVarChar(4000), contrasenia)
            .query('INSERT INTO Usuario (Nombre, Contrasenia) VALUES (@pNombre, @pContrasenia)')
    }
}


export class Perfil{
    
    static Register = async (Perfil) =>{
        const {nombreUsuario, apellido, telefono, mail, fechaNacimiento} = Perfil
        let pool = await sql.connect(config)
        let result = await pool.request()
        .input('pNombreUsuario',sql.NVarChar(4000),nombreUsuario)
        .input('pApellido',sql.NVarChar(4000),apellido)
        .input('pTelefono',sql.NVarChar(4000),telefono)
        .input('pMail',sql.NVarChar(4000),mail)
        .input('pFechaNacimiento',sql.Date,fechaNacimiento)
        .query("INSERT INTO Perfil(NombreUsuario,Apellido,Telefono,Mail,FechaNacimiento) VALUES (@pNombreUsuario, @pApellido, @pTelefono, @pMail, @pFechaNacimiento)")
        
    }

    static Update = async (Perfil) => {
        const { Id, nombreUsuario, apellido, telefono, mail, fechaNacimiento} = Perfil
        let returnEntity = null;
        console.log("Estoy en: update");
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
                .input('pNombreUsuario',sql.NVarChar(4000),nombreUsuario)
                .input('pApellido',sql.NVarChar(4000),apellido)
                .input('pTelefono',sql.NVarChar(4000),telefono)
                .input('pMail',sql.NVarChar(4000),mail)
                .input('pFechaNacimiento',sql.Date,fechaNacimiento)
                .query('UPDATE Perfil SET NombreUsuario = @pNombreUsuario, Apellido = @pApellido, Telefono = @pTelefono, Mail = @pMail, FechaNacimiento = @pFechaNacimiento,   WHERE Perfil.Id = @pId')
            returnEntity = result.recordsets[0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

}