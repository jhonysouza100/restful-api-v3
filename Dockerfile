FROM node:23-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install && npm cache clean --force

COPY . .

# Define las variables de entorno
ENV NODE_ENV=production

# Build de producción
RUN npm run build

# EXPOSE 3000
EXPOSE 3000

# Solo ejecutar el servidor en el arranque
CMD ["npm", "start"]