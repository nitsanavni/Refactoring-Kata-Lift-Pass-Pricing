import { spawn, Subprocess } from "bun";
import pRetry from "p-retry";

export const driver = ({ port = 3000 }) => {
    let server: Subprocess;

    const waitForServerToBeUp = () =>
        pRetry(() => fetch(`localhost:${port}/prices?type=1jour`), {
            minTimeout: 30,
            maxTimeout: 30,
            factor: 1,
            retries: 30,
        });

    const start = async () => {
        server = spawn({
            cmd: ["timeout", "2", "bun", "prices.ts"],
            env: { PORT: port, ...process.env },
        });
        await waitForServerToBeUp();
    };

    const kill = () => server.kill();

    const getPrices = async ({
        type,
        age,
        date,
    }: {
        type: string;
        age?: number;
        date?: string;
    }) =>
        (
            await fetch(
                `localhost:${port}/prices?type=${type}${
                    age != undefined ? `&age=${age}` : ""
                }${date ? `&date=${date}` : ""}`
            )
        ).json();

    return { start, kill, getPrices };
};
