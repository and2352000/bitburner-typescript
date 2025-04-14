import { NS } from "@ns";
import { scan } from "./lib/scan";
import { asyncRun } from "./lib/asyncRun";
/** @param {NS} ns */

const excludeServers = ['home', 'home2']

export async function main(ns: NS) {
  const availableHackServers = (await scan(ns, {
    includeAdminRights: true,
    lessEqThanHackingLevel: ns.getHackingLevel()
  }))
    .filter(server => !excludeServers.includes(server.hostname));
  if (availableHackServers.length === 0) {
    ns.tprintf('No available hack servers')
    return
  }
  await asyncRun(ns, '/thug.js', 1, availableHackServers.map(server => server.hostname).join(','));
}
