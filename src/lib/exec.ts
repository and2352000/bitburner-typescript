import { NS } from "@ns";


type Arg = string | number | boolean | object

export async function syncExec(ns: NS, script: string, targetHostname: string, threads = 1, ...args: Arg[]) {
    const _args = args ?? []
    const pid = await asyncExec(ns, script, targetHostname, threads, ..._args)
    // eslint-disable-next-line no-constant-condition
    while (true) {
        const allPs = ns.ps(targetHostname)
        const ps = allPs.find(p => p.pid === pid)
        if (!ps) break

        await ns.sleep(50)
    }
}


function asyncExec(ns: NS, script: string, targetHostname: string, threads = 1, ...args: Arg[]) {
    const _args = (args ?? []).map(arg => JSON.stringify(arg))
    const pid = ns.exec(script, targetHostname, threads, ..._args)
    return pid
}