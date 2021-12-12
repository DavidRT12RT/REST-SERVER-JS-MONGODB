const {v4:uuidv4} = require('uuid');
const path = require('path');

const subirArchivo = (files,extensionesValidas=['png','jpg','jpeg','gif'],carpeta='')=>{

    return new Promise((resolve,reject)=>{
        
        const {archivo} = files;
        const nombreCortado= archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length-1];
        if(!extensionesValidas.includes(extension)){
            return reject(`La extension ${extension} NO es valida! ${extensionesValidas}`);
        }

        //Asignando nombre final con identificador unico
        const nombreTemp = uuidv4()+'.'+extension;
        //El path sera              donde me encuentro , ruta,nombre
        const uploadPath = path.join(__dirname,'../uploads/',carpeta,nombreTemp);

        // Use the mv() method to place the file somewhere on your server
        archivo.mv(uploadPath, (err)=>{
            if (err){
                return reject(err);
        }
            resolve(nombreTemp);
            });
        });

    }

module.exports={
    subirArchivo
}