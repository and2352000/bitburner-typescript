import { NS } from "@ns";
import { syncRun } from "./lib/syncRun";
import { scanBFS } from "./lib/scanBFS";
import { logger } from "./lib/logger";

//agent: rooter->scp->thug
/** @param {NS} ns */
export async function main(ns: NS) {

    const nodes = await scanBFS(ns, 'home', 8, [])
    logger.debug(ns, nodes)
    ns.killall()
    await syncRun(ns, '/agent/index.js', nodes)
    await syncRun(ns, '/agent/hack.js', nodes)
}
