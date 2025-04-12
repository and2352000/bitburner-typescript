import { NS } from "@ns";
import { scan } from "./lib/scan";
/** @param {NS} ns */
export async function main(ns: NS) {
  const availableHackServers = (await scan(ns, {
    includeAdminRights: true,
    lessEqThanHackingLevel: ns.getHackingLevel()
  }))
    .filter(server => server.hostname !== 'home');
  if (availableHackServers.length === 0) {
    ns.tprintf('No available hack servers')
    return
  }
  ns.run('/thug.js', { threads: 1 }, availableHackServers.map(server => server.hostname).join(','));
}
