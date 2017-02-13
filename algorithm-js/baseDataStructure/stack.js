/**
 * Stack
 * this is stack data structure;
 * @returns {undefined}
 */
function Stack(){
	this._size =0;
	this._container = {};
}

/**
 * push
 * It method can add data to stack
 * @param data
 * @returns {undefined}
 */
Stack.prototype.push = function(data){
	var size = ++this._size;
	this._container[size] = data;
}

/**
 * pop
 * It method can remove data from stack
 * @returns {undefined}
 */
Stack.prototype.pop = function(){
	var size = this._size;

	if(size){
		delete this._container[size];
		this._size--;

	}
}

/**
 * view
 * view stack content
 * @returns {undefined}
 */
Stack.prototype.view = function(){
	return this._container;
}

var stack = new Stack();
stack.push("A");
stack.push("B");
stack.push("C");
console.log(stack.view());

stack.pop();
console.log(stack.view());



