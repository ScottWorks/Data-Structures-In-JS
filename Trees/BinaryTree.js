function BinaryTreeNode(value){
  this.value = value;
  this.left = null;
  this.right = null;
}

BinaryTreeNode.prototype._addLeftNode = function(data) {
  var newLeftNode = new BinaryTreeNode(data)

  if(this.left === null) {
    this.left = newLeftNode
  } else {
    var temp = this.left
    this.left = newLeftNode
    newLeftNode.left = temp
  }
}

BinaryTreeNode.prototype._addRightNode = function(data) {
  var newRightNode = new BinaryTreeNode(data)

  if(this.right === null) {
    this.right = newRightNode
  } else {
    var temp = this.right
    this.right = newRightNode
    newRightNode.right = temp
  }
}

var rootNode = new BinaryTreeNode('root')

rootNode._addLeftNode('b')
var bNode = rootNode.left

rootNode._addRightNode('e')
var eNode = rootNode.right

bNode._addLeftNode('c')
var cNode = bNode.left

cNode._addLeftNode('f')
var fNode = cNode.left

cNode._addRightNode('d')
var dNode = cNode.right

console.log(rootNode)