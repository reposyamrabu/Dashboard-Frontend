# Stage 1: build
FROM node:22-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: serve via nginx
FROM nginx:alpine

# hapus default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# copy build hasil vite
COPY --from=builder /app/dist /usr/share/nginx/html
