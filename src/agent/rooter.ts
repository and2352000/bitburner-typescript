import { NS } from "@ns";
import { Node } from "../entity/Node";
import { hasProgram, Program } from "../lib/program";
import { logger } from "../lib/logger";

/** @param {NS} ns */

export async function rooter(ns: NS, hostname: string) {
    if (await hasProgram(ns, Program.BRUTE_SSH)) {
        const brutesshResult = await ns.brutessh(hostname);
        logger.info(ns, `${hostname} brutessh result: ${brutesshResult}`);
    }
    if (await hasProgram(ns, Program.FTP_CRACK)) {
        logger.debug(ns, `${hostname} ftpcrack start`) 
        const ftpCrackResult = await ns.ftpcrack(hostname);
        logger.info(ns, `${hostname} ftpcrack result: ${ftpCrackResult}`);
    }
    if (await hasProgram(ns, Program.RELAY_SMTP)) {
        const relaySmtpResult = await ns.relaysmtp(hostname);
        logger.info(ns, `${hostname} relaysmtp result: ${relaySmtpResult}`);
    }
    if (await hasProgram(ns, Program.HTTP_WORM)) {
        const httpWormResult = await ns.httpworm(hostname);
        logger.info(ns, `${hostname} httpworm result: ${httpWormResult}`);
    }
    if (await hasProgram(ns, Program.SQL_INJECT)) {
        const sqlInjectResult = await ns.sqlinject(hostname);
        logger.info(ns, `${hostname} sqlinject result: ${sqlInjectResult}`);
    }

    try {
        await ns.nuke(hostname);
        logger.info(ns, `Nuked ${hostname}`);
    } catch (e) {
        logger.warn(ns, `Warning: Can't nuke ${hostname}`);
    }
}

export async function main(ns: NS) {
    const node = JSON.parse(ns.args[0] as string) as Node

    logger.debug(ns, `${ns.getHostname()} rooter start`)
    for (const child of node.children) {
        await rooter(ns, child.hostname)
    }
}
