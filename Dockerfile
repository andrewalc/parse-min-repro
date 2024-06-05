FROM node:20-alpine
# Prepare the project
WORKDIR /src
COPY . /src/
RUN npm install
EXPOSE 1337
CMD ["npm", "start"]