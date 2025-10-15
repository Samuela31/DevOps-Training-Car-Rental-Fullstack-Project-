# Step 1: Build Angular inside Docker
FROM node:20-alpine AS build
LABEL maintainer="Samuela"
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

# Build Angular for development (default)
RUN npx ng build

# Step 2: Serve with Nginx
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*

# Copy Angular build output
COPY --from=build /app/dist/car-rental-angular /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
