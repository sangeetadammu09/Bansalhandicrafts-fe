# build the anguular app
FROM node:20-alpine as build

WORKDIR /app
COPY package*.json .
RUN npm install --f
COPY . .
RUN ng build

# serve the angular app with nginx
FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf *

#copy the built angular app from the build stage
COPY --from=build /app/dist/bansalhandicrafts-fe .
EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
