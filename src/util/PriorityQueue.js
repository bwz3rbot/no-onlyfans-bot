function testPrioQueue() {
    const pq = new PriorityQueue();
    pq.enqueue(['Beau Carnes', 2]);
    pq.enqueue(['Quincy Larson', 3]);
    pq.enqueue(['Ewa Mitulska-Wójcik', 1]);
    pq.enqueue(['Briana Swift', 2]);
    console.log("Printing collection...");
    pq.printCollection();
    console.log("dequeueing...");
    console.log(pq.dequeue());
    console.log(pq.dequeue());
    console.log(pq.dequeue());

    console.log(pq.front());
    pq.printCollection();
}
/* Priority Queue */
module.exports = class PriorityQueue {
    constructor() {
        this.collection = [];
    }

    printCollection() {
        (console.log(this.collection));
    };
    enqueue(element) {
        if (this.isEmpty()) {
            this.collection.push(element);
        } else {
            let added = false;
            for (let i = 0; i < this.collection.length; i++) {
                if (element[1] < this.collection[i][1]) { //checking priorities
                    this.collection.splice(i, 0, element);
                    added = true;
                    break;
                }
            }
            if (!added) {
                this.collection.push(element);
            }
        }
    };
    dequeue() {
        const value = this.collection.shift();
        return {
            item: value[0],
            priority: value[1]
        };
    };
    front() {
        return this.collection[0];
    };
    size() {
        return this.collection.length;
    };
    isEmpty() {
        return (this.collection.length === 0);
    };
}