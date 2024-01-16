FROM node:16-alpine

COPY . .

COPY .env ./
RUN npm install
ENV NODE_ENV=prod
CMD ["node", "app.js"]