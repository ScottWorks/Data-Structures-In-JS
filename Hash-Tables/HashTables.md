## Hash Tables

A `hash table` is a collection of key-value pairs, that provides efficient access.

### Time Complexity

#### Average

| Access | Search | Insertion | Insertion |
| :----: | :----: | :-------: | :-------: |
|   NA   |  O(1)  |   O(1)    |   O(1)    |

`Hashing` is a method commonly used to create unique identifiers for objects contained in a collection. An example may be Identification Card numbers, the ID number itself should be unique, that way its easy to lookup a person when needed. If two people had the same ID number then problems would arise when things corresponding to an individual happen. While these identifiers should be unique, there is the case that it can unintentionally be created more than once, this is called a `collision`.

Lets say we wanted to hash some input data (i.e. Student DOB and Name), we would do this by using a `hashing function`, this is an algorithm that takes an input also called a `key` of any size and returns a string of fixed size. As long as you provide the same input you will always recieve the same output. Now that we have our hash, the input data will be stored in a `hash table` where it can be referenced via the key.

![fig1](/Hash-Tables/images/fig1.png)

### Hash Functions

With respect to hash tables, hash functions are any function that returns an index of fixed size. The requirements for a hash function are as follows:

1. **Easy to compute:** It should be easy to compute and must not become an algorithm in itself.

2. **Uniform distribution:** It should provide a uniform distribution across the hash table and should not result in clustering.

3. **Less collisions:** Collisions occur when pairs of elements are mapped to the same hash value. These should be avoided.

Note: Irrespective of how good a hash function is, collisions are bound to occur. Therefore, to maintain the performance of a hash table, it is important to manage collisions through various collision resolution techniques.

### Collisions

As mentioned collisions will occur, in some algorithms more often than others, this may not necessarily be major problem as long as we have some means of dealing with it. Take for example a hash function that creates an index based on the sum of the individual letter's ASCII values of the characters modulo.

Now take the following strings into consideration {“abcdef”, “bcdefa”, “cdefab” , “defabc” }. Each string has a sum of 599 which results in a character modulo of 2, therefore our index is 2 for each of the strings. As you can imagine we have just created a hash table with four collisions.

![fig2](/Hash-Tables/images/fig2.png)

Although the previous example is not necessarily a bad thing, we can certainly do better considering the time complexity was O(n). For example our hashing function could calculate the index based on the sum of the ASCII values multiplied by their respective order in the string after which it is modulo with 2069.

- abcdef ---> (971 + 982 + 993 + 1004 + 1015 + 1026)%2069 = 38
- bcdefa ---> (981 + 992 + 1003 + 1014 + 1025 + 976)%2069 = 23
- cdefab ---> (991 + 1002 + 1013 + 1024 + 975 + 986)%2069 = 14
- defabc ---> (1001 + 1012 + 1023 + 974 + 985 + 996)%2069 = 11

![fig3](/Hash-Tables/images/fig3.png)

### Collision Resolution - Open Hashing

As we saw in our previous example where our hashing function resulted in multiple collisions we ended up with multiple values that shared the same index. While this is not ideal it should be possible, handling collisions is important in hash table design.

To handle such events we can employ the commonly used technique of `open hashing`. In seperate chaining each element of the hash table is a linked list. If there is a collision the value is simply added to the linked list corresponding to the index. To retrieve the value from the linked list the list must be traveresed until the entrey corresponding to the value is found.

![fig4](/Hash-Tables/images/fig4.png)

In the following code example I created an Object called `HashTable` that stores the key-value pairs in the form of Singly Linked Lists.

```js
function HashTable(tableSize) {
  this.table = {};
  this.totalValues = 0;
  this.tableSize = tableSize;
}

// Hash Table Functions
HashTable.prototype.add = function(value) {
  var index = this._simpleHashFunction(value);

  if (this.table[index] === undefined) {
    var linkedList = new _SingleLL();
    linkedList._addNode(value);
    this.table[index] = linkedList;
  } else {
    this.table[index]._addNode(value);
  }

  this.totalValue++;
};

HashTable.prototype.find = function(index, value) {
  if (this.table[index] === undefined) {
    return 'There is no record found.';
  } else if (this.table[index].length > 1 && value) {
    return this.table[index]._findNode(value);
  } else {
    return this.table[index];
  }
};

HashTable.prototype.delete = function(index, value) {
  if (this.table[index] === undefined) {
    return 'There is no record found.';
  } else if (this.table[index].length > 1) {
    if (!value) {
      return 'More than one record found, please provide the value';
    }

    this.table[index]._deleteNode(value);
    return this.table;
  } else {
    delete this.table[index];
    return this.table;
  }
};

HashTable.prototype.printTable = function() {
  var string = '';

  for (let index in this.table) {
    if (this.table[index].length > 1) {
      string += `${index}: ${this.table[index]._printNodes()}\n`;
    } else {
      string += `${index}: ${this.table[index].head.value}\n`;
    }
  }

  return string;
};

// Hash Table Helper Functions
HashTable.prototype._simpleHashFunction = function(string) {
  var sum = string.split('').reduce((acc, curr, idx) => {
    return (acc += curr.charCodeAt(0) * idx);
  }, 0);

  return sum % this.tableSize;
};

// Linked List Helper Objects
function _Node(value) {
  this.value = value;
  this.next = null;
}

function _SingleLL() {
  this.head = null;
  this.tail = null;
  this.length = 0;
}

// Linked List Helper Functions
_SingleLL.prototype._addNode = function(value) {
  var node = new _Node(value);

  if (!this.head) {
    this.head = node;
    this.tail = node;
  } else {
    this.tail.next = node;
    this.tail = node;
  }

  this.length++;
};

_SingleLL.prototype._findNode = function(value) {
  var current = this.head;

  while (current) {
    if (current.value === value) {
      return current;
    }

    current = current.next;
  }

  return 'There is no record found.';
};

_SingleLL.prototype._deleteNode = function(value) {
  var current = this.head,
    previous = this.head;

  while (current) {
    if (current.value === value) {
      if (this.head === current) {
        this.head = this.head.next;
      }

      if (current === this.tail) {
        this.tail = previous;
      }

      previous.next = current.next;
      this.length--;
    } else {
      previous = current;
    }

    current = current.next;
  }

  return 'There is no record found.';
};

_SingleLL.prototype._printNodes = function(value) {
  var current = this.head,
    string = '';

  while (current) {
    if (current === this.head) {
      string += this.head.value;
    } else {
      string += `--->${current.value}`;
    }

    current = current.next;
  }

  return string;
};

// Examples
var newHashTable = new HashTable(11);

newHashTable.add('abcdef');
newHashTable.add('sdsafa');
newHashTable.add('ccssc');
newHashTable.add('aaaaaaa');
newHashTable.add('dfszuu');
newHashTable.add('xcs');

console.log(newHashTable.printTable());

// 2: aaaaaaa--->dfszuu
// 3: abcdef--->ccssc
// 7: sdsafa
// 10: xcs

// console.log(newHashTable.find('2'));
// console.log(newHashTable.find('3'));
// console.log(newHashTable.find('3', 'ccssc'));

// console.log(newHashTable.delete('2'))
// console.log(newHashTable.delete('3', 'ccssc'))
// console.log(newHashTable.delete('3'))
```

## References

- [Basics of Hash Tables](https://www.hackerearth.com/practice/data-structures/hash-tables/basics-of-hash-tables/tutorial/)
- [About the #data-structures series](http://blog.benoitvallon.com/data-structures-in-javascript/the-hash-table-data-structure/)
