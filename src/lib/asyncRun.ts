import { NS } from "@ns";

export function asyncRun(ns: NS, script: string, hostname: string) {
    return ns.run(script, { threads: 1 }, hostname)
}
