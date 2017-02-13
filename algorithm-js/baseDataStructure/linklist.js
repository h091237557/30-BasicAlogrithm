debugger;
/**
 * Node
 * Node class 
 * @param data
 * @returns {undefined}
 */
function Node(data) {
  this.data = data;
  this.next = null;
}

/**
 * SingleList
 * SingleList class 
 * @returns {undefined}
 */
function SingleList() {
	this.head = null;
	this._length = 0;
}

/**
 * add
 * add data to last .
 * @param data
 * @returns {undefined}
 */
SingleList.prototype.add = function(data){
	var node = new Node(data);
	var currentNode = this.head;	

	if(!currentNode){
		this.head = node;	
		this._length++;
		return node;
	}

	while (currentNode.next){
		currentNode = currentNode.next;	
	}

	currentNode.next = node;
	this._length++;
	return node;	
}

/**
 * view
 * It can console log list 
 * @returns {undefined}
 */
SingleList.prototype.view = function(){
	var currentNode = this.head;
	while (currentNode != null){
		console.log(currentNode.data);
		currentNode =  currentNode.next;	
	}
}

/**
 * remove
 * it method can remove data from list , depend on postition.
 * @param position
 * @returns {undefined}
 */
SingleList.prototype.remove = function(position){
	var  message = {failure: 'Failure: non-existent node in this list.'};
	var currentNode = this.head,
			deleteNode,
			previous,
			i=1;

	if(position < 1 || position > this._length){
		throw new Error()
	}

	if(position === 1){
		this.head = currentNode.next; 	
		deleteNode = currentNode; 
		this._length--;
		return deleteNode;
	}

	while (i++ < position){
		console.log(i);
		previous = currentNode;	
		currentNode = currentNode.next;
	}
	previous.next = currentNode.next;
	
	return currentNode;
}

var singleList = new SingleList();
singleList.add("A");
singleList.add("B");
singleList.add("C");

singleList.view();

singleList.remove(2);
singleList.view();
