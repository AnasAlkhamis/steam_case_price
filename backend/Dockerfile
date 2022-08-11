FROM node:17
WORKDIR /index
COPY package*.json ./ 
#using * it'll include the package-lock.json
RUN npm install
# copy all file to the container
COPY . .
# the port runs on 
EXPOSE 5000
# comand it'll run ower app
CMD ["npm","start"]
