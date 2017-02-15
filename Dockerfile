FROM node:boron

RUN apt-get update
RUN apt-get upgrade -y

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
ADD ./package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

# Create cert SSL
RUN npm run ssl

EXPOSE 8080 4433
CMD [ "npm", "start" ]