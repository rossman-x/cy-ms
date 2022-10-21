import LokiTransport from "winston-loki";

export const LokiConfig = {
  transports: [
    new LokiTransport({
      host: process.env.LOKI || "http://grafana-loki:3100",
      labels: { module: "http" },
    }),
  ],
};
