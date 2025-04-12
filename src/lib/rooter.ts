import { NS } from "@ns";
import { scan } from "./scan";
import { getPrograms } from "./getProgram";
/** @param {NS} ns */
export async function rooter(ns: NS) {
    const availableHackServers = await scan(ns, { lessEqThanHackingLevel: ns.getHackingLevel() });
    for (const server of availableHackServers) {
        const { hostname, hasRootAccess} = server;
        const programs = await getPrograms(ns)

        if (hasRootAccess) continue;
        if (programs.has('brutessh')) {
            const brutesshResult = await ns.brutessh(hostname);
            ns.tprintf(`${hostname} brutessh result: ${brutesshResult}`);
        }
        const nukeResult = await ns.nuke(hostname);
        ns.tprintf(`${hostname} nuked result: ${nukeResult}`);
    }
}

export async function main(ns: NS) {
    await rooter(ns)
}