FROM fusuf/whatsasena:latest

RUN git clone https://matesa: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@github.com/matesa/MatesaWhatsapp /root/MatesaWhatsapp
WORKDIR /root/MatesaWhatsapp/
ENV TZ=Europe/Istanbul
RUN npm install supervisor -g
RUN yarn install --no-audit

CMD ["node", "bot.js"]
