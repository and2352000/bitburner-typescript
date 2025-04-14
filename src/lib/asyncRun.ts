import { NS } from "@ns";

export function asyncRun(ns: NS, script: string, threads = 1, ...args: any[]) {
    const a = args ?? []
    return ns.run(script, { threads }, ...a)
}
