FROM node:24.11.0-alpine

ARG POKEMON_API_URL
ENV POKEMON_API_URL=${POKEMON_API_URL}

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "run", "start"]