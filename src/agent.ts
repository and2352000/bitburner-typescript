import { NS } from "@ns";
import { syncRun } from "./lib/syncRun";
import { scanBFS } from "./lib/scanBFS";
import { logger } from "./lib/logger";
//agent: rooter->scp->thug
/** @param {NS} ns */
export async function main(ns: NS) {

    const nodes = await scanBFS(ns, 'home', 5, [])
    logger.debug(ns, nodes)
    await syncRun(ns, '/agent/deploy.js', nodes)
    //rooter
    await syncRun(ns, '/agent/rooter.js', nodes)

    // //execute hack if self
    // syncExec(ns, '/lib/hack.js', 'target', 1, 'target')

    // log.debug(ns, hostnames);
}
