import { NS } from "@ns";
import { asyncRun } from "./lib/asyncRun";
/** @param {NS} ns */
export async function main(ns: NS) {
    const hostname = ns.args[0] as string
    const hackScriptRam = ns.getScriptRam('/lib/hack.js')
    ns.scriptKill('/lib/hack.js', hostname)

    const maxRam = ns.getServerMaxRam(hostname)
    const usedRam = ns.getServerUsedRam(hostname)
    const freeRam = maxRam - usedRam
    const threads = Math.floor(freeRam / hackScriptRam)
    await asyncRun(ns, '/lib/hack.js', threads, hostname);
}
