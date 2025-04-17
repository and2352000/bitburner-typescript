import { NS } from "@ns";
import { asyncRun } from "./lib/asyncRun";

interface MonitorStore {
    basic: {
        money: number
        hackLevel: number
        sharePower: number
    }
}
const monitorStore = { basic: { money: 0, hackLevel: 0, sharePower: 0 } } as MonitorStore

/** @param {NS} ns */
let counter = 0
const CYCLE_TIME = 100
export async function main(ns: NS) {
    // eslint-disable-next-line no-constant-condition
    while (true) {
        //money
        const money = ns.getServerMoneyAvailable('home')
        monitorStore.basic.money = money
        const hackLevel = ns.getHackingLevel()
        monitorStore.basic.hackLevel = hackLevel
        const sharePower = ns.getSharePower()
        monitorStore.basic.sharePower = sharePower
        await ns.write('./monitor.json', JSON.stringify(monitorStore), 'w')

        cornJob(ns, counter, () => asyncRun(ns, 'hacknet.js'), 133)
        cornJob(ns, counter, () => asyncRun(ns, 'agent.js'), 600)
        cornJob(ns, counter, () => asyncRun(ns, 'shareRam.js', 90), 10)
        await ns.sleep(CYCLE_TIME)
        counter++
    }
}
type Fn = (ns: NS) => void
//time 單位是秒
function cornJob(ns: NS, counter: number, func: Fn, time: number) {
    const milliseconds = time * 1000
    const cylclesPerSecond = Math.floor(milliseconds / CYCLE_TIME)
    if (counter % cylclesPerSecond === 0) func(ns)
}