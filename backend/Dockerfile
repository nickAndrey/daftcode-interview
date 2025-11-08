FROM node:24.11.0-alpine AS builder

ARG POKEMON_API_URL
ENV POKEMON_API_URL=${POKEMON_API_URL}

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:24.11.0-alpine AS prod

ARG POKEMON_API_URL
ARG NODE_ENV

ENV POKEMON_API_URL=${POKEMON_API_URL}
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist

CMD ["npm", "run", "start"]