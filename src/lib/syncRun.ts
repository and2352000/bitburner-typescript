import { NS } from "@ns";

export async function syncRun(ns: NS, script: string, ...args: any[]) {
    const pid = ns.run(script, { threads: 1 }, ...args)

    // eslint-disable-next-line no-constant-condition
    while (true) {
        const allPs = ns.ps()
        const ps = allPs.find(p => p.pid === pid)
        if (!ps)  break
        
        await ns.sleep(50)
    }
}
