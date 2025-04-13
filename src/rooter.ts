import { NS } from "@ns";
import { scan } from "./lib/scan";
import { hasProgram, Program } from "./lib/program";
/** @param {NS} ns */

const excludeServers = ['home', 'home2']

export async function main(ns: NS) {
    const availableHackServers = (await scan(ns, { lessEqThanHackingLevel: ns.getHackingLevel() }))
        .filter(server => !excludeServers.includes(server.hostname));

    for (const server of availableHackServers) {
        const { hostname, hasRootAccess } = server;

        if (hasRootAccess) continue;
        if (await hasProgram(ns, Program.BRUTE_SSH)) {
            const brutesshResult = await ns.brutessh(hostname);
            ns.printf(`${hostname} brutessh result: ${brutesshResult}`);
        }
        if (await hasProgram(ns, Program.FTP_CRACK)) {
            const ftpCrackResult = await ns.ftpcrack(hostname);
            ns.printf(`${hostname} ftpcrack result: ${ftpCrackResult}`);
        }
        if (await hasProgram(ns, Program.RELAY_SMTP)) {
            const relaySmtpResult = await ns.relaysmtp(hostname);
            ns.printf(`${hostname} relaysmtp result: ${relaySmtpResult}`);
        }
        if (await hasProgram(ns, Program.HTTP_WORM)) {
            const httpWormResult = await ns.httpworm(hostname);
            ns.printf(`${hostname} httpworm result: ${httpWormResult}`);
        }
        try {
            await ns.nuke(hostname);
            ns.printf(`Nuked ${hostname}`);
        } catch (e) {
            ns.printf(`Warning: Can't nuke ${hostname}`);
        } 
    }
}
