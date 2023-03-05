import { expect, test, beforeAll, afterAll } from "bun:test";
import { approval } from "./approvals.js";
import { driver } from "./prices.e2e.driver.js";

const port = +(process.env.PORT || "3000");

const app = driver(port);

beforeAll(async () => {
    await app.start();
});

afterAll(() => {
    app.kill();
});

test("does something", async () => {
    expect(await app.getPrices({ type: "1jour" })).toEqual({ cost: 35 });

    await approval("hello").verify();
});
