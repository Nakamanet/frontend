FROM node:20-alpine

WORKDIR /app

# Installation des dépendances
COPY package*.json ./
RUN npm install

# Copie du code source
COPY . .

EXPOSE 3000

# Commande pour le développement avec rechargement à chaud
CMD ["npm", "run", "dev"]