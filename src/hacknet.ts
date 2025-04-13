import { NS } from "@ns";

enum ResourceType {
    NODE = "node",
    RAM = "ram",
    LEVEL = "level",
    CORE = "core",
}

export async function main(ns: NS) {
    // eslint-disable-next-line no-constant-condition
    while (true) {
        const numNodes = await ns.hacknet.numNodes();

        let minCostResource: {
            index: number,
            type: ResourceType,
            price: number
        } = {
            index: -1,
            type: ResourceType.NODE,
            price: await ns.hacknet.getPurchaseNodeCost()
        }
        for (let i = 0; i < numNodes; i++) {
            const ramUpgradeCost = await ns.hacknet.getRamUpgradeCost(i)
            if (ramUpgradeCost < minCostResource.price) {
                minCostResource = {
                    index: i,
                    type: ResourceType.RAM,
                    price: ramUpgradeCost
                }
            }
            const levelUpgradeCost = await ns.hacknet.getLevelUpgradeCost(i)
            if (levelUpgradeCost < minCostResource.price) {
                minCostResource = {
                    index: i,
                    type: ResourceType.LEVEL,
                    price: levelUpgradeCost
                }
            }
            const coreUpgradeCost = await ns.hacknet.getCoreUpgradeCost(i)
            if (coreUpgradeCost < minCostResource.price) {
                minCostResource = {
                    index: i,
                    type: ResourceType.CORE,
                    price: coreUpgradeCost
                }
            }
        }
        
        const money = await ns.getServerMoneyAvailable("home");
        if (money < minCostResource.price) break;
        if(minCostResource.price > 1000000000) break;
        
        switch (minCostResource.type) {
            case ResourceType.NODE:
                await ns.hacknet.purchaseNode();
                break;
            case ResourceType.RAM:
                await ns.hacknet.upgradeRam(minCostResource.index);
                break;
            case ResourceType.LEVEL:
                await ns.hacknet.upgradeLevel(minCostResource.index);
                break;
            case ResourceType.CORE:
                await ns.hacknet.upgradeCore(minCostResource.index);
                break;
        }
        ns.print(`purchased: ${JSON.stringify(minCostResource)}`)

        await ns.sleep(50)
    }

}
