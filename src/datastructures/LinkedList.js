export default class LinkedList{
    #lastAction = null
    #speedms = 0;
    #speednotation = null
    #size = 0; 
    #sizepointers = 0;

    // initial space allocated
    // 8 from size property
    // 4 each for head and tail
    #space = 8 + 4 + 4;

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
        // for system
        this.#space += 8 // from created item
        this.#spaceAdded += 8

        if(this.#size === 0){
            this.#head = nodeToBeAdded
            this.#tail = this.#head
            
            // for system
            // 2 bytes each for head and tail, from null to reference.
            // 4 bytes each for newNode's null prev and next
            this.#space += 2 + 2 + 4 + 4
            this.#spaceAdded += 2 + 2 + 4 + 4

            this.#speednotation = "O(1)"
            this.#spacenotation = "O(1)"

            this.#sizepointers = 2
            this.#pointersAdded += 2 // head and tail
        }else{
            this.#addAfter(this.#tail, nodeToBeAdded)
            this.#tail = nodeToBeAdded

            // for system
            this.#speednotation = "O(1)"
            this.#spacenotation = "O(1)"

            this.#spaceAdded += 2 + 4 + 6
            this.#space += 2 + 4 + 6 
            // add 2 from previously null next pointer of tail
            // add 4 from null next pointer of newNode
            // add 6 from prev reference of newNode
        }

        this.#size += 1; 
        this.#sizeAdded += 1; // for system

        const endTime = performance.now();

        let rawElapsedTime = endTime - startTime;
        let result = Math.floor(rawElapsedTime * 1e6) / 1e6
          
        this.#lastAction = "Add"
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

    addAfterIndex(index, item){
        this.#sizeAdded = 0
        this.#spaceAdded = 0
        this.#pointersAdded = 0;

        const startTime = performance.now();

        let nodeToBeAdded = new this.#Node(item)
        // for system
        this.#spaceAdded += 8 // from nodeToBeCreated
        this.#space += 8

        let node = this.#getNode(index)
        // for system
        this.#speednotation = "O(1)"
        this.#spacenotation = "O(1)"

        this.#addAfter(node, nodeToBeAdded)

        if(node === this.#tail){
            this.#tail = nodeToBeAdded

            // for system
            this.#spacenotation = "O(1)"
            this.#speednotation = "O(1)"

            // add 2 from previously null next pointer of tail
            // add 4 from null next pointer of nodeToBeAdded
            // add 6 from prev reference of nodeToBeAdded
            this.#spaceAdded += 2 + 4 + 6
            this.#space += 2 + 4 + 6 
        }else{ // for system
            this.#spacenotation = "O(n)"
            this.#speednotation = "O(n)"

            // add 6 each from prev and next reference of nodeToBeAdded
            this.#spaceAdded += 6 + 6
            this.#space += 6 + 6
        }

        this.#size += 1;
        this.#sizeAdded += 2 // for system 

        const endTime = performance.now();

        let rawElapsedTime = endTime - startTime;
        let result = Math.floor(rawElapsedTime * 1e6) / 1e6

        this.#lastAction = "Add After Index"
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
            this.#speednotation = "O(1)"
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
        // for system
        this.#space -= 8 // from nodeToBeDeleted
        this.#spaceAdded -= 8

        let nextNode = nodeToBeDeleted.next
        let prevNode = nodeToBeDeleted.prev

        if(this.#size === 1){
            this.#head = undefined
            this.#tail = undefined

            // for system
            this.#spacenotation = "O(1)"
            this.#speednotation = "O(1)"
            this.#pointersAdded -= 2 // from removed head and tail

            // 2 each for head and tail
            // 4 each for nodeToBeDeleted prev and next
            this.#space -= 2 + 2 + 4 + 4 
            this.#spaceAdded -= 2 + 2 + 4 + 4
        }else if(nodeToBeDeleted === this.#head){
            nextNode.prev = undefined
            this.#head = nextNode

            // for system
            this.#spacenotation = "O(1)"
            this.#speednotation = "O(1)"

            // 6 for nodeToBeDeleted next reference
            // 4 for nodeToBeDeleted empty prev
            // 2 for nodeToBeDeleted next's prev reference to null
            this.#space -= 6 + 4 + 2
            this.#spaceAdded -= 6 + 4 + 2
        }else if(nodeToBeDeleted === this.#tail){
            prevNode.next = undefined
            this.#tail = prevNode

            // for system
            this.#spacenotation = "O(1)"
            this.#speednotation = "O(1)"

            // 6 for nodeToBeDeleted prev reference
            // 4 for nodeToBeDeleted empty next
            // 2 for nodeToBeDeleted prev's next reference to null
            this.#space -= 6 + 4 + 2
            this.#spaceAdded -= 6 + 4 + 2
        }else{
            nextNode.prev = prevNode
            prevNode.next = nextNode

            // for system
            this.#spacenotation = "O(n)"
            this.#speednotation = "O(n)"

            // 6 each for nodeToBeDeleted prev and next
            this.#space -= 6 + 6 
            this.#spaceAdded -= 6 + 6
        }

        this.#size -= 1
        this.#sizeAdded -= 1

        const endTime = performance.now();

        let rawElapsedTime = endTime - startTime;
        let result = Math.floor(rawElapsedTime * 1e6) / 1e6
  
        this.#lastAction = "Delete"
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
