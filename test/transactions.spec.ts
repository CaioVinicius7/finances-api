import { execSync } from "node:child_process";
import { beforeAll, afterAll, describe, it, expect, beforeEach } from "vitest";
import request from "supertest";

import { app } from "../src/app";

describe("Transactions routes", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    execSync("yarn knex migrate:rollback --all");
    execSync("yarn knex migrate:latest");
  });

  it("Should be able to create a new transaction", async () => {
    const { statusCode } = await request(app.server)
      .post("/transactions")
      .send({
        title: "New transaction",
        amount: 5000,
        type: "credit"
      });

    expect(statusCode).toEqual(201);
  });

  it("Should be able to list all transactions", async () => {
    const createTransactionResponse = await request(app.server)
      .post("/transactions")
      .send({
        title: "New transaction",
        amount: 5000,
        type: "credit"
      });

    const cookies = createTransactionResponse.get("Set-Cookie");

    const { statusCode, body } = await request(app.server)
      .get("/transactions")
      .set("Cookie", cookies);

    expect(statusCode).toEqual(200);
    expect(body.transactions).toEqual([
      expect.objectContaining({
        title: "New transaction",
        amount: 5000
      })
    ]);
  });
});
