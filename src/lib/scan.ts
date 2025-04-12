import { NS } from "@ns";

interface ScanOptions {
  includeAdminRights?: boolean;
  lessEqThanHackingLevel?: number;
}

export async function scan(ns: NS, options: ScanOptions = {}) {
  const lessEqThanHackingLevel = options?.lessEqThanHackingLevel ?? 1;
  const includeAdminRights = options?.includeAdminRights ?? false;
  const hostnames = await ns.scan(ns.getHostname());
  const reports = [];
  for (const hostname of hostnames) {
    const hasRootAccess = ns.hasRootAccess(hostname)
    const requiredHackingSkill = await ns.getServerRequiredHackingLevel(hostname)
    const moneyAvailable = await ns.getServerMoneyAvailable(hostname)
    const numOpenPortsRequired = await ns.getServerNumPortsRequired(hostname)
    reports.push({
      hostname,
      hasRootAccess,
      requiredHackingSkill,
      moneyAvailable,
      numOpenPortsRequired,
    })
  }
  return reports
    .filter(r => includeAdminRights ? r.hasRootAccess : true)
    .filter(r => r.requiredHackingSkill && r.requiredHackingSkill <= lessEqThanHackingLevel)
      .sort((a, b) => (b.moneyAvailable ?? 0) - (a.moneyAvailable ?? 0));
  }

  export async function main(ns: NS) {
    const servers = await scan(ns);
    ns.tprint(servers);
  }