//Las importaciones de node van antes que las de terceros
/*Importaciones*/
const Server = require('./models/server');
require('dotenv').config();

const server = new Server();
server.listen();



