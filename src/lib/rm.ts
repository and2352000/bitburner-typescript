import { NS } from "@ns";

export function rmAll(ns: NS, hostname: string) {
    const files = ns.ls(hostname)
    for (const file of files) {
        ns.rm(file, hostname)
    }
}