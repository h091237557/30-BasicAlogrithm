debugger;

function Node(data, index) {
	this.data = data;
	this.index = index;
	this.left = null;
	this.right = null;
}

function BinaryTree() {
	this.root = null;
	this.count = 0;
}

BinaryTree.prototype.inOrderTraverse = function(callback) {

	inOrderTraverseNode(this.root, callback);

	function inOrderTraverseNode(node, callback) {
		if (node !== null) {
			inOrderTraverseNode(node.left, callback);
			callback(node);
			inOrderTraverseNode(node.right, callback);
		}
	}
};

BinaryTree.prototype.preOrderTraverse = function(callback) {

	preOrderTraverseNode(this.root, callback);

	function preOrderTraverseNode(node, callback) {
		if (node !== null) {
			callback(node);
			preOrderTraverseNode(node.left, callback);
			preOrderTraverseNode(node.right, callback);
		}
	}
};

BinaryTree.prototype.postOrderTraverse = function(callback) {

	postOrderTraverseNode(this.root, callback);

	function postOrderTraverseNode(node, callback) {
		if (node !== null) {
			postOrderTraverseNode(node.left, callback);
			postOrderTraverseNode(node.right, callback);
			callback(node);
		}
	}
};

BinaryTree.prototype.size = function() {
	return this.count;
};

BinaryTree.prototype.searchByIndex = function(index) {
	var result ;
	this.postOrderTraverse(function(node) {
		if (node.index === index)
			result= node;
	});
	return result;
};

//BinaryTree.prototype.size = function() {
//return 1+childCount(this.root);

//function childCount(node) {
//if (node == null || (node.right == null && node.left ==null)){
//return 0;
//}

//var count = 0;
//if(node.right != null){
//count += (1+childCount(node.right));
//}

//if(node.left != null){
//count += (1+childCount(node.left));
//}

//return count;
//}
//};


BinaryTree.prototype.add = function(node) {
	node.index = this.count;
	this.count++;
	if (this.root == null) {
		this.root = node;
	} else {
		insertNode( this.root, node);
	}

	function insertNode(node, newNode) {
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

BinaryTree.prototype.transToHeap = function() {
	var startNodeIndex = Math.floor(this.size() / 2) - 1;
	for (var i = startNodeIndex; i >= 0; i--) {
		var startNode = this.searchByIndex(i);
		maxHeapIfy(startNode);
	}

	function maxHeapIfy(node) {
		var maxNode;
		if (node == null)
			return;
		if (node.left != null) {
			if (node.left.data > node.data) {
				swap(node.left, node);
				maxNode = node.left;
			} else {
				maxNode = node;
			}
		}

		if (node.right !== null) {
			if (node.right.data > node.data) {
				swap(node.right, node);
				maxNode = node.right;
			}
		}

		if (maxNode != node) {
			maxHeapIfy(maxNode);
		}
	}

	function swap(nodeA, nodeB) {
		var temp = nodeB.data;
		nodeB.data = nodeA.data;
		nodeA.data = temp;
	}
};
var tree = new BinaryTree();
tree.add(new Node(14));
tree.add(new Node(16));
tree.add(new Node(4));
tree.add(new Node(17));
tree.add(new Node(42));
tree.add(new Node(20));

tree.transToHeap();
//tree.postOrderTraverse(function(item) {
//console.log(item);
