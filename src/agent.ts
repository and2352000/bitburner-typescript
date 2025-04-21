import { NS } from "@ns";
import { syncRun } from "./lib/syncRun";
import { scanDFS } from "./lib/scanDFS";
import { logger } from "./lib/logger";
// import { Node } from "./entity/Node";

/** @param {NS} ns */
export async function main(ns: NS) {

    const nodes = await scanDFS(ns, 'home', 10, [])
    logger.info(ns, nodes)
    //rm all file will kill all childprocess
    await syncRun(ns, '/agent/rmAllFile.js', nodes)
    await syncRun(ns, '/agent/index.js', nodes)
    await syncRun(ns, '/agent/hack.js', nodes)
    await syncRun(ns, '/agent/test.js', nodes)
}



// function FlattenNodesWithDetail(ns: NS, node: Node) {
//     const flattenNodesHostname = [ns.getServer(node.hostname)]
    
//     if (node.children.length < 1) return flattenNodesHostname

//     for (const child of node.children) {
//         const childNodes = FlattenNodesWithDetail(ns, child)
//         flattenNodesHostname.push(...childNodes)
//     }

//     return flattenNodesHostname
// }