import { file, write } from "bun";

export const count = async () => {
    const f = file("counter.json");

    let _count = 0;

    if (f.size > 0) {
        const { count, updated } = await f.json();

        if (Date.now() - 3000 < updated) {
            _count = count + 1;
        }
    }

    write(f, JSON.stringify({ count: _count, updated: Date.now() }));

    return _count;
};
