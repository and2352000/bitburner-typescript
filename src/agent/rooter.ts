import { NS } from "@ns";
import { Node } from "../entity/Node";
import { hasProgram, Program } from "../lib/program";
import { logger } from "../lib/logger";
import { syncExec } from "../lib/exec";
/** @param {NS} ns */

export async function main(ns: NS) {
    const node = JSON.parse(ns.args[0] as string) as Node

    logger.debug(ns, `${ns.getHostname()} rooter start`)
    for (const child of node.children) {
        if (await hasProgram(ns, Program.BRUTE_SSH)) {
            const brutesshResult = await ns.brutessh(child.hostname);
            logger.info(ns, `${child.hostname} brutessh result: ${brutesshResult}`);
        }
        if (await hasProgram(ns, Program.FTP_CRACK)) {
            const ftpCrackResult = await ns.ftpcrack(child.hostname);
            logger.info(ns, `${child.hostname} ftpcrack result: ${ftpCrackResult}`);
        }
        if (await hasProgram(ns, Program.RELAY_SMTP)) {
            const relaySmtpResult = await ns.relaysmtp(child.hostname);
            logger.info(ns, `${child.hostname} relaysmtp result: ${relaySmtpResult}`);
        }
        if (await hasProgram(ns, Program.HTTP_WORM)) {
            const httpWormResult = await ns.httpworm(child.hostname);
            logger.info(ns, `${child.hostname} httpworm result: ${httpWormResult}`);
        }
        if (await hasProgram(ns, Program.SQL_INJECT)) {
            const sqlInjectResult = await ns.sqlinject(child.hostname);
            logger.info(ns, `${child.hostname} sqlinject result: ${sqlInjectResult}`);
        }

        try {
            await ns.nuke(child.hostname);
            logger.info(ns, `Nuked ${child.hostname}`);
        } catch (e) {
            logger.warn(ns, `Warning: Can't nuke ${child.hostname}`);
        }
        await syncExec(ns, '/agent/rooter.js', child.hostname, 1, child)
    }
}
