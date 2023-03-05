import { file, write } from "bun";
import { expect } from "bun:test";
import { EOL } from "os";

export const approval = (baseName: string) => {
    const things: any[] = [];

    const str = () => things.map(String).join(EOL);
    const add = (thing: any) => things.push(thing);
    const approved = () => file(`${baseName}.approved`);
    const received = () => file(`${baseName}.received`);

    const update = () => write(approved(), str());

    const verify = async () => {
        const approvedText =
            approved().size == 0 ? "" : await approved().text();

        expect(str()).toEqual(approvedText);
    };

    return { add, update, verify };
};
