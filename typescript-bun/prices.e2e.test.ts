import { inspect } from "bun";
import { test, beforeAll, afterAll } from "bun:test";
import { approval as makeApproval } from "./approvals.js";
import { product as allCombinations } from "./product.js";
import { driver } from "./prices.e2e.driver.js";

const port = +(process.env.PORT || "3000");

const app = driver({ port });

beforeAll(async () => {
    await app.start();
});

afterAll(() => {
    app.kill();
});

test("coverage", async () => {
    const approval = makeApproval("e2e-coverage");

    const types = ["1jour", "night"];

    for (const [type] of allCombinations(types)) {
        approval.add(inspect(await app.getPrices({ type })));
    }

    if (process.env.UPDATE) {
        await approval.update();
    } else {
        await approval.verify();
    }
});
