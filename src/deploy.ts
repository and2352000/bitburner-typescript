import { NS } from "@ns";
import { scpAllLocalFiles } from "./lib/scpAllLocalFiles";
export async function main(ns: NS) {
    const hostname = ns.args[0] as string
    scpAllLocalFiles(ns, hostname)
    ns.exec('main.js', hostname)
}
