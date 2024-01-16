FROM node:16-alpine AS builder

COPY package.json ./
COPY package-lock.json ./

COPY . .
RUN apk add --update python3 make g++\
   && rm -rf /var/cache/apk/*

RUN npm install
RUN npm run build

FROM nginx:1.19-alpine AS server
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /build/  /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
