import { NS } from "@ns";
import { logger } from "../lib/logger";
import { Node } from "../entity/Node";
import { asyncExec } from "../lib/exec";

//agent: rooter->scp->thug
/** @param {NS} ns */
export async function main(ns: NS) {
    const node = JSON.parse(ns.args[0] as string) as Node

    const myServers = [...ns.getPurchasedServers(), 'home']
    const myHackLevel = ns.getHackingLevel()
    const flattenNodesHostname = FlattenNodesWithDetail(ns, node)
        .filter(s => !myServers.includes(s.hostname))
        .sort((a, b) => (b?.moneyAvailable ?? 0) - (a?.moneyAvailable ?? 0))
    const hackableNodes = flattenNodesHostname.filter(s => {
        if (myHackLevel < s.requiredHackingSkill!) return false
        if (s.openPortCount! < s.numOpenPortsRequired!) return false
        return true
    })
    // .filter(s => ns.getServerSecurityLevel(s.hostname)! < 50)
    const canDeployServers = ns.getPurchasedServers()
    logger.debug(ns, canDeployServers)
    const hackNodes = hackableNodes.slice(5, 20)
    const hackScriptRam = ns.getScriptRam('/lib/hack.js')

    for (const deployServer of canDeployServers) {
        ns.killall(deployServer)
        const serverMaxRam = ns.getServerMaxRam(deployServer)
        const threads = Math.floor(serverMaxRam / hackScriptRam / hackNodes.length)
        for (const hackNode of hackNodes) {
            if (threads > 0) asyncExec(ns, '/lib/hack.js', deployServer, threads, hackNode.hostname)
        }
    }

    // logger.debug(ns, hackableNodes)

}


function FlattenNodesWithDetail(ns: NS, node: Node) {
    const flattenNodesHostname = [{...ns.getServer(node.hostname), ...ns}]

    if (node.children.length < 1) return flattenNodesHostname

    for (const child of node.children) {
        const childNodes = FlattenNodesWithDetail(ns, child)
        flattenNodesHostname.push(...childNodes)
    }

    return flattenNodesHostname
}