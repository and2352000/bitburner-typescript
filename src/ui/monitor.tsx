import { NS, Server } from '@ns';
import React from '../lib/react'
// import { logger } from '../lib/logger'
import { scanDFS } from '../lib/scanDFS'
import { Node } from '../entity/Node'

interface Props {
    ns: NS
}

function Monitor({ ns }: Props) {
    const [detail, setDetail] = React.useState(null)
    const [servers, setServers] = React.useState([])
    const _detail: Server | null  = detail
    React.useEffect(() => {
        setInterval(async () => {
            const nodes = await scanDFS(ns, 'home', 10)
            const flattenNodes = FlattenNodesWithDetail(ns, nodes)
            setServers(flattenNodes)
        }, 5000)
    }, [])
    return <>
        <select 
            onChange={(e) => setDetail(servers.find((s: Node) => s.hostname === e.target.value))}>
            {servers.map((server: Node) => (
                <option key={server.hostname} value={server.hostname}>
                    {server.hostname}
                </option>
            ))}
        </select><br />

        <div style={{ height: 400 }}>
            {detail && (
                <>
                    <p>Hostname: {_detail?.hostname}</p>
                    <p>MaxRam: {_detail?.maxRam}</p>
                    <p>Money Available: {_detail?.moneyAvailable}</p>
                    <p>Money Max: {_detail?.moneyMax}</p>
                    <p>Hack Difficulty: {_detail?.hackDifficulty}</p>
                    <p>Has Admin Rights: {_detail?.hasAdminRights ? 'Yes' : 'No'}</p>
                    <p>Num Open Ports Required: {_detail?.numOpenPortsRequired}</p>
                    <p>Required Hacking Skill: {_detail?.requiredHackingSkill}</p>
                </>
            )}
        </div>
    </>;


}
function FlattenNodesWithDetail(ns: NS, node: Node) {
    const flattenNodesHostname = [{ ...ns.getServer(node.hostname), ...ns }]

    if (node.children.length < 1) return flattenNodesHostname

    for (const child of node.children) {
        const childNodes = FlattenNodesWithDetail(ns, child)
        flattenNodesHostname.push(...childNodes)
    }

    return flattenNodesHostname
}


export async function main(ns: NS) {
    ns.ui.openTail();
    ns.ui.resizeTail(500, 600);
    ns.printRaw(<Monitor ns={ns} />);
    ns.disableLog('ALL');
    ns.ui.setTailTitle('Monitor')

    // eslint-disable-next-line no-constant-condition
    while (true) {
        await ns.asleep(10000)
    }
}