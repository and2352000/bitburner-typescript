import { NS } from "@ns";
/** @param {NS} ns */
export async function main(ns: NS) {
    const arg0 = (ns.args[0] as string)

    const serverHostnames = arg0.split(',')
    if (serverHostnames.length < 1) throw new Error('No hostnames provided')
    const hackScriptRam = ns.getScriptRam('/lib/hack.js')
    let i = 0
    const hostNumber = serverHostnames.length
    const localHostname = ns.getHostname()
    // eslint-disable-next-line no-constant-condition
    while (true) {
        const hostname = serverHostnames[i % hostNumber];
        const maxRam = ns.getServerMaxRam(localHostname)
        const usedRam = ns.getServerUsedRam(localHostname)
        const freeRam = maxRam - usedRam

        if (freeRam >= hackScriptRam) {
            await ns.run('/lib/hack.js', { threads: 1 }, hostname);
            i++
        } else {
            break;
        }
        await ns.sleep(1000)
    }
}
