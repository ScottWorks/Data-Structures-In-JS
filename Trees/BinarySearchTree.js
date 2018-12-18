function BSTNode(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}

BSTNode.prototype.insertNode = function(value) {
  if (value <= this.value && this.left) {
    this.left.insertNode(value);
  } else if (value <= this.value) {
    this.left = new BSTNode(value);
  } else if (value > this.value && this.right) {
    this.right.insertNode(value);
  } else {
    this.right = new BSTNode(value);
  }
};

BSTNode.prototype.search = function(target) {
  const difference = this.value - target;

  if (difference > 0 && this.left) {
    return this.left.search(target);
  }
  if (difference < 0 && this.right) {
    return this.right.search(target);
  }

  return this.value === target ? this : 'Value not found!';
};

// Example
var newBST = new BSTNode(8);

// Insertion
newBST.insertNode(10);
newBST.insertNode(3);
newBST.insertNode(14);
newBST.insertNode(1);
newBST.insertNode(6);
newBST.insertNode(7);
newBST.insertNode(4);
newBST.insertNode(13);
console.log(newBST);

// Search
console.log(newBST.search(10));
console.log(newBST.search(7));
console.log(newBST.search(0));
