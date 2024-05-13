# Use the official Node.js 10 image.
FROM node:14 as build-stage

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json /app/

# Install dependencies
RUN npm install

# Copy the rest of your app's source code
COPY . /app

# Build your app
#RUN npm run build

ENTRYPOINT [ "npm", "start" ]
# # Install serve to run your app
# RUN npm install -g serve

# # Command to serve your app on port 3002
# CMD ["serve", "-s", "build", "-l", "3002"]

# # Stage 2: Serve the app with Nginx
# FROM nginx:stable-alpine AS production-stage
# COPY --from=build-stage /app/build/ /usr/share/nginx/html
# COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]



# # Production stage
# FROM nginx:stable-alpine AS production-stage
# COPY --from=build-stage /app/build/ /usr/share/nginx/html
# COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]