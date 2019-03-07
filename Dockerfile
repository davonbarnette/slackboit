FROM node:8
WORKDIR /usr/app
COPY . .
RUN npm install --quiet

CMD ["node", "src/index.js"]

