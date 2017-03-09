debugger;
function Node(data) {
	this.data = data;
	this.left = null;
	this.right = null;
}

function BinaryTree() {
	this.root = null;
}

BinaryTree.prototype.inOrderTraverse = function(callback) {

	inOrderTraverseNode(this.root,callback);

	function inOrderTraverseNode(node,callback) {
		if(node !== null){
			inOrderTraverseNode(node.left,callback);
			callback(node.data);
			inOrderTraverseNode(node.right,callback);
		}
	}	
};

BinaryTree.prototype.preOrderTraverse = function(callback) {

	preOrderTraverseNode(this.root,callback);

	function preOrderTraverseNode(node,callback) {
		if(node !== null){
			callback(node.data);
			preOrderTraverseNode(node.left,callback);
			preOrderTraverseNode(node.right,callback);
		}
	}	
};

BinaryTree.prototype.postOrderTraverse = function(callback) {

	postOrderTraverseNode(this.root,callback);

	function postOrderTraverseNode(node,callback) {
		if(node !== null){
			postOrderTraverseNode(node.left,callback);
			postOrderTraverseNode(node.right,callback);
			callback(node.data);
		}
	}	
};
BinaryTree.prototype.add = function(node) {
	if (this.root == null) {
		this.root = node;
	} else {
		insertNode(this.root,node);
	}

	function insertNode (node, newNode) {
		if (node.left === null) {
			node.left = newNode;
		} else if (node.right === null) {
			node.right = newNode;
		} else {
			let leftChild = node.left;
			if (leftChild.left === null || leftChild.right === null) {
				insertNode(node.left, newNode);
			} else {
				insertNode(node.right, newNode);
			}
		}
	}
};

var tree = new BinaryTree();
tree.add(new Node("A"));
tree.add(new Node("B"));
tree.add(new Node("C"));
tree.add(new Node("D"));
tree.add(new Node("E"));
tree.add(new Node("F"));

tree.postOrderTraverse(function(item){
	console.log(item);
});
