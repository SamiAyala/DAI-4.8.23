import express from 'express';
import cors from 'cors';
import {Usuario, Perfil} from './Services.js';
const app = express();
const port = 5000;

console.log("¡Hola Mundo!");


app.use(cors());
app.use(express.json());
app.post('/login',async(req,res) =>{
    try{
        
        console.log("req.body:",req.body)
        const response = await Usuario.Login(req.body.nombre, req.body.contrasenia)
        console.log("response login:",response);
        if (response.length === 0) {
            res.status(401).json({message: "Completar los campos"});
        } else {
            res.status(200).json({usuario: response, message : 'Usuario encontrado'})
        }  
    }catch(error){
        console.log(error)
        res.status(404).json({error : 'No se encontro el usuario'})
    }

})

app.post('/registro',async(req,res) =>{
    try{
        console.log(req.body)
        await Usuario.Register(req.body)
        res.status(201).json({message: 'Usuario registrado'})
    } catch (error){
        console.log(error)
        res.status(500).json({error : 'Fallo el registro'})
    }

})

app.get("/perfil/:Id", async(req,res) => {
    try{
        console.log("req",req.params.Id)
        const perf = await Perfil.BuscarPerfilxIdUsuario(req.params.Id); 
        res.status(200).json(perf);
        
    }
    catch (error){
        console.log(error)
        res.status(500).json({error : 'Algo fallo'})
    }
})

app.post('/formPerfil',async(req,res) =>{
    try{
        console.log("req.body",req.body)
        await Perfil.LlenarForm(req.body)
        res.status(201).json({message: 'Perfil completado'})
    } catch (error){
        console.log(error)
        res.status(500).json({error : 'Algo fallo'})
    }

})

app.put('/perfil/editarForm/:Id',async(req,res) => {
    let perfil = await Perfil.UpdateForm(req.body);
    res.status(201).json({message: 'Perfil cambiado'})
    res.status(202).send(perfil);
})


app.listen(port, () => {
    console.log("Example app listening on port: ", port);
});