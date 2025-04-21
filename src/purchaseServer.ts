import { NS, AutocompleteData } from "@ns";
import { logger } from "./lib/logger";

// export function autocomplete(data: AutocompleteData, args) {

//     return data.servers;
// }


/** @param {NS} ns */
export async function main(ns: NS) {
    const ram = ns.args[0] as number;
    const serverName = ns.args[1] as string;
    const cost = ns.getPurchasedServerCost(ram)
    logger.debug(ns, `cost: ${cost}`)
    ns.purchaseServer(serverName, ram)
}
