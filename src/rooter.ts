import { NS } from "@ns";
import { scan } from "./lib/scan";
/** @param {NS} ns */
export async function main(ns: NS) {
    const availableHackServers = await scan(ns, { lessEqThanHackingLevel: ns.getHackingLevel() });
    for (const server of availableHackServers) {
        const { hostname, hasAdminRights, openPortCount, numOpenPortsRequired } = server;
        ns.tprintf(`${hostname} root program start...`);
        if (hasAdminRights) continue;
        if (openPortCount === undefined || openPortCount > 1) continue;
        const brutesshResult = await ns.brutessh(hostname);
        ns.tprintf(`${hostname} brutessh result: ${brutesshResult}`);
        if (numOpenPortsRequired === undefined || numOpenPortsRequired > openPortCount) continue;
        const nukeResult = await ns.nuke(hostname);
        ns.tprintf(`${hostname} nuked result: ${nukeResult}`);
    }
}
