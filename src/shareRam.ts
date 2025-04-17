import { NS } from "@ns";
import { logger } from "./lib/logger";

export async function main(ns: NS) {
   try {
      await ns.share()
   } catch (e: any) {
      logger.error(ns, e)
   }
}