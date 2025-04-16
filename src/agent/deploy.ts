import { NS } from "@ns";
import { scpAllLocalFiles } from "../lib/scpAllLocalFiles";
import { Node } from "../entity/Node";
import { logger } from "../lib/logger";
import { syncExec } from '../lib/exec'


export async function deploy(ns: NS, hostname: string) {
    await scpAllLocalFiles(ns, hostname)
}

export async function main(ns: NS) {
    const node = JSON.parse(ns.args[0] as string) as Node
    if (node.children.length === 0) {
        logger.info(ns, 'No available hack servers')
        return
    }
    for (const child of node.children) {
        logger.info(ns, `${child.hostname} deploy`)
        await deploy(ns, child.hostname)
        await syncExec(ns, '/agent/deploy.js', child.hostname, 1, child)
    }
}
