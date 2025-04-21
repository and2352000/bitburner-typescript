import { NS } from "@ns";

import { Node } from "../entity/Node";

export async function scanDFS(ns: NS, hostname: string, depth = 5, path: string[] = []) {
    const root = new Node(hostname, []);
    if (--depth === 0) return root;
    const childHostnames = await ns.scan(hostname)

    for (const childHostname of childHostnames) {
        //防止 cycling
        if (path.includes(childHostname)) continue;

        const childNode = await scanDFS(ns, childHostname, depth, [...path, hostname])
        root.addChild(childNode);

    }
    return root;
}

export async function main(ns: NS) {
    const depth = ns.args[0] as number;
    const servers = await scanDFS(ns, 'home', depth);
    ns.tprint(servers);
}