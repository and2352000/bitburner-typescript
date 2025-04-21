import { NS } from '@ns';
import { logger } from './logger';

/** @param {NS} ns */

export async function hack(ns: NS, serverName: string) {
  await ns.hack(serverName);
  const r = Math.random() * 100
  if (r < 40) await ns.grow(serverName);
  if (r < 65) await ns.weaken(serverName)
  await ns.sleep(50)
} 
  
export async function main(ns: NS) {
  const serverName = ns.args[0] as string;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      await hack(ns, serverName)
    } catch (e) {
      logger.error(ns, `Error hacking ${serverName}: ${e}`, { showInTerminal: false })
      break;
    }
  }
}
