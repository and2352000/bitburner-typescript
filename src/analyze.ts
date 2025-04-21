import { AutocompleteData, NS, } from "@ns";
import { logger } from "./lib/logger";
// import { hack } from "./lib/hack"
import { Node } from "./entity/Node";
import { scanDFS } from "./lib/scanDFS";

export function autocomplete(data: AutocompleteData) {
    return data.servers
}


export function searchServerPathDFS(ns: NS, node: Node, hostname: string): string[] {
    if(node.hostname === hostname) return [node.hostname]

    for (const child of node.children) {
        const path = searchServerPathDFS(ns, child, hostname)
        if(path.length < 1 ) continue
        return [node.hostname, ...path]
    }
    return []
}

export async function main(ns: NS) {
    const hostname = ns.args[0] as string
    const path = searchServerPathDFS(ns, await scanDFS(ns, "home",100), hostname,)
    logger.debug(ns, `PATH: ${path.join(" -> ")}`)
    const server = ns.getServer(hostname)
    logger.debug(ns, server)
    const files = ns.ls(hostname)
    logger.debug(ns, `FILES: ${files.join(", ")}`)
    // await hack(ns, hostname)
}




