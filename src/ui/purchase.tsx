import { NS } from '@ns';
import React from '../lib/react'
import { logger } from '../lib/logger'

// timer.tsx
interface TimerProps {
    ns: NS
}

function Timer({ ns }: TimerProps) {
    const [name, setName] = React.useState('')
    const [ram, setRam] = React.useState(1)
    const [purchasedServers, setPurchasedServers] = React.useState([])
    const [result, setResult] = React.useState(0)
    React.useEffect(() => {
        setPurchasedServers(ns.getPurchasedServers())
    }, [ns])
    return <>
        <select value={name} onChange={(e) => setName(e.target.value)}>
            <option value="">Select a server</option>
            {purchasedServers.map((server: string) => (
                <option key={server} value={server}>
                    {server}
                </option>
            ))}
        </select><br/>
        <select value={ram} onChange={(e) => setRam(Number(e.target.value))}>
            <option value={8}>8 GB</option>
            <option value={16}>16 GB</option>
            <option value={32}>32 GB</option>
            <option value={64}>64 GB</option>
            <option value={128}>128 GB</option>
            <option value={256}>256 GB</option>
            <option value={512}>512 GB</option>
            <option value={1024}>1024 GB</option>
        </select><br/>

        <div >Result: {result}</div>
        <button onClick={() => upgradePurchaseServer(ns, name, ram)}>Upgrade Server</button>
    </>;

function upgradePurchaseServer(ns: NS, name: string, ram: number) {
    const cost =  ns.getPurchasedServerUpgradeCost(name, ram)
     setResult(cost)
 }
}



export async function main(ns: NS) {
    ns.ui.openTail();
    ns.ui.resizeTail(300, 200);
    ns.printRaw(<Timer ns={ns} />);
    ns.disableLog('ALL');
    ns.ui.setTailTitle('Monitor')

    // eslint-disable-next-line no-constant-condition
    while (true) {
        await ns.asleep(10000000000000)
    }
}