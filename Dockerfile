# ETAPA 1: Construcción (Build)
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Compilamos el proyecto de Ionic/React usando Vite
RUN npm run build

# ETAPA 2: Servidor Web (Nginx) para producción
FROM nginx:alpine
# Copiamos la carpeta 'dist' generada en la etapa 1 al servidor web
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
