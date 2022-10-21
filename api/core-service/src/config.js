import LokiTransport from "winston-loki";
import * as fs from 'fs';

export const LokiConfig = {
  transports: [
    new LokiTransport({
      host: process.env.LOKI || "http://grafana-loki:3100",
      labels: { module: "http" },
    }),
  ],
};

const arrayWords = await fs.readFileSync('./liste_francais_utf8.txt').toString().split("\n");;
export const WORD = arrayWords[ (new Date().getDate() * 10) ].toUpperCase();

