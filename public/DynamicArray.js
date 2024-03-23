export default class DynamicArray{
    #lastAction = null

    #capacity = null;
    #sizepointers = 0;
    #pointersAdded = 0;
    #size = 0; 
    #sizeAdded = 0;

    #speedms = 0;
    #speednotation = null
    
    #space = 0;
    #spaceAdded = 0;
    #spacenotation = null

    #threads = 0;
 
    #array = []

    // null = 4 bytes
    // reference = 6 bytes
    // number = 8 bytes

    constructor(capacity){
        this.#capacity = capacity

        for(let i = 0; i < capacity; i++){
            this.#array.push(null)
            this.#space += 4
        }
    }

    // JSON function
    toJSON() {
        return JSON.stringify({
            capacity: this.#capacity,
            lastAction: this.#lastAction,
            speedms: this.#speedms,
            speednotation: this.#speednotation,
            size: this.#size,
            sizeAdded: this.#sizeAdded,
            sizepointers: this.#sizepointers,
            space: this.#space,
            spaceAdded: this.#spaceAdded,
            spacenotation: this.#spacenotation,
            threads: this.#threads,
            pointersAdded: this.#pointersAdded
        })
    }
    
    static parse(serializedData) {
        serializedData = JSON.parse(serializedData)
 
        let newArray = new DynamicArray(serializedData.capacity)
        
        for(let i = 0; i < serializedData.size; i++){
            newArray.add(0)
        }

        newArray.setLastActionResult(serializedData)
    
        return newArray;
    }

    setLastActionResult(lastAction){
        this.#lastAction = lastAction.lastAction
        this.#speedms = lastAction.speedms
        this.#speednotation = lastAction.speednotation
        this.#sizepointers = lastAction.sizepointers
        this.#space = lastAction.space
        this.#spacenotation = lastAction.spacenotation
        this.#threads = lastAction.threads
        this.#spaceAdded = lastAction.spaceAdded
        this.#sizeAdded = lastAction.sizeAdded
        this.#pointersAdded = lastAction.pointersAdded
    }
    
    // general functions
    print(){
       console.log("Properties:", {
            capacity: this.#capacity,
            lastAction: this.#lastAction,
            speedms: this.#speedms,
            speednotation: this.#speednotation,
            size: this.#size,
            sizeAdded: this.#sizeAdded,
            sizepointers: this.#sizepointers,
            space: this.#space,
            spaceAdded: this.#spaceAdded,
            spacenotation: this.#spacenotation,
            threads: this.#threads,
            pointersAdded: this.#pointersAdded
        });

       console.log("Array:", this.#array);
    }

    getLastActionResult(){
        return {
            capacity: this.#capacity,
            lastAction: this.#lastAction,
            speedms: this.#speedms,
            speednotation: this.#speednotation,
            size: this.#size,
            sizeAdded: this.#sizeAdded,
            sizepointers: this.#sizepointers,
            space: this.#space,
            spaceAdded: this.#spaceAdded,
            spacenotation: this.#spacenotation,
            threads: this.#threads,
            pointersAdded: this.#pointersAdded
        }
    }

    size(){
        return this.#size
    }

    getCapacity(){
        return this.#capacity
    }

    update(index, item){
        this.#array[index] = item
    }

    // add functions
    add(item){
        this.#sizeAdded = 0
        this.#spaceAdded = 0
        
        const startTime = performance.now();

        let index = this.#size;

        if(this.isFull()){
            this.#enlargeArray()
            this.#speednotation = "O(n)"
            this.#spacenotation = "O(n)"
            this.#sizeAdded = this.#size
        }else{
            this.#speednotation = "O(1)"
            this.#spacenotation = "O(n)"
            this.#sizeAdded = 0
        }
        
        this.#array[index] = item

        const endTime = performance.now();

        let rawElapsedTime = endTime - startTime;
        let result = Math.floor(rawElapsedTime * 1e6) / 1e6


        // result
        this.#lastAction = "Add"
        this.#speedms = result
        this.#size += 1;
       
        this.#space += 4
        this.#spaceAdded += 4
        
        return {
            capacity: this.#capacity,
            lastAction: this.#lastAction,
            speedms: this.#speedms,
            speednotation: this.#speednotation,
            size: this.#size,
            sizeAdded: this.#sizeAdded,
            sizepointers: this.#sizepointers,
            space: this.#space,
            spaceAdded: this.#spaceAdded,
            spacenotation: this.#spacenotation,
            threads: this.#threads,
            pointersAdded: this.#pointersAdded
        }
    }

    addAfterIndex(index, item){
        this.#sizeAdded = 0
        this.#spaceAdded = 0

        const startTime = performance.now();
    
        if(this.isFull()){
            this.#enlargeArray()
            this.#speednotation = "O(n)"
            this.#spacenotation = "O(n)"
            this.#sizeAdded = this.#size
        }else if(index === this.#size-1){
            this.#speednotation = "O(1)" 
            this.#spacenotation = "O(n)"
            this.#sizeAdded = 0
        }else{
            this.#speednotation = "O(n)"
            this.#spacenotation = "O(n)"
            this.#sizeAdded = 0
        }

        this.#moveItemsToRight(index+1)

        this.#array[index+1] = item;

        const endTime = performance.now();

        let rawElapsedTime = endTime - startTime;
        let result = Math.floor(rawElapsedTime * 1e6) / 1e6


        // result
        this.#lastAction = "Add After Index"
        this.#speedms = result
        this.#size += 1;
        this.#space += 4
        this.#spaceAdded += 4

        return {
            capacity: this.#capacity,
            lastAction: this.#lastAction,
            speedms: this.#speedms,
            speednotation: this.#speednotation,
            size: this.#size,
            sizeAdded: this.#sizeAdded,
            sizepointers: this.#sizepointers,
            space: this.#space,
            spaceAdded: this.#spaceAdded,
            spacenotation: this.#spacenotation,
            threads: this.#threads,
            pointersAdded: this.#pointersAdded
        }
    }

    addBeforeIndex(index, item){
        this.#sizeAdded = 0
        this.#spaceAdded = 0

        const startTime = performance.now();

        if(this.isFull()){
            this.#enlargeArray()
            this.#speednotation = "O(n)"
            this.#spacenotation = "O(n)"
            this.#sizeAdded = this.#size
        }else if(index === 0){
            this.#speednotation = "O(1)" 
            this.#spacenotation = "O(n)"
            this.#sizeAdded = 0
        }else{
            this.#speednotation = "O(n)"
            this.#spacenotation = "O(n)"
            this.#sizeAdded = 0
        }

        this.#moveItemsToRight(index)

        this.#array[index] = item;

        const endTime = performance.now();

        let rawElapsedTime = endTime - startTime;
        let result = Math.floor(rawElapsedTime * 1e6) / 1e6


        // result
        this.#lastAction = "Add Before Index"
        this.#speedms = result
        this.#size += 1;
        this.#space += 4
        this.#spaceAdded += 4

        return {
            capacity: this.#capacity,
            lastAction: this.#lastAction,
            speedms: this.#speedms,
            speednotation: this.#speednotation,
            size: this.#size,
            sizeAdded: this.#sizeAdded,
            sizepointers: this.#sizepointers,
            space: this.#space,
            spaceAdded: this.#spaceAdded,
            spacenotation: this.#spacenotation,
            threads: this.#threads,
            pointersAdded: this.#pointersAdded
        }
    }

    delete(index){
        // speed is O(1) if and only if the node is the last (or equal to size-1) 
        this.#sizeAdded = 0
        this.#spaceAdded = 0

        const startTime = performance.now();

        if(index === this.#size-1){
            this.#speednotation = "O(1)"
            this.#spacenotation = "O(n)"
            this.#sizeAdded = 0
        }else{
            this.#speednotation = "O(n)"
            this.#spacenotation = "O(n)"
            this.#sizeAdded = 0
        }

        this.#moveItemsToLeft(index+1)
        this.#array[this.#size-1] = null

        const endTime = performance.now();

        let rawElapsedTime = endTime - startTime;
        let result = Math.floor(rawElapsedTime * 1e6) / 1e6


        // result
        this.#lastAction = "Delete"
        this.#speedms = result
        this.#size -= 1;
        this.#space -= 4
        this.#spaceAdded -= 4

        return {
            capacity: this.#capacity,
            lastAction: this.#lastAction,
            speedms: this.#speedms,
            speednotation: this.#speednotation,
            size: this.#size,
            sizeAdded: this.#sizeAdded,
            sizepointers: this.#sizepointers,
            space: this.#space,
            spaceAdded: this.#spaceAdded,
            spacenotation: this.#spacenotation,
            threads: this.#threads,
            pointersAdded: this.#pointersAdded
        }
    }

    get(index){
        this.#sizeAdded = 0
        this.#spaceAdded = 0

        const startTime = performance.now();

        let retrievedItem = this.#array[index];

        const endTime = performance.now();

        let rawElapsedTime = endTime - startTime;
        let result = Math.floor(rawElapsedTime * 1e6) / 1e6

        // result
        this.#lastAction = "Get / Update"
        this.#speedms = result
        this.#speednotation = "O(1)"
        this.#spacenotation = "O(n)"

        return {
            capacity: this.#capacity,
            lastAction: this.#lastAction,
            speedms: this.#speedms,
            speednotation: this.#speednotation,
            size: this.#size,
            sizeAdded: this.#sizeAdded,
            sizepointers: this.#sizepointers,
            space: this.#space,
            spaceAdded: this.#spaceAdded,
            spacenotation: this.#spacenotation,
            threads: this.#threads,
            pointersAdded: this.#pointersAdded
        }
    }

    isFull(){
        return this.#size === this.#capacity
    }

    #enlargeArray(){
        let newArr = []

        // migrating values from orig to new array
        for(let i = 0; i < this.#size; i++){
            newArr.push(this.#array[i])
        }

        // filling up capacity with null and computing space allocated
        for(let i = 0; i < this.#capacity; i++){
            newArr.push(null)
            this.#space += 4
            this.#spaceAdded += 4
        }

        this.#capacity *= 2;
        this.#array = newArr
    }

    #moveItemsToRight(startingIndex){
        for(let i = this.#size; i > startingIndex; i--){
            this.#array[i] = this.#array[i-1]
        }
    }

    #moveItemsToLeft(startingIndex){
        for(let i = startingIndex; i < this.#size; i++){
            this.#array[i-1] = this.#array[i]
        }
    }
}