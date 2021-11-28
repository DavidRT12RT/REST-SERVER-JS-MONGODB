const express  = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server{

    constructor(){
        this.app=express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';//Rutas de mi aplicación
        this.authPath = '/api/auth';
        this.conectarDB();
        this.middlewares();
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    /*Middlewares : funcion que siempre se ejecutara al 
    levantar nuestro servidor*/
    middlewares(){
        //CORS restringir origines , listas negras , blancas , algunos navegadores lo necesitan
        this.app.use(cors());
        /*Lectura y parseo del body ,
        le estamos diciendo que recibira formato json
        cualquier cosa que llegue del fronted lo serializara en json*/
        this.app.use(express.json());
        //Directorio público
        this.app.use(express.static('public'));
    }

    routes(){
        //Definiendo las rutas!
        //Aplicando un middleware para las rutas , es como un middleware condicional
        this.app.use(this.authPath,require('../routes/auth'));
        this.app.use(this.usuariosPath,require('../routes/usuarios'));
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log("Running the application in the port:",this.port);
        });
    }

}
module.exports = Server;