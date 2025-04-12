import { NS } from "@ns";
import { syncRun } from "./lib/syncRun";
/** @param {NS} ns */
export async function main(ns: NS) {
    const hostname = ns.getHostname()
    ns.killall()
    ns.tprintf(`Starting rooter on ${hostname}`)
    await syncRun(ns, '/rooter.js', hostname)
    ns.tprintf(`Daddy is active on ${hostname}`)
    await ns.run('/daddy.js', { threads: 1 }, hostname)
}
