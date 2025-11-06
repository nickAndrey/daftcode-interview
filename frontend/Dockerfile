FROM node:24.11.0-alpine

ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD [ "npm", "start" ]