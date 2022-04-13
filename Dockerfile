FROM node:lts-buster

RUN git clone https://phaticusthiccy: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@github.com/matesa/MatesaWhatsapp /root/MatesaWhatsapp

COPY package.json .

ENV TZ=Europe/Istanbul

RUN npm install supervisor -gcli

RUN yarn install --no-audit

COPY . .

EXPOSE 5000

CMD ["node", "bot.js"]
