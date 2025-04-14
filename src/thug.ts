import { NS } from "@ns";
import { asyncRun } from "./lib/asyncRun";
/** @param {NS} ns */
export async function main(ns: NS) {
    const arg0 = (ns.args[0] as string)

    const serverHostnames = arg0.split(',')
    if (serverHostnames.length < 1) throw new Error('No hostnames provided')
    const hackScriptRam = ns.getScriptRam('/lib/hack.js')
    let i = 0
    const hostNumber = serverHostnames.length
    const localHostname = ns.getHostname()
    ns.scriptKill('/lib/hack.js', localHostname)

    // eslint-disable-next-line no-constant-condition
    while (true) {
        const hostname = serverHostnames[i % hostNumber];
        const maxRam = ns.getServerMaxRam(localHostname)
        const usedRam = ns.getServerUsedRam(localHostname)
        const freeRam = maxRam - usedRam
        const RESERVED_RAM = 6
        if (freeRam - RESERVED_RAM < hackScriptRam) break;
        await asyncRun(ns, '/lib/hack.js', 1, hostname);
        i++
        await ns.sleep(500)
    }
}
