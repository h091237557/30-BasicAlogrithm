/**
 * Queue
 *
 * @returns {undefined}
 */
function Queue() {
  this._startIndex = 1;
  this._endIndex = 1;
  this._container = {};
}

/**
 * enqueue
 * Add data to queue
 * @param data
 * @returns {undefined}
 */
Queue.prototype.enqueue = function(data) {
  this._container[this._endIndex++] = data;
}

/**
 * dequeue
 * Remove data from queue
 * @returns {undefined}
 */
Queue.prototype.dequeue = function() {

  if (this._startIndex !== this._endIndex) {
    delete this._container[this._startIndex++];
  }

}

Queue.prototype.view = function(){
	return this._container;
} 
var queue = new Queue();
queue.enqueue("A");
queue.enqueue("B");
queue.enqueue("C");
console.log(queue.view());

queue.dequeue();
console.log(queue.view());

