import { NS } from "@ns";
import { syncRun } from "./lib/syncRun";

interface MonitorStore {
    basic: {
        money: number
        hackLevel: number
    }
}
const monitorStore = { basic: { money: 0, hackLevel: 0 } } as MonitorStore
/** @param {NS} ns */
let counter = 0
export async function main(ns: NS) {
    const hostname = ns.getHostname()

    // eslint-disable-next-line no-constant-condition
    while (true) {
        //money
        const money = ns.getServerMoneyAvailable('home')
        monitorStore.basic.money = money
        const hackLevel = ns.getHackingLevel()
        monitorStore.basic.hackLevel = hackLevel

        await ns.write('./monitor.json', JSON.stringify(monitorStore), 'w')

        if (hostname === 'home' && counter % 133 === 0) await syncRun(ns, 'hacknet.js')
        if (counter % 600 === 0) await syncRun(ns, 'agent.js')
       
        await ns.sleep(1000)
        counter++
    }
}
