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
            returnEntity = result.recordsets[0];
            console.log("returnEntity",returnEntity);
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
    
    static LlenarForm = async (Perfil) =>{
        const {NombreUsuario, Apellido, Telefono, Mail, fkUsuario, fechaNacimiento} = Perfil
        console.log(Perfil);
        let pool = await sql.connect(config)
        let result = await pool.request()
        .input('pNombreUsuario',sql.NVarChar(4000),NombreUsuario)
        .input('pApellido',sql.NVarChar(4000),Apellido)
        .input('pTelefono',sql.NVarChar(4000),Telefono)
        .input('pMail',sql.NVarChar(4000),Mail)
        .input('pfkUsuario',sql.Int,fkUsuario)
        .input('pFechaNacimiento',sql.Date,fechaNacimiento)
        .query("INSERT INTO Perfil(NombreUsuario,Apellido,Telefono,Mail,fkUsuario,FechaNacimiento) VALUES (@pNombreUsuario, @pApellido, @pTelefono, @pMail,@pfkUsuario,@pFechaNacimiento)")
        
    }

    static UpdateForm = async (Perfil) => {
        const {Id, NombreUsuario, Apellido, Telefono, Mail, fechaNacimiento} = Perfil
        let returnEntity = null;
        console.log("Estoy en: update");
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
                .input("pId", sql.Int, Id)
                .input('pNombreUsuario',sql.NVarChar(4000),NombreUsuario)
                .input('pApellido',sql.NVarChar(4000),Apellido)
                .input('pTelefono',sql.NVarChar(4000),Telefono)
                .input('pMail',sql.NVarChar(4000),Mail)
                .input('pFechaNacimiento',sql.Date,fechaNacimiento)
                .query('UPDATE Perfil SET NombreUsuario = @pNombreUsuario, Apellido = @pApellido, Telefono = @pTelefono, Mail = @pMail, FechaNacimiento = @pFechaNacimiento WHERE Perfil.Id = @pId')
            returnEntity = result.recordsets[0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }


    static BuscarPerfilxIdUsuario = async(Id) =>{
        let returnEntity = null;
        console.log("Estoy buscado el perf");
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
                .input("pId", sql.Int, Id)
                .query("SELECT  NombreUsuario, Apellido, Telefono, Mail, fkUsuario FROM [Perfil] INNER JOIN [Usuario] U on Perfil.fkUsuario = U.Id WHERE [U].Id = @pId");
            returnEntity = result.recordset[0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity
    }
    }


    

