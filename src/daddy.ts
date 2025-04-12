import { NS } from "@ns";
import { scan } from "./lib/scan";
/** @param {NS} ns */
export async function main(ns: NS) {
  const availableHackServers = await scan(ns, { includeAdminRights: true });
  ns.run('/thug.js', { threads: 1 }, availableHackServers.map(server => server.hostname).join(','));
}
