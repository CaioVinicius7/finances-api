import { randomUUID } from "node:crypto";
import { FastifyInstance } from "fastify";
import { z } from "zod";

import { checkSessionIdExists } from "../middlewares/check-session-id-exists";

import { knex } from "../database";

export async function transactionsRoutes(app: FastifyInstance) {
  app.addHook("preHandler", async (req) => {
    console.log(`[${req.method}] ${req.url}`);
  });

  app.get(
    "/",
    {
      preHandler: [checkSessionIdExists]
    },
    async (req) => {
      const { sessionId } = req.cookies;

      const transactions = await knex("transactions")
        .where("session_id", sessionId)
        .select("*");

      return {
        transactions
      };
    }
  );

  app.get(
    "/:id",
    {
      preHandler: [checkSessionIdExists]
    },
    async (req, res) => {
      const getTransactionParamsSchema = z.object({
        id: z.string().uuid()
      });

      const { id } = getTransactionParamsSchema.parse(req.params);

      const { sessionId } = req.cookies;

      const transaction = await knex("transactions")
        .where({
          session_id: sessionId,
          id
        })
        .first();

      if (!transaction) {
        return res.status(404).send({
          message: "A transaction with this id don't exists."
        });
      }

      return {
        transaction
      };
    }
  );

  app.get(
    "/summary",
    {
      preHandler: [checkSessionIdExists]
    },
    async (req) => {
      const { sessionId } = req.cookies;

      const summary = await knex("transactions")
        .where("session_id", sessionId)
        .sum("amount", {
          as: "amount"
        })
        .first();

      return { summary };
    }
  );

  app.post("/", async (req, res) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(["credit", "debit"])
    });

    const { title, amount, type } = createTransactionBodySchema.parse(req.body);

    let sessionId = req.cookies.sessionId;

    if (!sessionId) {
      sessionId = randomUUID();

      res.setCookie("sessionId", sessionId, {
        path: "/",
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 Days (milliseconds)
      });
    }

    await knex("transactions").insert({
      id: randomUUID(),
      title,
      amount: type === "credit" ? amount : amount * -1,
      session_id: sessionId
    });

    return res.status(201).send();
  });
}
