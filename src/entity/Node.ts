export class Node {
    constructor(
        public hostname: string,
        public children: Node[]
    ) { }

    addChild(node: Node) {
        this.children.push(node);
    }
}