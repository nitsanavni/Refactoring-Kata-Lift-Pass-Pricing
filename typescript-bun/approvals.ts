import { file, inspect, write } from "bun";
import { expect } from "bun:test";
import { EOL } from "os";

export const approval = (baseName: string) => {
    const things: any[] = [];

    const str = () => things.map(String).join(EOL);
    const approvedFile = () => file(`${baseName}.approved`);
    const approvedText = async () =>
        approvedFile().size == 0 ? "" : await approvedFile().text();

    const add = (thing: any) => things.push(thing);
    const update = () => write(approvedFile(), str());
    const verify = async () => expect(str()).toEqual(await approvedText());

    return { add, update, verify };
};
