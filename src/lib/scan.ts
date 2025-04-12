import { NS } from "@ns";

interface ScanOptions {
  includeAdminRights?: boolean;
  lessEqThanHackingLevel?: number;
}

export async function scan(ns: NS, options: ScanOptions = {}) {
  const lessEqThanHackingLevel = options?.lessEqThanHackingLevel ?? 1;
  const includeAdminRights = options?.includeAdminRights ?? false;
  const servers = ns.scan(ns.getHostname());
  const reports = [];
  for (const server of servers) {
    const report = ns.getServer(server);
    reports.push(report);
  }
  return reports
    .filter(r => includeAdminRights ? r.hasAdminRights : true)
    .filter(r => r.requiredHackingSkill && r.requiredHackingSkill <= lessEqThanHackingLevel)
    .sort((a, b) => (b.moneyAvailable ?? 0) - (a.moneyAvailable ?? 0));
}

export async function main(ns: NS) {
  const servers = await scan(ns);
  ns.tprint(servers);
}