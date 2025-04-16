import { NS } from '@ns';

/** @param {NS} ns */

export async function hack(ns: NS, serverName: string) {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    await ns.hack(serverName);
    const r = Math.random() * 100
    if (r < 10) await ns.grow(serverName);
    if (r < 40) await ns.weaken(serverName)
    await ns.sleep(100)
  }
}
export async function main(ns: NS) {
  const serverName = ns.args[0] as string;
  await hack(ns, serverName)
}
