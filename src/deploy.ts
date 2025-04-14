import { NS } from "@ns";
import { scpAllLocalFiles } from "./lib/scpAllLocalFiles";
import { scan } from "./lib/scan";
import { getVersion, isVersionGreaterThan } from "./lib/version";
// import { syncRun } from "./lib/syncRun";

const excludeServers = ['home', 'home2']

export async function main(ns: NS) {
    const hostnameMe = ns.getHostname()
    const versionMe = getVersion(ns, hostnameMe)

    const availableHackServers = (await scan(ns, {
        includeAdminRights: true,
        lessEqThanHackingLevel: ns.getHackingLevel()
    }))
        .filter(server => !excludeServers.includes(server.hostname));
    if (availableHackServers.length === 0) {
        ns.tprintf('No available hack servers')
        return
    }
    for (const server of availableHackServers) {
        const versionTarget = getVersion(ns, server.hostname)

        // avoid cycling
        if (!versionTarget || versionMe && versionTarget && versionTarget !== versionMe && isVersionGreaterThan(versionMe, versionTarget)) {
            await scpAllLocalFiles(ns, server.hostname)
            ns.killall(server.hostname)
            ns.rm(`VERSION_${versionTarget}.txt`, server.hostname)
            // const deployRam = ns.getScriptRam('deploy.js')
            const targetMaxRam = ns.getServerMaxRam(server.hostname)

            if (targetMaxRam > 16) {
                await ns.exec('deploy.js', server.hostname)
            } else {
                // await ns.exec('rooter.js', server.hostname)
                if (!excludeServers.includes(server.hostname)) thug(ns, server.hostname)
            
            }
        }
    }
    // await syncRun(ns, 'rooter.js')
}

async function thug(ns: NS, hostname: string) {
    const hackScriptRam = ns.getScriptRam('/lib/hack.js')
    ns.scriptKill('/lib/hack.js', hostname)

    const maxRam = ns.getServerMaxRam(hostname)
    const usedRam = ns.getServerUsedRam(hostname)
    const freeRam = maxRam - usedRam
    const threads = Math.floor(freeRam / hackScriptRam)
    await ns.exec('/lib/hack.js', hostname, threads, hostname)
}
