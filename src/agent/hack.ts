import { NS } from "@ns";
import { Node } from "../entity/Node"
import { syncExec, asyncExec } from "../lib/exec";
import { logger } from "/lib/logger";

export async function main(ns: NS) {
    const node = JSON.parse(ns.args[0] as string) as Node
    if (node.children.length === 0) {
        logger.info(ns, 'No available hack servers')
        return
    }
    for (const child of node.children) {
        const hackScriptRam = ns.getScriptRam('/lib/hack.js')
        ns.scriptKill('/lib/hack.js', child.hostname)
        const maxRam = ns.getServerMaxRam(child.hostname)
        const usedRam = ns.getServerUsedRam(child.hostname)
        const freeRam = maxRam - usedRam
        const threads = Math.floor(freeRam / hackScriptRam)
        if(threads <1) continue;
        await syncExec(ns, '/agent/hack.js', child.hostname, 1, child);
        logger.debug(ns, `${node.hostname} Hacking ${child.hostname} with ${threads} threads`)
        await asyncExec(ns, '/lib/hack.js', child.hostname, threads, child.hostname); 
        // logger.debug(ns, `${node.hostname} Hacked ${child.hostname} with ${threads} threads end`)
    }
}
