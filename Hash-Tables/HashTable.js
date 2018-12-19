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
