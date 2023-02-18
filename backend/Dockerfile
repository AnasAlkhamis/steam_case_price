FROM node
WORKDIR /app
COPY package.json . 
#using * it'll include the package-lock.json
RUN npm install
# copy all files from current directory to the container directory
COPY . .
# this is the port that container will use for connection inside docker container
ENV PORT 5000
EXPOSE $PORT

# comand it'll run ower app
CMD ["npm","run","dev"]
