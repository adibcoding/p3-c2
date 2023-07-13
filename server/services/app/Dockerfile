FROM node:lts-hydrogen

ENV NODE_ENV=production
ENV DATABASE_URL=postgres://postgres:Oeff0xKAdoagFTvu@db.yofkefknlngqemsylbzf.supabase.co:6543/postgres

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install --production

COPY . .

CMD ["npm", "start"]