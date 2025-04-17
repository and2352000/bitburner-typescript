import { NS } from "@ns";
import { asyncRun } from "./lib/asyncRun";
import { syncRun } from "./lib/syncRun";
/** @param {NS} ns */
export async function main(ns: NS) {
    const hostname = ns.getHostname()
    ns.killall()

    ns.tprintf(`Active hacking agent on ${hostname}`)
    await syncRun(ns, './agent.js')

    ns.tprintf(`Active scheduler on ${hostname}`)
    await asyncRun(ns, '/scheduler.js')
}
