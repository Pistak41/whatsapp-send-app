import 'dotenv/config';
import qrcode from 'qrcode-terminal';
import { Client } from 'whatsapp-web.js';

const {TIMES, NUMBER, MESSAGE} = process.env;

const client = new Client({
  puppeteer: {
    args: ['--no-sandbox'],
  }
});

client.on("qr", qr => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", async () => {
  console.log(`Enviando '${MESSAGE}' ${TIMES} veces a ${NUMBER}`);

  Promise.all([Array(Number(TIMES)).fill().map(() => client.sendMessage(`${NUMBER}@c.us`, MESSAGE))])
});

client.initialize();
