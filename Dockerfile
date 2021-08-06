FROM node:14-alpine
RUN mkdir -p project
WORKDIR /project
COPY package.json .
COPY . .
RUN npm install
RUN npm install -g nodemon

