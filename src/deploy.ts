import { NS } from "@ns";
import {  scpAllLocalFiles } from "./lib/scpAllLocalFiles";

export async function main(ns: NS) {
    const servers = [
        'n00dles',
        'foodnstuff',
        'sigma-cosmetics',
        'joesguns',
        'hong-fang-tea',
        'harakiri-sushi'
        
    ]
    for(const server of servers) {
        scpAllLocalFiles(ns, server);
    }
}
