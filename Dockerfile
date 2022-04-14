FROM fusuf/whatsasena:latest
RUN git clone https://github.com/matesa/MatesaWhatsapp.git /root/WhatsAsena/
RUN mv /root/bottus/* /root/WhatsAsena/
WORKDIR /root/WhatsAsena/
ENV TZ=Europe/Istanbul
CMD ["node", "bot.js"]
