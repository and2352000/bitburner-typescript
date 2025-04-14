import { NS } from "@ns";

export function getVersion(ns: NS, hostname: string) {
    const files = ns.ls(hostname)
    // example: VERSION_1.0.0.txt
    const regex = /^VERSION_(\d+\.\d+\.\d+)\.txt$/;
    const versionFile = files.find(file => regex.test(file))
    if (!versionFile) {
        return null
    }
    const version = versionFile.match(regex)?.[1]
    return version;
}

export function isVersionGreaterThan(version1: string, version2: string) {
    const [major1, minor1, patch1] = version1.split('.').map(Number)
    const [major2, minor2, patch2] = version2.split('.').map(Number)
    if (major1 > major2) return true
    if (major1 === major2 && minor1 > minor2) return true
    if (major1 === major2 && minor1 === minor2 && patch1 > patch2) return true
    return false
}

export function main(ns: NS) {
    const hostname = ns.args[0] as string
    const versionFile = getVersion(ns, hostname)
    ns.tprint(versionFile)
}