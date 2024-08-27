# Use an official node image as the build environment
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install

# Copy app source code
COPY . ./

# Build the app
RUN yarn build

# Use an official Nginx image as the base
FROM nginx:alpine

# Copy built assets from build stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
