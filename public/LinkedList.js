export default class LinkedList{
    #lastAction = null
    #speedms = 0;
    #speednotation = null
    #size = 0; 
    #sizepointers = 0;
    #space = 0;
    #spacenotation = null
    #threads = 0;
    #spaceAdded = 0;
    #sizeAdded = 0;
    #pointersAdded = 0;

    #head
    #tail 

    #Node = class{
        prev
        next
        item

        constructor(item){
            this.item = item;
        }
    }

    toJSON() {
        return JSON.stringify({
            lastAction: this.#lastAction,
            speedms: this.#speedms,
            speednotation: this.#speednotation,
            size: this.#size,
            sizepointers: this.#sizepointers,
            space: this.#space,
            spacenotation: this.#spacenotation,
            threads: this.#threads,
            sizeAdded: this.#sizeAdded,
            spaceAdded: this.#spaceAdded,
            pointersAdded: this.#pointersAdded
        })
    }
    
    static parse(serializedData) {
        serializedData = JSON.parse(serializedData)

        let newList = new LinkedList()
        
        for(let i = 0; i < serializedData.size; i++)
            newList.add(i);

        newList.setLastActionResult(serializedData)
    
        return newList;
    }

    setLastActionResult(lastAction){
        this.#lastAction = lastAction.lastAction
        this.#speedms = lastAction.speedms
        this.#speednotation = lastAction.speednotation
        this.#sizepointers = lastAction.sizepointers
        this.#space = lastAction.space
        this.#spacenotation = lastAction.spacenotation
        this.#threads = lastAction.threads
        this.#sizeAdded = lastAction.sizeAdded
        this.#spaceAdded = lastAction.spaceAdded
        this.#pointersAdded = lastAction.pointersAdded
    }

    getLastActionResult(){
        return {
            lastAction: this.#lastAction,
            speedms: this.#speedms,
            speednotation: this.#speednotation,
            size: this.#size,
            sizepointers: this.#sizepointers,
            space: this.#space,
            spacenotation: this.#spacenotation,
            threads: this.#threads,
            sizeAdded: this.#sizeAdded,
            spaceAdded: this.#spaceAdded,
            pointersAdded: this.#pointersAdded
        }
    }

    print(){
        if(this.isEmpty()){
            console.log("List is Empty")
            return
        }

        console.log("Properties:", {
            lastAction: this.#lastAction,
            speedms: this.#speedms,
            speednotation: this.#speednotation,
            size: this.#size,
            sizepointers: this.#sizepointers,
            space: this.#space,
            spacenotation: this.#spacenotation,
            threads: this.#threads,
            sizeAdded: this.#sizeAdded,
            spaceAdded: this.#spaceAdded,
            pointersAdded: this.#pointersAdded
        });

        let node = this.#head
    
        for(let i = 0; i < this.#size; i++){
            let str = `[`
            str += node.prev === undefined ? `X|` : node.prev.item + `|`
            str += node.item + `|`
            str += node.next === undefined ? `X` : node.next.item
            str += `]`

            node = node.next

            console.log(str)
        }
    }

    size(){
        return this.#size
    }

    add(item){
        this.#sizeAdded = 0
        this.#spaceAdded = 0
        this.#pointersAdded = 0;

        const startTime = performance.now();

        let nodeToBeAdded = new this.#Node(item)

        if(this.#size === 0){
            this.#head = nodeToBeAdded
            this.#tail = this.#head
            
            const endTime = performance.now();

            let rawElapsedTime = endTime - startTime;
            let result = Math.floor(rawElapsedTime * 1e6) / 1e6

            // result
            if(nodeToBeAdded.prev == undefined){
                this.#space += 4
                this.#spaceAdded += 4
            }else{
                this.#space += 6
                this.#spaceAdded += 6
            }
            
            if(nodeToBeAdded.next == undefined){
                this.#space += 4
                this.#spaceAdded += 4
            }else{
                this.#space += 6
                this.#spaceAdded += 6
            }
            
            this.#lastAction = "Add"
            this.#speedms = result;
            this.#speednotation = "O(1)"
            this.#size += 1; 
            this.#sizeAdded += 1;
            this.#spacenotation = "O(n)"
            this.#space += 8 // for item
            this.#spaceAdded += 8
            this.#sizepointers += 2
            this.#pointersAdded += 2

            return {
                lastAction: this.#lastAction,
                speedms: this.#speedms,
                speednotation: this.#speednotation,
                size: this.#size,
                sizepointers: this.#sizepointers,
                space: this.#space,
                spacenotation: this.#spacenotation,
                threads: this.#threads,
                sizeAdded: this.#sizeAdded,
                spaceAdded: this.#spaceAdded,
                pointersAdded: this.#pointersAdded
            }
        }

        this.#addAfter(this.#tail, nodeToBeAdded)
        this.#tail = nodeToBeAdded

        const endTime = performance.now();

        let rawElapsedTime = endTime - startTime;
        let result = Math.floor(rawElapsedTime * 1e6) / 1e6


        // result
        if(nodeToBeAdded.prev == undefined){
            this.#space += 4
            this.#spaceAdded += 4
        }else{
            this.#space += 6
            this.#spaceAdded += 6
        }
           
        if(nodeToBeAdded.next == undefined){
            this.#space += 4
            this.#spaceAdded += 4
        }else{
            this.#space += 6
            this.#spaceAdded += 6
        }
          
        this.#lastAction = "Add"
        this.#speedms = result;
        this.#speednotation = "O(1)"
        this.#size += 1; 
        this.#sizeAdded += 1;
        this.#spacenotation = "O(n)"
        this.#space += 8 // for item
        this.#spaceAdded += 8

        return {
            lastAction: this.#lastAction,
            speedms: this.#speedms,
            speednotation: this.#speednotation,
            size: this.#size,
            sizepointers: this.#sizepointers,
            space: this.#space,
            spacenotation: this.#spacenotation,
            threads: this.#threads,
            sizeAdded: this.#sizeAdded,
            spaceAdded: this.#spaceAdded,
            pointersAdded: this.#pointersAdded
        }
    }

    addAfterIndex(index, item){
        this.#sizeAdded = 0
        this.#spaceAdded = 0
        this.#pointersAdded = 0;

        const startTime = performance.now();

        let nodeToBeAdded = new this.#Node(item)

        let node = this.#getNode(index)
        this.#addAfter(node, nodeToBeAdded)

        if(node === this.#tail){
            this.#tail = nodeToBeAdded
            this.#spacenotation = "O(1)"
            this.#speednotation = "O(n)"
        }else{
            this.#spacenotation = "O(n)"
            this.#speednotation = "O(n)"
        }

        const endTime = performance.now();

        let rawElapsedTime = endTime - startTime;
        let result = Math.floor(rawElapsedTime * 1e6) / 1e6


        // result
        if(nodeToBeAdded.prev == undefined){
            this.#space += 4
            this.#spaceAdded += 4
        }else{
            this.#space += 6
            this.#spaceAdded += 6
        }
            
        if(nodeToBeAdded.next == undefined){
            this.#space += 4
            this.#spaceAdded += 4
        }else{
            this.#space += 6
            this.#spaceAdded += 6
        }
        
        this.#lastAction = "Add"
        this.#speedms = result;
 
        this.#size += 1; 
        this.#sizeAdded += 1;

        this.#space += 8 // for item
        this.#spaceAdded += 8
  
        return {
            lastAction: this.#lastAction,
            speedms: this.#speedms,
            speednotation: this.#speednotation,
            size: this.#size,
            sizepointers: this.#sizepointers,
            space: this.#space,
            spacenotation: this.#spacenotation,
            threads: this.#threads,
            sizeAdded: this.#sizeAdded,
            spaceAdded: this.#spaceAdded,
            pointersAdded: this.#pointersAdded
        }
    }

    get(index){
        this.#sizeAdded = 0
        this.#spaceAdded = 0
        this.#pointersAdded = 0

        const startTime = performance.now();

        let node = this.#getNode(index).item

        const endTime = performance.now();

        //results
        let rawElapsedTime = endTime - startTime;
        let result = Math.floor(rawElapsedTime * 1e6) / 1e6

        if(index === this.#size-1 || index === 0){
            this.#spacenotation = "O(1)"
            this.#speednotation = "O(n)"
        }else{
            this.#spacenotation = "O(n)"
            this.#speednotation = "O(n)"
        }
        
        this.#lastAction = "Get"
        this.#speedms = result;
     
        return {
            lastAction: this.#lastAction,
            speedms: this.#speedms,
            speednotation: this.#speednotation,
            size: this.#size,
            sizepointers: this.#sizepointers,
            space: this.#space,
            spacenotation: this.#spacenotation,
            threads: this.#threads,
            sizeAdded: this.#sizeAdded,
            spaceAdded: this.#spaceAdded,
            pointersAdded: this.#pointersAdded
        }
    }

    delete(index){
        this.#sizeAdded = 0
        this.#spaceAdded = 0
        this.#pointersAdded = 0

        const startTime = performance.now();

        let nodeToBeDeleted = this.#getNode(index)
        let nextNode = nodeToBeDeleted.next
        let prevNode = nodeToBeDeleted.prev

        if(this.#size === 1){
            this.#head = undefined
            this.#tail = undefined
            this.#spacenotation = "O(1)"
            this.#speednotation = "O(n)"
            this.#pointersAdded -= 2
        }else if(nodeToBeDeleted === this.#head){
            nextNode.prev = undefined
            this.#head = nextNode
            this.#spacenotation = "O(1)"
            this.#speednotation = "O(n)"
        }else if(nodeToBeDeleted === this.#tail){
            prevNode.next = undefined
            this.#tail = prevNode
            this.#spacenotation = "O(1)"
            this.#speednotation = "O(n)"
        }else{
            nextNode.prev = prevNode
            prevNode.next = nextNode
            this.#spacenotation = "O(n)"
            this.#speednotation = "O(n)"
        }

        const endTime = performance.now();

        let rawElapsedTime = endTime - startTime;
        let result = Math.floor(rawElapsedTime * 1e6) / 1e6

        if(nodeToBeDeleted.prev == undefined){
            this.#space -= 4
            this.#spaceAdded -= 4
        }else{
            this.#space -= 6
            this.#spaceAdded -= 6
        }
            
        if(nodeToBeDeleted.next == undefined){
            this.#space -= 4
            this.#spaceAdded -= 4
        }else{
            this.#space -= 6
            this.#spaceAdded -= 6
        }
        
        this.#size -= 1
        this.#lastAction = "Delete"
        this.#speedms = result;
        this.#sizeAdded -= 1;
        this.#space -= 8 // for item
        this.#spaceAdded -= 8

        return {
            lastAction: this.#lastAction,
            speedms: this.#speedms,
            speednotation: this.#speednotation,
            size: this.#size,
            sizepointers: this.#sizepointers,
            space: this.#space,
            spacenotation: this.#spacenotation,
            threads: this.#threads,
            sizeAdded: this.#sizeAdded,
            spaceAdded: this.#spaceAdded,
            pointersAdded: this.#pointersAdded
        }
    }

    pop(){
        return this.delete(this.#size-1)
    }

    isEmpty(){
        return this.#size === 0
    }

    #getNode(index){
        let pointer = this.#getClosest(index)

        if(pointer === this.#tail){
            for(let i = this.#size-1; i > index; i--){
                pointer = pointer.prev
            }
        }else{
            for(let i = 0; i < index; i++){
                pointer = pointer.next
            }
        }

        return pointer
    }

    #getClosest(index){
        if(this.isEmpty()){
            throw new Error('List is Empty')
        }

        if(index < 0 || index >= this.#size){
            throw new Error('Index is out of bounds')
        }

        let tailIndex = this.#size -1
        let headIndex = 0

        if((index - headIndex) < (tailIndex - index)){
            return this.#tail
        }else{
            return this.#head
        }
    }

    #addAfter(node, nodeToBeAdded){
        let next = node.next
        
        node.next = nodeToBeAdded

        nodeToBeAdded.prev = node;
        nodeToBeAdded.next = next;

        if(node !== this.#tail){
            next.prev = nodeToBeAdded;
        }
    }
}
