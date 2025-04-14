import { NS } from "@ns";

export function asyncRun(ns: NS, script: string, threads = 1, ...args: any[]) {
    return ns.run(script, { threads }, ...args)
}
