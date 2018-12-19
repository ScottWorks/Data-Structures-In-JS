## Linked Lists

Linked lists are a A linear collection of data elements called nodes pointing to the next node via pointer. A collection of these nodes represents a sequence. The head points to the first node, and the last node (tail) points to NULL.

### Arrays vs Linked Lists

Both linked lists and arrays act as a linear data store however there are some adavantages between the two data structures.

An array consumes contiguous memory locations that are allocated at compile time, therefore the size of an array is fixed. It is possible to [dynamically change the size](https://brilliant.org/wiki/dynamic-arrays/) however with larger sets of data this becomes [computationally expensive](https://en.wikipedia.org/wiki/Dynamic_array#Performance). One big advantage that arrays have is that their access to elements is O(1). Therefore if lookups in large sets of data are important then its possible that an array has an advantage.

Linked lists are not as ridgid, memory is assigned as the list is modified. Elements can be inserted or removed from the beginning or end (assuming the tail is known) in constant time. While insertion and deletion are clearly a major advantage accessing that information occurs in a linear (O(n)) fashion,accessing any part of the list requires the program to sequentially traverse the list until the correct node is found.

### Time Complexity

#### Average

| Access | Search | Insertion | Insertion |
| :----: | :----: | :-------: | :-------: |
|  O(n)  |  O(n)  |   O(1)    |   O(1)    |

## Singly Linked List

In the single linked list the node only stores the data and a pointer to the next node.

![fig1](/Linked-Lists/images/fig1.png)

### Insertion

```js
function Node(data) {
  this.data = data;
  this.next = null;
}

function SinglyLinkedList() {
  this.head = null;
  this.tail = null;
  this.numberOfValues = 0;
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
  this.numberOfValues++;
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
```

### Removal

```js
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

      // Overwrites previous.next with the node that comes after the node containing the data.
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
```

### Misc.

```js
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
```

## Double Linked Lists

The main difference between a single and double linked list is that the nodes of the double linked list store pointers to both the next and previous node.

![fig2](/Linked-Lists/images/fig2.png)

## Use Cases

- Playlist Application where the order of each song is important and traversing (skip back/ forward) is required.
- Elements in a Hash Table (Open Hashing)

## References

- [Linked Lists compared to Arrays](https://www.studytonight.com/data-structures/linked-list-vs-array)
- [Data Structures In The Real World — Linked List](https://medium.com/journey-of-one-thousand-apps/data-structures-in-the-real-world-508f5968545a)
- [The Singly Linked List data structure](http://blog.benoitvallon.com/data-structures-in-javascript/the-singly-linked-list-data-structure/)
- [The Doubly Linked List data structure](http://blog.benoitvallon.com/data-structures-in-javascript/the-doubly-linked-list-data-structure/)
