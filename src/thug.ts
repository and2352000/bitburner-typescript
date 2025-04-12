import { NS } from "@ns";
/** @param {NS} ns */
export async function main(ns: NS) {
    const serverHostnames = (ns.args[0] as string).split(',');
    const hackScriptRam = ns.getScriptRam('/lib/hack.js')
    let i = 0
    const hostNumber = serverHostnames.length
    // eslint-disable-next-line no-constant-condition
    while (true) {
        const hostname = serverHostnames[i % (hostNumber - 1)];
        const freeRam = ns.getServerMaxRam(hostname) - ns.getServerUsedRam(hostname)

        if (freeRam >= hackScriptRam) {
            ns.tprint(hostname);
             ns.run('/lib/hack.js', { threads: 1 }, hostname);
             i++
        }else{
            break;
        }
    }
}


