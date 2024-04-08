export class ListNode {
    constructor(value) {
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

export default class FrequencyListV1 {
    constructor(frequency) {
        this.head = null;
        this.tail = null;
        this._size = 0;
        this.frequency = frequency;
        this.pivotArray = [];
        this.arrayCapacity = frequency // for computign when the pivotArray has to enlarge. gotta change this into a manual implementation

        // for system
        this.lastAction = null
        this.speedms = 0
        this.speednotation = null
        this._sizepointers = 0

        // initial space from pivotArray. created cells of array are null (4 bytes)
        // + 4 each from head and tail
        // + 8 for size
        // + 8 for frequency 
        this.space =  (4 * frequency) + 4 + 4 + 8 + 8 

        this.spacenotation = null
        this.threads = 0

        this.spaceAdded = 0
        this._sizeAdded = 0
        this.pointersAdded = 0
    }

    // system methods
    toJSON(){
        return JSON.stringify({
            lastAction: this.lastAction,
            speedms: this.speedms,
            speednotation : this.speednotation,
            size: this._size,
            sizepointers: this._sizepointers,
            space: this.space,
            spacenotation: this.spacenotation,
            threads: this.threads,
            frequency: this.frequency,
            spaceAdded: this.spaceAdded,
            sizeAdded: this._sizeAdded,
            pointersAdded: this.pointersAdded
        })
    }

    static parse(serializedData){
        serializedData = JSON.parse(serializedData)

        let newList = new FrequencyListV1(serializedData.frequency);

        for(let i = 0; i < serializedData.size; i++){
            newList.add(i);
        }
    
        newList.setLastActionResult(serializedData)
    
        return newList;
    }

    setLastActionResult(lastAction){
        this.lastAction = lastAction.lastAction
        this.speedms = lastAction.speedms
        this.speednotation = lastAction.speednotation
        this._sizepointers = lastAction.sizepointers
        this.space = lastAction.space
        this.spacenotation = lastAction.spacenotation
        this.threads = lastAction.threads
        this.spaceAdded = lastAction.spaceAdded
        this._sizeAdded = lastAction.sizeAdded
        this.pointersAdded = lastAction.pointersAdded
    }

    getLastActionResult(){
        return {
            lastAction: this.lastAction,
            speedms: this.speedms,
            speednotation: this.speednotation,
            size: this._size,
            sizepointers: this._sizepointers,
            space: this.space,
            spacenotation: this.spacenotation,
            threads: this.threads,
            frequency: this.frequency,
            spaceAdded: this.spaceAdded,
            sizeAdded: this._sizeAdded,
            pointersAdded: this.pointersAdded
        }
    }
    
    size(){
        return this._size
    }

    // public methods
    add(value) {
        // for system 
        this.spaceAdded = 0
        this._sizeAdded = 0
        this.pointersAdded = 0

        const startTime = performance.now();

        const newNode = new ListNode(value);
        // for system
        this.space += 8 // 8 for value
        this.spaceAdded += 8

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            
            // for system
            // 2 bytes each for head and tail, from null to reference.
            // 4 bytes each for newNode's null prev and next
            this.space += 2 + 2 + 4 + 4
            this.spaceAdded += 2 + 2 + 4 + 4

            this.speednotation = "O(1)"
            this.spacenotation = "O(1)"
    
            this._sizepointers = 2
            this.pointersAdded += 2 // head and tail
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;

            // for system
            this.speednotation = "O(1)"
            this.spacenotation = "O(1)"
            this.spaceAdded += 2 + 4 + 6
            this.space += 2 + 4 + 6 
            // add 2 from previously null next pointer of tail
            // add 4 from null next pointer of newNode
            // add 6 from prev reference of newNode
        }
    
        this._size++;
        this._sizeAdded += 1 // for system
    
        if (this._size % this.frequency === 0) {
            this.pivotArray.push(newNode);

            // for system
            this._sizepointers += 1
            this.pointersAdded += 1
            this.space += 2 // null becomes reference
            this.spaceAdded += 2
            
            // computing results when array has to enlarge/expand
            if(this.pivotArray.length - 1 === this.arrayCapacity){
                this.speednotation = "O(n)"
                this.spacenotation = "O(n)"
                this.arrayCapacity = this.arrayCapacity * 2
                this.spaceAdded += (this.arrayCapacity / 2) * 4 // added space after enlagring pivotArray (4 bytes every empty cell)
                this.space += (this.arrayCapacity / 2) * 4
            }
        }

        // for system
        // computing speedms or execution time
        const endTime = performance.now();
        let rawElapsedTime = endTime - startTime;
        let result = Math.floor(rawElapsedTime * 1e6) / 1e6

        this.lastAction = "Add"
        this.speedms = result;

        return {
            lastAction: this.lastAction,
            speedms: this.speedms,
            speednotation: this.speednotation,
            size: this._size,
            sizepointers: this._sizepointers,
            space: this.space,
            spacenotation: this.spacenotation,
            threads: this.threads,
            frequency: this.frequency,
            spaceAdded: this.spaceAdded,
            sizeAdded: this._sizeAdded,
            pointersAdded: this.pointersAdded
        }
    }

    addAfterIndex(index, item) {
        if(index < 0 || index >= this._size){
            throw new Error("Index out of bounds")
        }

        // for system 
        this.spaceAdded = 0
        this._sizeAdded = 0
        this.pointersAdded = 0

        const startTime = performance.now(); // getting execution time

        // get the node at the given index
        const node = this.getNode(index);

        // create a node with the given item/value
        const newNode = new ListNode(item);
        // for system. space added from the newNode
        this.space += 8 
        this.spaceAdded += 8

        // Adjust pointers to insert newNode after the node found at the index
        newNode.next = node.next;
        newNode.prev = node;

        // for system
        // 6 for prev and 4/6 for newNode's next reference above.
        this.space += node.next ? 6 + 6 : 4 + 6 
        this.spaceAdded += node.next ? 6 + 6 : 4 + 6

        if (node.next) {
            node.next.prev = newNode;
        }else{ // else is for system only
            this.space += 2 // from null to reference
            this.spaceAdded += 2
        }

        node.next = newNode;

        // Update tail pointer if newNode is added at the end of the list
        if (newNode.next === null) {
            this.tail = newNode;
        }

        // Increment the size of the list
        this._size++;

        // for system. at this point the notation is still O(1)
        this._sizeAdded += 1
        this.speednotation = "O(1)"
        this.spacenotation = "O(1)"

        // get the details of the closest pivot pointer
        let {closestPivotIndexInArray, closestPivotIndexInList, closestPivot} = this.getClosestPivotDetails(index)
        
        // determines the index which the update should start.
        if(closestPivot === this.head){
            closestPivotIndexInArray = 0
        }else if(closestPivot === this.tail){
            closestPivotIndexInArray = this._size-1
        }else if(closestPivotIndexInList <= index){
            closestPivotIndexInArray += 1
        } 

        // update the pivot pointers. move the pointers to left by 1. 
        // this is to make pivot pointers stay pointing on nodes on frequency indeces
        for(let i = closestPivotIndexInArray; i < this.pivotArray.length; i++){
            this.pivotArray[i] = this.pivotArray[i].prev
        }

        // for system. for updating the pivot pointers
        if(closestPivotIndexInArray >= this.pivotArray.length-1){
             // if only have to update the tail
            this.speednotation = "O(1)"
        }else{
            this.speednotation = "O(n)" // where n is the length of the pivotArray
        }
        
        // add pivot pointer
        if (this._size % this.frequency === 0) {
            this.pivotArray.push(this.tail);

            // for system
            this._sizepointers += 1
            this.pointersAdded += 1
            this.space += 2 // + 2 only, from null to reference
            this.spaceAdded += 2
            
            // computing results when array has to enlarge/expand
            if(this.pivotArray.length - 1 === this.arrayCapacity){
                this.speednotation = "O(n)"
                this.spacenotation = "O(n)"
                this.arrayCapacity = this.arrayCapacity * 2
                this.spaceAdded += (this.arrayCapacity / 2) * 4 // added space after enlagring pivotArray (4 bytes every empty cell)
                this.space += (this.arrayCapacity / 2) * 4
            }
        }

        // for system
        // computing speedms or execution time
        const endTime = performance.now();
        let rawElapsedTime = endTime - startTime;
        let result = Math.floor(rawElapsedTime * 1e6) / 1e6

        this.lastAction = "Add After Index"
        this.speedms = result;

        return {
            lastAction: this.lastAction,
            speedms: this.speedms,
            speednotation: this.speednotation,
            size: this._size,
            sizepointers: this._sizepointers,
            space: this.space,
            spacenotation: this.spacenotation,
            threads: this.threads,
            frequency: this.frequency,
            spaceAdded: this.spaceAdded,
            sizeAdded: this._sizeAdded,
            pointersAdded: this.pointersAdded
        }
    }

    delete(index) {
        if(index < 0 || index >= this._size){
            throw new Error("Index out of bounds")
        }

        // for system
        this.spaceAdded = 0
        this._sizeAdded = 0
        this.pointersAdded = 0
        const startTime = performance.now(); // getting execution time

        // Get the node at the specified index
        const nodeToDelete = this.getNode(index);

        // for system. getting the node at given index is O(1)
        // speed is O(1) if and only if the node is the last (or equal to size-1) 
        this.speednotation = "O(1)"
        this.spacenotation = "O(1)"
        this.space -= 8 // value of node to delete
        this.spaceAdded -= 8

        // Adjust pointers to remove nodeToDelete from the list
        if (nodeToDelete.prev) {
            nodeToDelete.prev.next = nodeToDelete.next;

            // for system
            // -6 as nodeTodelete prev is reference
            // -2 for prev's next pointer or 0 if no next pointer
            this.space -= nodeToDelete.next ? 6 : 2 + 6 
            this.spaceAdded -= nodeToDelete.next ? 6 : 2 + 6 
        } else {
            // If nodeToDelete is the head node, update the head pointer
            this.head = nodeToDelete.next;

            // for system
            // -4 as nodeToDelete prev is null
            // -2 for prev's next pointer or 0 if no next pointer
            this.space -= nodeToDelete.next ? 4 : 2 + 4
            this.spaceAdded -= nodeToDelete.next ? 4 : 2 + 4 
        }

        if (nodeToDelete.next) {
            nodeToDelete.next.prev = nodeToDelete.prev;
            
            // for system
            // -6 as nodeTodelete next is reference
            // -2 for next's prev pointer or 0 if no prev pointer
            this.space -= nodeToDelete.prev ? 6 : 2 + 6 
            this.spaceAdded -= nodeToDelete.prev ? 6 : 2 + 6 
        } else { // 4 // 22 20 20 20 20
            // If nodeToDelete is the tail node, update the tail pointer
            this.tail = nodeToDelete.prev;

            // for system
            // -4 as nodeToDelete next is null
            // -2 for next's prev pointer or 0 if no prev pointer
            this.space -= nodeToDelete.prev ? 4 : 2 + 4
            this.spaceAdded -= nodeToDelete.prev ? 4 : 2 + 4 
        }

        // get the details of the closest pivot pointer
        let {closestPivotIndexInArray, closestPivotIndexInList, closestPivot} = this.getClosestPivotDetails(index)
      
        // determines the index in pivot array which the update should start.
        if(closestPivot === this.head){
            closestPivotIndexInArray = 0
        }else if(closestPivot === this.tail){
            closestPivotIndexInArray = this.pivotArray.length -1
        }else if(closestPivotIndexInList < index){
            closestPivotIndexInArray += 1
        } 

        // update the pivot pointers. move the pointers to right by 1. 
        // this is to make pivot pointers stay pointing on nodes on frequency indeces
        for(let i = closestPivotIndexInArray; i < this.pivotArray.length; i++){
            let current = this.pivotArray[i]

            if(current.next){ // if it is not tail, move the pointer to right
                this.pivotArray[i] = current.next
            }else{ // if its tail, remove the pivot from array
                this.pivotArray.pop()

                // for system
                this.space -= 2 // for removing the reference from pivotArray. not it is back to null
                this.spaceAdded -= 2
                this._sizepointers -= 1
                this.pointersAdded -= 1
            }
        }

        // for system. for when updating the pivot pointers
        if(closestPivotIndexInArray >= this.pivotArray.length-1){
            // if only have to update the tail
           this.speednotation = "O(1)"
        }else{
            this.speednotation = "O(n)" // where n is the length of the pivotArray
        }

        // Decrement the size of the list
        // size-- has to be put here since getClosestPivot uses index
        this._size--;
        this._sizeAdded -= 1 // for system

        // for system
        // computing speedms or execution time
        const endTime = performance.now();
        let rawElapsedTime = endTime - startTime;
        let result = Math.floor(rawElapsedTime * 1e6) / 1e6

        this.lastAction = "Delete"
        this.speedms = result;

        return {
            lastAction: this.lastAction,
            speedms: this.speedms,
            speednotation: this.speednotation,
            size: this._size,
            sizepointers: this._sizepointers,
            space: this.space,
            spacenotation: this.spacenotation,
            threads: this.threads,
            frequency: this.frequency,
            spaceAdded: this.spaceAdded,
            sizeAdded: this._sizeAdded,
            pointersAdded: this.pointersAdded
        }
    }


    // returns the value of the node in the given index
    get(index){
        if(index < 0 || index >= this._size){
            throw new Error("Index out of bounds")
        }

        // for system
        this._sizeAdded = 0
        this.spaceAdded = 0
        this.pointersAdded = 0

        const startTime = performance.now();

        let returnValue = this.getNode(index).value // return item when used regularly

        // for system
        const endTime = performance.now();

        let rawElapsedTime = endTime - startTime;
        let result = Math.floor(rawElapsedTime * 1e6) / 1e6

        this.lastAction = "Get / Update"
        this.speedms = result
        this.speednotation = "O(1)"
        this.spacenotation = "O(1)"

        return {
            lastAction: this.lastAction,
            speedms: this.speedms,
            speednotation: this.speednotation,
            size: this._size,
            sizepointers: this._sizepointers,
            space: this.space,
            spacenotation: this.spacenotation,
            threads: this.threads,
            frequency: this.frequency,
            spaceAdded: this.spaceAdded,
            sizeAdded: this._sizeAdded,
            pointersAdded: this.pointersAdded
        }
    }

    // returns the whole node in the given index
    getNode(index) {
        if(index < 0 || index >= this._size){
            throw new Error("Index out of bounds")
        }

        let {closestPivotIndexInArray, closestPivotIndexInList, closestPivot} = this.getClosestPivotDetails(index)

        // gettig to the node on the given index from closest pivot
        if(closestPivotIndexInList < index){
            for(let i = closestPivotIndexInList; i < index; i++){
                closestPivot = closestPivot.next
            }
        }else{
            for(let i = closestPivotIndexInList; i > index; i--){
                closestPivot = closestPivot.prev
            }
        }

        return closestPivot // now the node in the given index
    }

    // returns the pivot pointer and its index in array and in the list.
    getClosestPivotDetails(index){
        if(index < 0 || index >= this._size){
            throw new Error("Index out of bounds")
        }

        // Calculate the index using the formula
        const position = Math.round(((index+1) - this.frequency) / this.frequency) + 1;
        
        let closestPivotIndexInArray
        let closestPivotIndexInList
        let closestPivot
        
        if (position < 1){
            closestPivotIndexInArray = null
            closestPivotIndexInList = 0
            closestPivot = this.head
        } else if (position > this.pivotArray.length) {
            closestPivotIndexInArray = null
            closestPivotIndexInList = this._size-1
            closestPivot = this.tail
        } else {
            closestPivotIndexInArray = position -1
            closestPivotIndexInList = (position * this.frequency) - 1
            closestPivot = this.pivotArray[position-1]
        } 

        return {closestPivotIndexInArray, closestPivotIndexInList, closestPivot}
    }
    

    print() {
        let current = this.head;
        let i = 0;
        while (current) {
            let pivotMarker = '';
            if (this.pivotArray.includes(current)) {
                pivotMarker = ' (pivot)';
            }
            console.log(`Index: ${i}, Value: ${current.value}${pivotMarker}`);
            current = current.next;
            i++;
        }

        console.log([...this.pivotArray], "pivot array")
    }
}
