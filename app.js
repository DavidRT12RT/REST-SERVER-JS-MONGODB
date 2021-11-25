//Las importaciones de node van antes que las de terceros
/*Importaciones*/
require('dotenv').config();
const Server = require('./models/server');

const server = new Server();
server.listen();



