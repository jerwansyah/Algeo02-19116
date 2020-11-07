const fs = require('fs');
const readline = require('readline');

// Reference : https://stackoverflow.com/questions/6156501/read-a-file-one-line-at-a-time-in-node-js/32599033

class ListNode {
    constructor(data) {
        this.data = data
        this.counter = 0;
        this.next = null
    }
}

class LinkedList {
    constructor(head = null, tail = null) {
        this.head = head
        this.tail = tail
    }

    size() {
        let count = 0;
        let node = this.head;
        while (node) {
            count++;
            node = node.next;
        }
        return count;
    }

    clear() {
        this.head = null;
        this.tail = null;
    }

    getFirst() {
        return this.head;
    }

    getLast() {
        return this.tail;
    }

    IsEmpty() {
        return (this.head == null);
    }
}

function fileToArray() {
    var tempArray = [];
    var word;
    var L = new LinkedList();

    const fileStream = fs.createReadStream('./uploads/aa.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    // crlfDelay : Infinity option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.
        
    for await (const line of rl) {
        // Each line in input.txt will be successively available here as `line`.
        console.log(`Line from file: ${line}`);
        tempArray = line.split(" ");
        
        for (word in tempArray) {
            CekNAddList(L, word);
        }
    }
}

function CekNAddList(list, word) {
    var searcher = list.head;
    if (list.IsEmpty()) {
        // list empty
        var newNode = new ListNode(word);
        list.head = newNode;
        list.tail = newNode;
    } else {
        // list not empty
        while ((word != searcher.data) && (searcher.next != null)) {
            searcher = searcher.next;
        }
        
        if (searcher == null) {
            // word is not exist, add new node
            var newNode = new ListNode(word); // initialize
            list.tail.next = newNode; // set tail.next to newNode
            list.tail = newNode; // set newNode as tail
        } else {
            // word is found, counter increase
            searcher.counter += 1;
        }
    }   
}

fileToArray();
