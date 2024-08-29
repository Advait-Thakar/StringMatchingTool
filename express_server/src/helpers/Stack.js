class Stack {
    constructor() {
        this.stack = [];
    }

    push(element) {
        this.stack.push(element);    
    }

    pop() {
        if (this.isEmpty()) {
            return "Stack is Empty";
        }
        
        return this.stack.pop()
    }

    isEmpty() {
        return this.stack.length===0
    }
}

module.exports = Stack;