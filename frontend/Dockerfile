# Use Node 18 standard image for build
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package configurations
COPY package*.json ./

# Install packages
RUN npm install

# Copy application source
COPY . .

# Expose Vite's default dev port
EXPOSE 5173

# Start Vite dev server exposing all interfaces
CMD [ "npm", "run", "dev", "--", "--host" ]
