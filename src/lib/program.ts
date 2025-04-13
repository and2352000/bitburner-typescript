import { NS } from "@ns";
/*
BruteSSH.exe: 50
FTPCrack.exe: 100
relaySMTP.exe: 250
HTTPWorm.exe: 500
SQLInject.exe: 750
DeepscanV1.exe: 75
DeepscanV2.exe: 400
ServerProfiler.exe: 75
AutoLink.exe: 25
*/

export enum Program {
    BRUTE_SSH = 'BruteSSH.exe',
    FTP_CRACK = 'FTPCrack.exe',
    RELAY_SMTP = 'relaySMTP.exe',
    HTTP_WORM = 'HTTPWorm.exe',
    SQL_INJECT = 'SQLInject.exe',
    DEEP_SCAN_V1 = 'DeepscanV1.exe',
    DEEP_SCAN_V2 = 'DeepscanV2.exe',
    SERVER_PROFILER = 'ServerProfiler.exe',
    AUTO_LINK = 'AutoLink.exe',
}

export function getOwnPrograms(ns: NS) {
    const files = ns.ls('home');
    const regexExe = /.*\.exe$/;
    const programs = files.filter(file => regexExe.test(file))
    const map = new Map<string, string>();
    for (const program of programs) {
        map.set(program, program);
    }
    return map;
}

// export async function buyProgramFromDarkweb(ns: NS, program: Program) {
//     const hasTorRouter = ns.hasTorRouter()
//     if(!hasTorRouter) ns.tprintf(`Warning:Buy tor router first`)
// }

export async function getPrograms() {
    return Object.values(Program)
}

export async function hasProgram(ns: NS, program: Program): Promise<boolean> {
    const ownPrograms = getOwnPrograms(ns)
    return ownPrograms.has(program)
}