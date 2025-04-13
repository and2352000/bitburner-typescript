import { NS } from "@ns";
import { asyncRun } from "./lib/asyncRun";
/** @param {NS} ns */
export async function main(ns: NS) {
    const hostname = ns.getHostname()
    ns.killall()
    ns.tprintf(`Scheduler is active on ${hostname}`)
    await asyncRun(ns, '/scheduler.js', hostname)
    ns.tprintf(`Daddy is active on ${hostname}`)
    await asyncRun(ns, '/daddy.js', hostname)
}
