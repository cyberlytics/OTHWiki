#####
#build the app
#####
FROM node:16.15-bullseye as build

WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

WORKDIR /app

#install and cache app dependencies
COPY package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli

#generate build 
COPY . /app
RUN ng build --output-path=dist

#####
#serve the app
#####
FROM nginx:1.21

#copy build from the 'build env'
COPY --from=build /app/dist /usr/share/nginx/html

#nginx config without ssl
COPY nginx.conf.template /etc/nginx/conf.d/default.conf


EXPOSE 80
EXPOSE 443
CMD ["nginx","-g","daemon off;"]