const express  = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');


class Server{

    constructor(){
        this.app=express();
        this.port = process.env.PORT;
        this.paths={
            auth:'/api/auth',
            buscar:'/api/buscar',
            categorias:'/api/categorias',
            usuarios:'/api/usuarios',
            productos:'/api/inventario',
            obras:'/api/obras',
            uploads:'/api/uploads',
        };
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

        //FileUpload - carga de archivos
        this.app.use(fileUpload({
            useTempFiles:true,
            tempFileDir:'/tmp/',
            createParentPath:true
        }));
    }

    routes(){
        //Definiendo las rutas!
        //Aplicando un middleware para las rutas , es como un middleware condicional
        this.app.use(this.paths.auth,require('../routes/auth'));
        //this.app.use(this.paths.buscar,require('../routes/buscar'));
        this.app.use(this.paths.categorias,require('../routes/categorias'));

        this.app.use(this.paths.obras,require('../routes/obras'));
        this.app.use(this.paths.usuarios,require('../routes/usuarios'));
        this.app.use(this.paths.productos,require('../routes/productos'));
        this.app.use(this.paths.uploads,require('../routes/uploads'));

        this.app.get('*',(req,res)=>{
            res.status(404).send("404 NOT FOUND!");
        });

    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log("Running the application in the port:",this.port);
        });
    }

}
module.exports = Server;