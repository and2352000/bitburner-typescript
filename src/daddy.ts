import { NS } from "@ns";
import { scan } from "./lib/scan";
/** @param {NS} ns */
export async function main(ns: NS) {
  ns.killall('home');
  const availableHackServers = await scan(ns);
  for (const server of availableHackServers.slice(0, 2)) {
    ns.tprint(server.hostname);
    ns.run('/lib/hack.js', { threads: 1 }, server.hostname);
  }
}
