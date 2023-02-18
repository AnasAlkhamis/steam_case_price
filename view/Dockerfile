FROM node 
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
# PATH /app/node_modules/.bin:$PATH => ??? PATH /app/node_modules/.bin:$PATH
COPY package.json .
COPY package-lock.json .
RUN npm install 
# --silent =>??? v
RUN npm install react-scripts@5.0.1 -g 
# --silent
COPY . .
EXPOSE 3000
CMD ["npm","start"]
