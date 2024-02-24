const net = require('net');


//El siguiente servidor TCP hace algo muy sencillo, de todos los usuarios que se encuentren
//conectados, por asi decirlo, uno puede enviar un mensaje y ese mensaje se reenvia a todos los demas 
//que se encuentren conectados, excepto el que lo envio, se detallará mas del sistema a continuación
const server = net.createServer((socket) => {
  console.log('Usuario conectado');

  socket.setEncoding('utf-8');

  // Aqui se puede gestionar la informacion enviada por el usuario
  socket.on('data', (data) => {
    console.log(`Se recibió el siguiente mensaje del cliente... ${data}`);
    
    // Ahora se reenvia el mensaje recibido a todos los demas usuarios conectados
    server.getConnections((err, connections) => {
      if (!err) {
        connections.forEach((conn) => {
            //Se puede observar claramente que el usuario que envió el mensaje no debe de recibirlo
          if (conn !== socket) {
            conn.write(data);
          }
        });
      }
    });
  });

  // Gestionar la desconexion del usuario
  socket.on('end', () => {
    console.log('Usuario desconectado');
  });
});

const PORT = 3075;
server.listen(PORT, () => {
  console.log(`El servidor esta funcionando en el puerto: ${PORT}`);
});
