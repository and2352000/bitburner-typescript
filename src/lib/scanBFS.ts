import { NS } from "@ns";

class Node {
    constructor(
        public hostname: string,
        public children: Node[]
    ) { }

    addChild(node: Node) {
        this.children.push(node);
    }
}

export async function scanBFS(ns: NS, hostname: string, depth = 5, path: string[] = []) {
    const root = new Node(hostname, []);
    if (--depth === 0) return root;
    const childHostnames = await ns.scan(hostname);
    for (const childHostname of childHostnames) {
        //防止 cycling
        if (path.includes(childHostname)) continue;
        const childNode = await scanBFS(ns, childHostname, depth, [...path, hostname])
        if (childNode) root.addChild(childNode);
    }
    return root;
}
export async function main(ns: NS) {
    const depth = ns.args[0] as number;
    const servers = await scanBFS(ns, 'home', depth);
    ns.tprint(servers);
}