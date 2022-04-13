{
  "name": "MatesaWhatsapp",
  "version": "2.5.1",
  "description": "Özelleştirilebilir WhatsApp Botu",
  "depecrated": false,
  "main": "index.js",
  "directories": {
    "lib": "lib",
    "src": "src",
    "plugins": "plugins"
  },
  "scripts": {
    "start": "nodemon -x node index.js || touch index.js",
    "test": "node test.js"
  },
  "nodemonConfig": {
    "ext": "js,html,sh"
  },
  "keywords": [
    "termux-whatsapp-bot",
    "MatesaWhatsapp",
    "whatsapp",
    "js-whatsapp"
  ],
  "homepage": "https://github.com/matesa/MatesaWhatsapp",
  "author": {
    "name": "matesa"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/matesa/MatesaWhatsapp.git"
  },
  "bugs": {
    "url": "https://github.com/matesa/MatesaWhatsapp/issues"
  },
  "license": "GPL-3.0-or-later",
  "dependencies": {
    "@adiwajshing/baileys": "github:melcanz/baileys",
    "awesome-phonenumber": "^2.54.0",
    "brainly-scraper-v2": "^2.0.4-1",
    "cfonts": "^2.9.3",
    "chalk": "^4.1.1",
    "cheerio": "^1.0.0-rc.5",
    "colors": "1.4.0",
    "express": "^4.17.1",
    "file-type": "^16.5.2",
    "form-data": "^4.0.0",
    "g-i-s": "^2.1.6",
    "google-it": "^1.6.2",
    "got": "^11.8.2",
    "human-readable": "^0.2.1",
    "jsbarcode": "^3.11.4",
    "jsdom": "^16.6.0",
    "lodash": "^4.17.21",
    "lowdb": "^2.1.0",
    "node-fetch": "^2.6.1",
    "node-gtts": "^2.0.2",
    "node-webpmux": "^3.1.0",
    "nodemon": "^2.0.13",
    "mongoose": "^6.0.11",
    "qrcode": "^1.4.4",
    "qrcode-terminal": "^0.12.0",
    "similarity": "^1.2.1",
    "socket.io": "^4.1.3",
    "syntax-error": "^1.4.0",
    "terminal-image": "^2.0.0",
    "translate-google-api": "^1.0.4",
    "url-regex": "^5.0.0",
    "xmldom": "^0.6.0",
    "yargs": "^17.0.1",
    "yt-search": "^2.9.0"
  }
}
