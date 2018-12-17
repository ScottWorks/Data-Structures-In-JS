## Trees

A tree is a collection of `nodes`, connected by `edges`. Each node consists of a data. The first node in a tree is called the `root` node. `Child nodes` are connected by an edge to `parent nodes`, nodes without children are call `leaf nodes`.

`Depth` of a node is the length of the path to its root. `Height` is the longest path extending from the root to the leaf or largest depth in the tree.

![fig1](/Trees/images/fig1.jpg)

## Binary Tree

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

When it comes to `tree traversal` there are two options: **Depth-First Search (DFS)** and **Breadth-First Search (BFS)**

## Binary Search Tree

### Time Complexity

#### Worst-Case

| Access | Search | Insertion | Insertion |
| :----: | :----: | :-------: | :-------: |
|  O(n)  |  O(n)  |   O(n)    |   O(n)    |

## References

[Everything you need to know about tree data structures](https://medium.freecodecamp.org/all-you-need-to-know-about-tree-data-structures-bceacb85490c)
