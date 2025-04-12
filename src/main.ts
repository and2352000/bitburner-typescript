import { NS } from "@ns";
/** @param {NS} ns */
export async function main(ns: NS) {
    const hostname = ns.getHostname()
    ns.killall()
    ns.tprintf(`Starting rooter on ${hostname}`)
    const rooterPid = ns.run('/rooter.js', { threads: 1 }, hostname)

    // eslint-disable-next-line no-constant-condition
    while (true) {
        const ps = ns.ps()
        const rootPs = ps.find(p => p.pid === rooterPid)
        if (!rootPs) {
            ns.tprintf(`Rooter on ${hostname} has finished`)
            break
        }
        await ns.sleep(1000)
    }
    ns.tprintf(`Daddy is active on ${hostname}`)
    await ns.run('/daddy.js', { threads: 1 }, hostname)
}
