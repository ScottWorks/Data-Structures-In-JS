function Node(data) {
  this.data = data;
  this.next = null;
}

function SinglyLinkedList() {
  this.head = null;
  this.tail = null;
  this.index = 0;
}

SinglyLinkedList.prototype.add = function(data) {
  var node = new Node(data);
  if (!this.head) {
    this.head = node;
    this.tail = node;
  } else {
    this.tail.next = node;
    this.tail = node;
  }

  this.index++;
};

SinglyLinkedList.prototype.remove = function(data) {
  var previous = this.head;
  var current = this.head;

  while (current) {
    if (current.data === data) {
      if (current === this.head) {
        this.head = this.head.next;
      }

      if (current === this.tail) {
        this.tail = previous;
      }

      /* Overwrites previous.next with the node 
      that comes after the node containing the data.*/
      // HEAD -> 0 -> 3 -> [-1] -> 9 -> NULL
      // Node 3 points to Node 9

      previous.next = current.next;
      this.index--;
    } else {
      previous = current;
    }
    current = current.next;
  }
};

SinglyLinkedList.prototype.insertAfter = function(data, toNodeData) {
  var current = this.head;

  while (current) {
    if (current.data === toNodeData) {
      var toNode = new Node(data);

      if (current === this.tail) {
        this.tail.next = toNode;
        this.tail = null;
      } else {
        toNode.next = current.next;
        current.next = toNode;
      }

      this.index++;
    }

    current = current.next;
  }
};

SinglyLinkedList.prototype.mutateEach = function(fn) {
  var current = this.head;

  while (current) {
    if (fn) {
      fn(current);
    }

    current = current.next;
  }
};

SinglyLinkedList.prototype.length = function() {
  console.log(this.index);
};

SinglyLinkedList.prototype.print = function() {
  var string = '';
  var current = this.head;

  while (current) {
    if (current === this.head) {
      string += ` [${current.data}]`;
    } else {
      string += `--->[${current.data}]`;
    }

    current = current.next;
  }

  console.log(string);
};

var newList = new SinglyLinkedList();

newList.add(1);
newList.add(-1);
newList.add(1);
newList.add(3);
newList.add(5);
newList.add(9);
newList.print(); // [1]--->[-1]--->[1]--->[3]--->[5]--->[9]
newList.length(); // 6

newList.remove(5);
newList.print(); // [1]--->[-1]--->[1]--->[3]--->[9]
newList.length(); // 5

newList.remove(1);
newList.print(); // [-1]--->[3]--->[9]
newList.length(); // 3

newList.insertAfter(7, 3);
newList.print(); // [-1]--->[3]--->[7]--->[9]
newList.length(); // 4

newList.insertAfter(1, 9);
newList.print(); // [-1]--->[3]--->[7]--->[9]--->[1]
newList.length(); // 5

newList.insertAfter(4, -1);
newList.print(); // [-1]--->[4]--->[3]--->[7]--->[9]--->[1]
newList.length(); // 6

newList.mutateEach(function(node) {
  node.data *= 2;
});

newList.print(); // [-2]--->[8]--->[6]--->[14]--->[18]--->[2]
newList.length(); // 6
