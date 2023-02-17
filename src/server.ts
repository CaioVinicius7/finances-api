import fastify from "fastify";

import { knex } from "./database";
import { env } from "./env";

const app = fastify();

app.get("/", async () => {
  const transactions = await knex("transactions")
    .select("*")
    .where("amount", 1000);

  return transactions;
});

app
  .listen({
    port: env.PORT
  })
  .then(() => {
    console.log("HTTP Server is Running!");
  });
