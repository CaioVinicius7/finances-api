import fastify from "fastify";

import { knex } from "./database";

const app = fastify();

app.get("/", async () => {
  const transactions = await knex("transactions")
    .select("*")
    .where("amount", 1000);

  return transactions;
});

app
  .listen({
    port: 3333
  })
  .then(() => {
    console.log("HTTP Server is Running!");
  });
