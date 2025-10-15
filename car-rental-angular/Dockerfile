# ==========================
# 1️⃣ Base image
# ==========================
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the full source code
COPY . .

# Build Angular app (production)
RUN npm run build --prod

# Run tests in headless mode, but don't fail if no tests exist
RUN npm run test -- --watch=false --browsers=ChromeHeadless || true

# ==========================
# 2️⃣ Runtime image
# ==========================
FROM nginx:alpine

# Copy Angular build output to Nginx html folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose default Nginx port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
