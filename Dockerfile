# Use the official Nginx image as the base image
FROM nginx:latest

# Install Node.js 23.7.0
RUN apt-get update && \
  apt-get install -y curl && \
  curl -fsSL https://deb.nodesource.com/setup_23.x | bash - && \
  apt-get install -y nodejs

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the NestJS application
RUN npm run build

# Copy the built application to the Nginx html directory
COPY /app/dist /usr/share/nginx/html

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 5001
EXPOSE 5001

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]