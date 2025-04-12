import { NS } from "@ns";
/** @param {NS} ns */
export async function main(ns: NS) {
    const serverHostnames = (ns.args[0] as string).split(',');
    const scriptUsedRam = ns.getScriptRam('/lib/hack.js')

    while (serverHostnames.length > 0) {
        for (let i = 0; i < serverHostnames.length; i++) {
            const hostname = serverHostnames[i];
            const freeRam = ns.getServerMaxRam(hostname) - ns.getServerUsedRam(hostname)
            if (freeRam >= scriptUsedRam) {
                ns.tprint(hostname);
               const pid =  ns.run('/lib/hack.js', { threads: 1 }, hostname);
               //remove host from list
               if(pid > 0) serverHostnames.splice(i, 1); 
            }
        }
    }
}
