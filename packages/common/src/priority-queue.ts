export class PriorityQueue<T> {
    private items: Array<{ element: T; priority: number }> = [];

    constructor(private comparator: (a: T, b: T) => number) {}

    enqueue(element: T, priority: number) {
        const queueElement = { element, priority };
        let added = false;

        for (let i = 0; i < this.items.length; i++) {
            if (this.comparator(this.items[i].element, element) > 0) {
                this.items.splice(i, 0, queueElement);
                added = true;
                break;
            }
        }

        if (!added) {
            this.items.push(queueElement);
        }
    }

    dequeue(): T | undefined {
        if (!this.isEmpty()) {
            return this.items.shift()!.element;
        }
        return undefined;
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }

    contains(element: T): boolean {
        return this.items.some((item) => this.comparator(item.element, element) === 0);
    }
}