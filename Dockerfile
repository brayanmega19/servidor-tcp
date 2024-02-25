# Okay, se utiliza node
FROM node:14

# Se crea un directorio
WORKDIR /app

# Crear el json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el codigo del servidor en el contenedor
COPY server.js .

# Mostrar el puerto
EXPOSE 3075

# Comando para correr el script
CMD ["node", "server.js"]