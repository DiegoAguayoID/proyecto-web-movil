# Usamos una versión ligera de Node.js
FROM node:18-alpine

# Creamos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos de dependencias primero
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos el resto del código (tu index.js, etc.)
COPY . .

# Exponemos el puerto 3000
EXPOSE 3000

# Comando para iniciar el servidor
CMD ["node", "index.js"]
