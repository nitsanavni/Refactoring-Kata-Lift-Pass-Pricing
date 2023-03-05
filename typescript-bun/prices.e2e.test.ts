import { inspect } from "bun";
import { beforeAll, afterAll, test } from "bun:test";

import { approval as makeApproval } from "./approvals.js";
import { product as allCombinations } from "./product.js";
import { count } from "./counter.js";

import { driver as appDriver } from "./prices.e2e.driver.js";

const app = appDriver({
    port: +(process.env.PORT || "3007") + (await count()),
});

beforeAll(async () => {
    await app.start();
});

afterAll(() => {
    app.kill();
});

test("coverage with combination approvals", async () => {
    const types = ["1jour", "night"];
    const ages = [undefined, 0, 1, 5, 6, 7, 14, 15, 16, 30, 63, 64, 65, 66];
    const dates = [
        undefined,
        "2019-02-18",
        "2019-02-25",
        "2019-03-04",
        "2019-03-01",
        "2023-02-27",
        "2019-09-02",
        "2019-09-03",
        "2019-02-11",
        "2019-02-12",
        "2018-02-18",
        "2013-02-18",
        "2019-03-18",
    ];

    const approval = makeApproval("e2e-coverage");

    for (const [type, age, date] of allCombinations(types, ages, dates)) {
        approval.add(inspect(await app.getPrices({ type, age, date })));
    }

    if (process.env.UPDATE) {
        await approval.update();
    } else {
        await approval.verify();
    }
});
