import LokiTransport from "winston-loki";

export const LokiConfig = {
  transports: [
    new LokiTransport({
      host: process.env.LOKI || "http://grafana-loki:3100",
      labels: { module: "http" },
    }),
  ],
};

export const WORD = "TEST";
export const ATTEMPT_LIMIT = 5;
