debugger;

function Graph() {
	this.vertexs = [];
	this.edges = [];
}

Graph.prototype.addVertex = function(vertex) {
	this.vertexs.push(vertex);
	this.edges[vertex] = [];
};

Graph.prototype.addEdge = function(vertexA, vertexB) {
	this.edges[vertexA].push(vertexB);
	this.edges[vertexB].push(vertexA);
};

Graph.prototype.traverseDFS = function(startVertex, callback) {
	if (!~this.vertexs.indexOf(startVertex)) {
		return console.log("Vertex not found");
	}

	var visited = [];
	_traverseDFS.call(this,startVertex,visited,callback);

	function _traverseDFS(vertex, visited, callback) {
		visited[vertex] = true;
		if (this.edges[vertex] !== undefined) {
			callback(vertex);
		}

		for (var i = 0; i < this.edges[vertex].length; i++) {
			if (!visited[this.edges[vertex][i]]) {
				_traverseDFS.call(this,this.edges[vertex][i], visited, callback);
			}
		}
	}
};

Graph.prototype.traverseBFS = function(startVertex,callback){
	if (!~this.vertexs.indexOf(startVertex)) {
		return console.log("Vertex not found");
	}

	var queue = [];
	var visited = [];
	queue.push(startVertex);
	visited[startVertex] = true;

	while(queue.length){
		var vertex = queue.shift();	
		callback(vertex);

		for (var i=0;i<this.edges[vertex].length;i++){
			if(!visited[this.edges[vertex][i]]){
				visited[this.edges[vertex][i]] = true;	
				queue.push(this.edges[vertex][i]);
			}
		}

	
	}
}

Graph.prototype.print = function() {
	console.log(this.vertexs.map(function(vertex) {
		return (vertex + " -> " + this.edges[vertex].join(" , ")).trim();
	}, this).join(" | "));
};

var graph = new Graph();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");

graph.print();

graph.addEdge("A", "C");
graph.addEdge("A", "B");
graph.addEdge("B", "D");
graph.addEdge("B", "E");
graph.addEdge("C", "F");
graph.print();

graph.traverseBFS("A",(vertex)=>{console.log(vertex);});
