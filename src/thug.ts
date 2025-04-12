import { NS } from "@ns";
/** @param {NS} ns */
export async function main(ns: NS) {
    const serverHostnames = (ns.args[0] as string).split(',');

    for (const hostname of serverHostnames) {
        ns.tprint(hostname);
        ns.run('/lib/hack.js', { threads: 1 }, hostname);
    }
}
