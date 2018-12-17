## Trees

A tree is a collection of `nodes`, connected by `edges`. Each node consists of a data. The first node in a tree is called the `root` node. `Child nodes` are connected by an edge to `parent nodes`, nodes without children are call `leaf nodes`.

`Depth` of a node is the length of the path to its root. `Height` is the longest path extending from the root to the leaf or largest depth in the tree.

![fig1](/Trees/images/fig1.jpg)

## Binary Tree

### Time Complexity

#### Worst-Case

| Access | Search | Insertion | Insertion |
| :----: | :----: | :-------: | :-------: |
|  O(n)  |  O(n)  |   O(n)    |   O(n)    |

A `Binary Tree` is a data structure where each node has at most two children, referred to as the `left child` and `right child`, which are initialized with `null` values. The Binary Tree is unordered, data is added

```js
function BinaryTree(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}
```

### Insertion

As mentioned earlier the Binary Tree does not maintain order, or balance therefore nodes and leaves can be added without much concern for placement. Below I instrumented two helper prototype methods `_addLeftNode()` and `_addRightNode()` which simply checks if the `node.<side>` is null, if it is then it adds a new node and provides the parent with a reference. Otherwise the node replaces the existing node adds its reference to the parent and makes the replaced node a reference.

```js
BinaryTreeNode.prototype._addLeftNode = function(data) {
  var newLeftNode = new BinaryTreeNode(data);

  if (this.left === null) {
    this.left = newLeftNode;
  } else {
    var temp = this.left;
    this.left = newLeftNode;
    newLeftNode.left = temp;
  }
};

BinaryTreeNode.prototype._addRightNode = function(data) {
  var newRightNode = new BinaryTreeNode(data);

  if (this.right === null) {
    this.right = newRightNode;
  } else {
    var temp = this.right;
    this.right = newRightNode;
    newRightNode.right = temp;
  }
};
```

To build the following tree, we enter the commands shown below.

![fig2](/Trees/images/fig2.png)

```js
var rootNode = new BinaryTreeNode('root');

rootNode._addLeftNode('b');
var bNode = rootNode.left;

rootNode._addRightNode('e');
var eNode = rootNode.right;

bNode._addLeftNode('c');
var cNode = bNode.left;

cNode._addLeftNode('f');
var fNode = cNode.left;

cNode._addRightNode('d');
var dNode = cNode.right;

console.log(rootNode);

// BinaryTreeNode {
//   value: 'root',
//   left:
//    BinaryTreeNode {
//      value: 'b',
//      left: BinaryTreeNode { value: 'c', left: [BinaryTreeNode], right: [BinaryTreeNode] },
//      right: null },
//   right: BinaryTreeNode { value: 'e', left: null, right: null } }
```

It almost goes without saying that this is a very primative data structure, as we continue exploring other tree types we will see implementations that handle ordering, sorting, balancing, etc.

### Traversal

When it comes to `tree traversal` there are two options: **Depth-First Search (DFS)** and **Breadth-First Search (BFS)**.

**Depth-First Search:** Traverses each path of the tree starting at the root. Once a leaf is reached the algorithm will begin to backtrack, assuming the leaf is not the search target. For example, given our previously created model, if we were to implement DFS and print each node along the way it would look someting like `'root'->'b'->'c'->'f'->'d'->'e'`. Notice how the algorithm backtracks to the parent node then explores the children nodes which have not been checked yet.

![fig3](/Trees/images/fig3.png)

The exmaple given is what is known as `pre-order` traversal, where the algorithm begins at the parent then searches the left and right child.

`In-order` traversal is where the algorithm starts from the left child, then the parent followed by the right child, visually this looks like your are checking each node working from left to right, `'f'->'c'->'d'->'b'->'root'->'e'`.

`Post-order` traversal is where the algorithm starts with the left child, then the right, followed by the parent, again, visually this looks something like we are working from left to right but always starting at the lowest part of the tree, `'f'->'d'->'c'->'b'->'e'->'root'`.

For some more advanced examples check [this](https://www.cs.cmu.edu/~adamchik/15-121/lectures/Trees/trees.html) out.

**Breadth-First Search (BFS):** Traverses the tree level by level and depth by depth starting at the root node. The children of the parent are then checked (moving from left to right), once they have been checked the algorithm moves one level down until all nodes have been checked or a stopping condition has been met. In our example from before this would look like, `'root'->'b'->'e'->'c'->'f'->'d'`

![fig4](/Trees/images/fig4.png)

## Binary Search Tree

A `Binary Search Tree` is a derivative of the Binary Tree which stores data in a sorted order. A BST must have the following properties:

- Each node must contain a key (or data)
- The left child node must be less than the parent node (leftChildNode < parentNode)
- The right child node must be greater than the parent node (rightChildNode > parentNode)
- Duplicate keys are not allowed.

### Insertion

Given the following BST, we can implement code that will recursively add nodes to the tree in a sorted order. This is done by checking whether the value is is less than or equal to the current node and also checking if a node for that side already exists, if truthy the function will recurse such until this condition is not met at which point it will insert a new node. This process is done for both the left and right side.

![fig5](/Trees/images/fig5.png)

```js
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

var newBST = new BSTNode(8);

newBST.insertNode(10);
newBST.insertNode(3);
newBST.insertNode(14);
newBST.insertNode(1);
newBST.insertNode(6);
newBST.insertNode(7);
newBST.insertNode(4);
newBST.insertNode(13);

console.log(newBST);

// BSTNode {
//   value: 8,
//   left:
//    BSTNode {
//      value: 6,
//      left: BSTNode { value: 4, left: [BSTNode], right: null },
//      right: BSTNode { value: 7, left: null, right: null } },
//   right:
//    BSTNode {
//      value: 10,
//      left: null,
//      right: BSTNode { value: 14, left: [BSTNode], right: null } } }
```

### Searching

When searching for a node in a BST we begin at the root, then compare the target value with the current node value, if the difference between the two is equal to -1 then the left node is traversed vice versa for a difference of +1.

```js
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

newBST.insertNode(10);
newBST.insertNode(3);
newBST.insertNode(14);
newBST.insertNode(1);
newBST.insertNode(6);
newBST.insertNode(7);
newBST.insertNode(4);
newBST.insertNode(13);

newBST.search(10);
// BSTNode {
//   value: 10,
//   left: null,
//   right:
//    BSTNode {
//      value: 14,
//      left: BSTNode { value: 13, left: null, right: null },
//      right: null } }

newBST.search(0);
// Value not found!
```

### Deletion

Deletion has two different cases that need to be considered; the first case is if we delete a node below the root, the second case being that we intend to delete the root itself. In the former we must reattch the nodes which would otherwise be seperated after the node is removed, fairly straightforward.

![fig6](/Trees/images/fig6.png)

In the latter case we must replace the root with a node that has a value greater than the `leftNode` and less than the `rightNode` of the `rootNode`. That node must be "added" into the place of the `rootNode` after it has been removed, then deleted (such that the `childNodes` of the swapped node remain attached to the tree).

![fig7](/Trees/images/fig7.png)

## References

- [FreeCodeCamp - Everything you need to know about tree data structures](https://medium.freecodecamp.org/all-you-need-to-know-about-tree-data-structures-bceacb85490c)
- [Binary Trees](https://www.cs.cmu.edu/~adamchik/15-121/lectures/Trees/trees.html)
- [DFS on Binary Tree Array](http://mishadoff.com/blog/dfs-on-binary-tree-array/)
