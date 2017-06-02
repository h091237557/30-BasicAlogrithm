debugger;
function Node(data) {
	this.data = data;
	this.left = null;
	this.right = null;
}

function BinarySearchTree() {
	this.root = null;
}

BinarySearchTree.prototype.add = function(node) {

	if (this.root == null) {
		this.root = node;
	} else {
		insertNode(this.root, node);
	}

	function insertNode(node, newNode) {
		if (node.data > newNode.data) {
			if (node.left == null) {
				node.left = newNode;
			} else {
				insertNode(node.left, newNode);
			}
		} else {
			if (node.right == null) {
				node.right = newNode;
			} else {
				insertNode(node.right, newNode);
			}
		}
	}
};

BinarySearchTree.prototype.search = function (value){
	return _search(this.root,value);
	
	function _search(node,value){
		if(node.data == value){
			return node;
		}else if (node.data > value){
			return _search(node.left,value);
		}else{
			return _search(node.right,value);
		}
	}
};

let tree = new BinarySearchTree();
tree.add(new Node(5));
tree.add(new Node(2));
tree.add(new Node(9));
tree.add(new Node(10));
tree.add(new Node(1));
tree.add(new Node(8));
tree.add(new Node(4));

console.log(tree.search(8));

