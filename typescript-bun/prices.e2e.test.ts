import { inspect } from "bun";
import { expect, test, beforeAll, afterAll } from "bun:test";
import { approval as makeApproval } from "./approvals.js";
import { driver } from "./prices.e2e.driver.js";

const port = +(process.env.PORT || "3000");

const app = driver(port);

beforeAll(async () => {
    await app.start();
});

afterAll(() => {
    app.kill();
});

test("coverage", async () => {
    const approval = makeApproval("e2e-coverage");

    approval.add(inspect(await app.getPrices({ type: "1jour" })));

    if (process.env.UPDATE) {
        await approval.update();
    } else {
        await approval.verify();
    }
});
