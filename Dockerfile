FROM quay.io/matesa/bot:beta
RUN git clone https://github.com/matesa/MatesaWhatsapp.git /root/LyFE/
RUN mv /root/bottus/* /root/matesa/
WORKDIR /root/matesa/
CMD ["node", "bot.js"]
