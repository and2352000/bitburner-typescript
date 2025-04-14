import { NS } from "@ns";
import { asyncRun } from "./lib/asyncRun";
import { syncRun } from "./lib/syncRun";
/** @param {NS} ns */
export async function main(ns: NS) {
    const hostname = ns.getHostname()
    ns.killall()
    ns.tprintf(`Deploying....`)
    syncRun(ns, '/deploy.js', hostname)
    ns.tprintf(`Scheduler is active on ${hostname}`)
    await asyncRun(ns, '/scheduler.js')
    // ns.tprintf(`Daddy is active on ${hostname}`)
    // await asyncRun(ns, '/daddy.js')
}
