debugger;

/**
 * Node
 * Node class
 * @param data
 */
function Node(data) {
  this.data = data;
  this.next = null;
  this.previous = null;
}

/**
 * DoubleLinkList
 * List class
 */
function DoubleLinkList() {
  this.head = null;
  this.final = null;
  this._length = 0;
}

/**
 * add
 * add data to list
 * @param data
 * @returns {Node}
 */
DoubleLinkList.prototype.add = function(data) {
  var node = new Node(data);
  if (this._length == 0) {
    this.head = node;
    this.final = node;
  } else {
    this.final.next = node;
    node.previous = this.final;
    this.final = node;
  }
  this._length++;
  return node;
}

/**
 * remove
 * remove data by position from list
 * @param position
 */
DoubleLinkList.prototype.remove = function(position) {
  var currentNode = this.head;
  var message = {
      failure: 'Failure: non-existent node in this list.'
    },
    i = 1;
  if (this._length === 0 || this.position < 1 || this.position > this._length) {
    throw new Error(message.failure);
  }

  // 刪除的節點為第一個的流程
  if (position === 1) {
    this.head = currentNode.next;

    // 如果不是只有一個節點的list則
    if (this.head) {
      this.head.previous = null;
    } else {
      this.final = null;
    }
		
		// 刪除的結點為最後一個的流程
  } else if (position === this._length) {
    this.final = this.final.previous;
    this.final.next = null;
    return;
  } else {

    while (i < position) {
      currentNode = currentNode.next;
			i++;
    }
		var previousNode = currentNode.previous;
		var nextNode = currentNode.next;
		previousNode.next = nextNode; 
		nextNode.previous = previousNode;
  }
	this._length--;

}

/**
 * view
 * View List
 */
DoubleLinkList.prototype.view = function() {
  var currentNode = this.head;
  while (currentNode != null) {
    console.log(currentNode.data);
    currentNode = currentNode.next;
  }
}

var list = new DoubleLinkList();
list.add("A");
list.add("B");
list.add("C");

list.view();
list.remove(1);
list.view();

