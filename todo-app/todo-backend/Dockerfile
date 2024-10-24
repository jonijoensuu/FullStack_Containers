FROM node:20

WORKDIR /usr/src/app

COPY . .

RUN npm ci --omit=dev

ENV NODE_ENV=production

USER node

EXPOSE 3000

CMD ["npm", "start"]