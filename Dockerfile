FROM node:14.18.3

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bundle app source
COPY . /usr/src/app

RUN npm install
RUN npm run postinstall

EXPOSE 3000

CMD [ "npm", "run", "dev" ]
