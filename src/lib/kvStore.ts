import { NS } from "@ns";

export async function getKvStoreData(ns: NS, filename: string) {
    const kvStore = await ns.read(filename)
    return JSON.parse(kvStore)
}
