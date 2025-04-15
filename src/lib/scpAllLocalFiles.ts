import { NS } from "@ns";

export function scpAllLocalFiles(ns: NS, serverName: string) {
    //   //read dir file
    const hostname = ns.getHostname();
    let files = ns.ls(hostname);
    const regexJs = /.*\.js$/;
    const regexLib = /lib\/.*/;
    const regexJson = /.*\.json$/;
    const regexVersion = /VERSION_.*.txt$/;
    files = files.filter(file => regexJs.test(file) || regexLib.test(file) || regexJson.test(file) || regexVersion.test(file));

    for (const file of files) {
        ns.scp(file, serverName);
    }
}

export async function main(ns: NS) {
    const serverName = ns.args[0] as string;
    scpAllLocalFiles(ns, serverName);
}

