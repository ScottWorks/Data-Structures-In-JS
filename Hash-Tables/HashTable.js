function HashTable(maxValues) {
  this.table = {};
  this.maxValues = maxValues;
  this.totalValues = 0;
}

HashTable.prototype.addValue = function(value) {
  var hash = this._simpleHashFunction(value);

  if (this.table[hash] === undefined) {
    var linkedList = new _SingleLL();
    linkedList._addNodeToLL(value);
    this.table[hash] = linkedList;
  } else {
    this.table[hash]._addNodeToLL(value);
  }

  this.totalValue++;
};

HashTable.prototype._simpleHashFunction = function(string) {
  var sum = string.split('').reduce((acc, curr, idx) => {
    return (acc += curr.charCodeAt(0) * idx);
  }, 0);

  return sum % 111;
};

function _Node(value) {
  this.value = value;
  this.next = null;
}

function _SingleLL() {
  this.head = null;
  this.tail = null;
  this.length = 0;
}

_SingleLL.prototype._addNodeToLL = function(value) {
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

var newHashTable = new HashTable();

newHashTable.addValue('abcdef');
newHashTable.addValue('sdsafa');
newHashTable.addValue('aaaaaaa');

console.log(newHashTable.table);

// { '39':
//    _SingleLL {
//      head: _Node { value: 'aaaaaaa', next: null },
//      tail: _Node { value: 'aaaaaaa', next: null },
//      length: 1 },
//   '67':
//    _SingleLL {
//      head: _Node { value: 'abcdef', next: null },
//      tail: _Node { value: 'abcdef', next: null },
//      length: 1 },
//   '71':
//    _SingleLL {
//      head: _Node { value: 'sdsafa', next: null },
//      tail: _Node { value: 'sdsafa', next: null },
//      length: 1 } }