import { spawn, Subprocess } from "bun";
import pRetry from "p-retry";

export const driver = (port = 3000) => {
    let server: Subprocess;

    const start = async () => {
        server = spawn({
            cmd: ["bun", "prices.ts"],
            env: { PORT: port },
        });
        await pRetry(() => fetch(`localhost:${port}/prices?type=1jour`), {
            minTimeout: 30,
            maxTimeout: 30,
            factor: 1,
            retries: 30,
        });
    };

    const kill = () => server.kill();

    const getPrices = async ({ type }: { type: string }) =>
        (await fetch(`localhost:${port}/prices?type=${type}`)).json();

    return { start, kill, getPrices };
};
