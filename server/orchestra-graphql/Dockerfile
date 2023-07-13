FROM node:lts-hydrogen

ENV NODE_ENV=production
ENV PORT=4000

WORKDIR /orchestra-graphql

COPY ["package.json", "package-lock.json", "./"]

RUN npm install --production

COPY . .

CMD ["npm", "start"]