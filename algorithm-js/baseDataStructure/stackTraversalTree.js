debugger;
function Node(data) {
	this.data = data;
	this.left = null;
	this.right = null;
}

function BinarySearchTree() {
    this.root = null;
    this.count = 0;
}

BinarySearchTree.prototype.add = function(node) {
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
/**
 * Tree inordrTraversal (no recursive)
 * Tip: 左根右
 */
BinarySearchTree.prototype.inorderTraversal = function(){
    let stack = [];
    let isEnd = false;
    let current = this.root;
    while (!isEnd) {
        if(current != null){
            stack.push(current);
            current = current.left;
        }
        else{
            if(stack.length > 0){
                current = stack.pop();
                console.log(current.data);
                current = current.right;
            }else{
                isEnd = true;
            }
        }
    }
}
/**
 * Tree preorderTraversal (no recursive)
 * Tip: 根左右
 */
BinarySearchTree.prototype.preorderTraversal = function(){
    let stack = [];
    stack.push(this.root);
    let current;
    while (stack.length > 0) {
        current = stack.pop();
        console.log(current.data);

        if(current.right){
            stack.push(current.right);
        }

        if(current.left){
            stack.push(current.left);
        }
    }
}
/**
 * Tree postOrder Traversal (no recursive)
 * Tip: 左右根
 */
BinarySearchTree.prototype.postOrderTraversal = function() {
    let stack = [];
    let temp = [];
    let current = this.root;
    let isEnd = false;

    stack.push(current);
    while(stack.length > 0){
        current = stack.pop();
        temp.push(current);

        if(current.left != null){
            stack.push(current.left);
        }
        if(current.right != null){
            stack.push(current.right);
        }
    }

    while(temp.length > 0){
        current = temp.pop();
        console.log(current.data);
    }

}

let tree = new BinarySearchTree();
tree.add(new Node(1));
tree.add(new Node(2));
tree.add(new Node(3));
tree.add(new Node(4));
tree.add(new Node(5));

tree.postOrderTraversal();

