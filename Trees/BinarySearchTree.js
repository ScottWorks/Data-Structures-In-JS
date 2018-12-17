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
    this.left.search(target);
  } else if (difference < 0 && this.right) {
    this.right.search(target);
  } else if (difference !== 0 && !this.left && !this.right) {
    console.log('Value not found!');
  } else {
    console.log(this);
  }
};

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

// Search
newBST.search(10);
newBST.search(7);
newBST.search(0);
