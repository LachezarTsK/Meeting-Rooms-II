
/**
 * @param {number[][]} intervals
 * @return {number}
 */
var minMeetingRooms = function (intervals) {

    const START = 0;
    const END = 1;

    const endTime = new MinHeap();
    const size = intervals.length;

    intervals.sort((x, y) => (x[START] - y[START]));
    endTime.push(intervals[0][END]);

    for (let meeting = 1; meeting < size; meeting++) {
        if (endTime.peek() <= intervals[meeting][START]) {
            endTime.pop();
        }
        endTime.push(intervals[meeting][END]);
    }

    return endTime.size;
};

class MinHeap {

    constructor() {
        this.size = 0;
        this.capacity = 100;
        this.loadFactor = 0.75;
        this.list = new Array(this.capacity).fill(0);
    }

    minHeapify(index) {
        let min = index;
        let index_leftSubNode = 2 * index + 1;
        let index_rightSubNode = 2 * index + 2;

        if (index_leftSubNode < this.size && this.list[min] > this.list[index_leftSubNode]) {
            min = index_leftSubNode;
        }
        if (index_rightSubNode < this.size && this.list[min] > this.list[index_rightSubNode]) {
            min = index_rightSubNode;
        }
        if (min !== index) {
            let temp = this.list[index];
            this.list[index] = this.list[min];
            this.list[min] = temp;
            this.minHeapify(min);
        }

    }

    push(value) {
        this.list[this.size++] = value;
        for (let i = Math.floor(this.size / 2) - 1; i >= 0; i--) {
            this.minHeapify(i);
        }

        if (Math.floor(this.capacity * this.loadFactor) === this.size) {
            this.updateCapacity();
        }
    }

    pop() {
        if (this.isEmpty()) {
            throw 'list is empty!';
        }

        let top = this.list[0];
        this.list[0] = this.list[this.size - 1];
        this.size--;
        for (let i = Math.floor(this.size / 2) - 1; i >= 0; i--) {
            this.minHeapify(i);
        }
        return top;
    }

    peek() {
        if (this.isEmpty()) {
            throw 'list is empty!';
        }
        return this.list[0];
    }

    updateCapacity() {
        this.list.push(...new Array(this.capacity).fill(0));
    }

    isEmpty() {
        return this.size === 0;
    }
}
