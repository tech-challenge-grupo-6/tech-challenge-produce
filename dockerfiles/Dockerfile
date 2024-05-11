FROM node:20

WORKDIR /app

ENV NODE_ENV=production

RUN chown node:node ./

COPY --from=builder /app/dist /app/
COPY --from=builder /app/node_modules /app/node_modules

USER node

EXPOSE 3000

CMD ["node", "src/index.js"]