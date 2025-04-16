import { NS } from "@ns";
import { deploy } from "./deploy";
import { rooter } from "./rooter";
import { Node } from "../entity/Node";
import { logger } from "../lib/logger";
import { syncExec } from "../lib/exec";

export async function main(ns: NS) {
    const node = JSON.parse(ns.args[0] as string) as Node
    for (const child of node.children) {
        logger.info(ns, `Rooting ${child.hostname}`)
        await rooter(ns, child.hostname)
        logger.info(ns, `Deploying ${child.hostname}`)
        await deploy(ns, child.hostname)
        await syncExec(ns, '/agent/index.js', child.hostname, 1, child)
    }
}