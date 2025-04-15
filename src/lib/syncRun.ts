import { NS } from "@ns";

type Arg = string | number | boolean | object

export async function syncRun(ns: NS, script: string, ...args: Arg[]) {
    const a = (args ?? []).map(arg => {
        if (typeof arg === 'object') {
            return JSON.stringify(arg)
        }
        return arg
    })
    const pid = ns.run(script, { threads: 1 }, ...a)

    // eslint-disable-next-line no-constant-condition
    while (true) {
        const allPs = ns.ps()
        const ps = allPs.find(p => p.pid === pid)
        if (!ps) break

        await ns.sleep(50)
    }

}
