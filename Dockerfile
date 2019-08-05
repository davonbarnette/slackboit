FROM node:8
WORKDIR /usr/app/backend
COPY ./backend/package.json .
RUN npm install --quiet
COPY ./backend .
RUN ["chmod", "+x", "run.sh"]

ENV NODE_ENV=production

CMD ["./run.sh"]