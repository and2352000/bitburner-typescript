import { NS } from "@ns";
import { scan } from "./lib/scan";
import { getPrograms } from "./lib/getProgram";
/** @param {NS} ns */
export async function main(ns: NS) {
    const availableHackServers = await scan(ns, { lessEqThanHackingLevel: ns.getHackingLevel() });
    for (const server of availableHackServers) {
        const { hostname, hasAdminRights, openPortCount, numOpenPortsRequired } = server;
        const programs = getPrograms(ns)

        if (hasAdminRights) continue;
        if (openPortCount === undefined || openPortCount > 1) continue;
        if (programs.has('brutessh')) {
            const brutesshResult = await ns.brutessh(hostname);
            ns.tprintf(`${hostname} brutessh result: ${brutesshResult}`);
        }
        if (numOpenPortsRequired === undefined || numOpenPortsRequired > openPortCount) continue;
        const nukeResult = await ns.nuke(hostname);
        ns.tprintf(`${hostname} nuked result: ${nukeResult}`);
    }
}
