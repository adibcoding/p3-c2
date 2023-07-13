FROM node:lts-hydrogen

ENV NODE_ENV=production
ENV DATABASE_URL=mongodb+srv://adib1501:K5pCcH9wW83zoI6M@adibcluster.62ujbpn.mongodb.net/

WORKDIR /users

COPY ["package.json", "package-lock.json", "./"]

RUN npm install --production

COPY . .

CMD ["npm", "start"]