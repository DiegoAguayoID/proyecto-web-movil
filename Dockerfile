# ETAPA 1: Construcción
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# ETAPA 2: Servidor Web (Nginx)
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# --- ESTO ES LO QUE FALTA ---
# Copiamos un archivo de configuración para Nginx que arregla el 404
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf
# ----------------------------

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]