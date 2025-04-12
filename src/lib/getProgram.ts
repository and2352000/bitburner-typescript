import { NS } from "@ns";

export function getPrograms(ns: NS) {
    const files = ns.ls('home');
    const regexExe = /.*\.exe$/;
    const programs = files.filter(file => regexExe.test(file))
    const map = new Map<string, string>();
    for (const program of programs) {
        const name = program.replace('.exe', '').toLowerCase();
        map.set(name, program);
    }
    return map;
}


export async function main(ns: NS) {
    const programs = getPrograms(ns);
    ns.tprintf(`programs: ${programs}`);
}