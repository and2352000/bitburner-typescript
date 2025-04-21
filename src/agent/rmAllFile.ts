import { NS } from "@ns";
import { Node } from "../entity/Node";
import { logger } from "../lib/logger";
import { syncExec } from '../lib/exec'
import { rmAll } from "../lib/rm";
export async function main(ns: NS) {
    const node = JSON.parse(ns.args[0] as string) as Node
    if (node.children.length === 0) return
    for (const child of node.children) {
        logger.info(ns, `killall ${child.hostname}`)
        await ns.killall(child.hostname)
        await syncExec(ns, '/agent/rmAllFile.js', child.hostname, 1, child)
        await rmAll(ns, child.hostname)
    }
}
