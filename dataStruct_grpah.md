# 基礎資料結構(3)---圖形結構

圖學理論(graph theory)它源於1736年的數學家 LeonHard Euler ，它為了解決`Koenigsberg bridge`問題而發展出來的理論，雖然`Koenigsberg bridge`問題不是我們這篇的重點，但還是簡單介紹一下這個圖論中的著名問題。

在某個國家內，有條河經過兩個市區，並且在這條河中心上還有兩個小島，小島與河的兩岸有七條橋連接這，下圖就是該環境的模擬圖。

![](http://yixiang8780.com/outImg/20170310-1.png)

那麼這個問題是 ~ 

> 在所有的橋都只能走一次的前題條件下，如何才能把所有的橋都走過一次。

雖然 LeonHard Euler 並沒有解決這個問題，但卻發現了新的研究領域`圖論`。

## 圖形結構之原理

圖`(graph)`，是一種用來描述點與點關係的資料結構，也可以說是記錄關聯的結構，它和樹狀結構長的得像，但差別就在於沒有階層關系 ; 一張圖會由數個節點以及數條邊所構成，節點與節點間使用邊來相接，在數學上通常定義成`G = (V,E)`來表示，其中`V`是所有節點所成的集合，而`E`代表所有的邊所成的集合。圖`(graph)`畫出來長的如下圖。

![](http://yixiang8780.com/outImg/20170310-2.png)

接下來我們來認識一些名詞。

* 頂點`(vertex)` : 上圖中的`A、B、C`就為三個項點。
* 邊`(edge)` : 上圖中那個每個項點的連線，就稱為邊。
* 相鄰`(adjacent)` : 例如上圖中的`A與B`就為相鄰的，其它的項點也都如此。
* 附著`(incident)` : 上圖中，我們可以說明，`邊{A,C}`與`邊{A,B}`『附著』在項點 A 。
* 路徑`(path)` : 代表某個項點到某個項點的過程。
* 簡單路徑`(simple path)` : 在上圖中 A 到 D 的路徑可能有`ACBD`和`ABD`，這時我們可以稱`ABD`為簡單路徑。
* 長度`(length)` : 一條路徑上的長度是指該路徑上所有邊的數量。
* 分支度`(degree)` : 例如上圖中，我們可以稱項點 B 的分支度為 3 ，但在有向圖中會分成`外分支度`與`內分支度`。
* 子圖`(Subgraph)` : 請看下圖。 

![](http://yixiang8780.com/outImg/20170310-5.png)

## 圖的種類
基本上圖又可以分成下述幾重，要選擇那種來使用取決於你的問題。

### 有向圖 ( Directed graph )

![](http://yixiang8780.com/outImg/20170310-4.png)

### 無向圖 ( Undirected graph )

![](http://yixiang8780.com/outImg/20170310-3.png)

### 權重圖
權重圖這種類形你可以在項點或是邊上，加上權重來做其它的用途，下圖是在邊上加權重的圖。

![](http://yixiang8780.com/outImg/20170310-6.png)

## 圖形結構之表示方式
基本上，在程式裡要表示圖的方式有分以下兩種。

### 相鄰矩陣 ( Adjacency Matrix )
所謂的相鄰矩陣就是根據項點數，建立一個`N X N`的矩陣，來表示圖形結構的方法，我們來看看下圖，你可以看到左邊為圖，右邊為矩陣，在矩陣中，每個`1`就代表該兩個項點有連線。

![](http://yixiang8780.com/outImg/20170310-7.png)

### 相鄰串列 ( Adjacency List )
而相鄰串列，就是用我們前幾篇有教過的`串列`來表示圖形結構的方法。可以參考此篇文章來複習複習。[基礎資料結構(2)---連結串列（Linked list)](http://marklin-blog.logdown.com/posts/1414090-the-underlying-data-structures-2-serial-links-linked-list)。

![](http://yixiang8780.com/outImg/20170310-8.png)


### 兩者的優缺點
基本上這兩者各有優缺點，我們列出下表來比較一下。


|        | 相鄰矩陣           |相鄰串列  |
| ------------- |-------------| -----|
| 判斷邊是否存在      | 比較容易 | 較麻煩 |
| 若為`Complete Graph`的空間花費      | 較省空間      |   較浪費空間，因為要多存`link`|
| 項點個數多，而邊數少時空間花費 | 較浪費空間      |    較省空間|
| 某些運作繁雜度      |麻煩，如算邊數或是否相連      |   較簡單 |

上面列表中有提到一個`Complete Graph`，它的定義如下。

> 假設有`N`個頂點，而每個頂點的邊數有`N-1`個，它就可以被稱為`Complete Graph`。


## 圖形結構的實作與方法操作方法實作
我們這邊的實作都以相鄰串列為主，我們主要會建立三個方法。

* `AddVertex` : 新增頂點至`graph`中。
* `AddEdge` : 新增邊來連結訂點。
* `Traveral` : 該方法可以走訪`graph`中所有的頂點。

首先我們先建立`graph`所需要使用的物件，`graph`中會存放所有的頂點`(vertex)`與邊`(edge)`。

```
function Graph() {
	this.vertexs = [];
	this.edges = [];
}
```
接下來我們會建立兩個方法`AddVertex `與`AddEdge `，讓我們可以新增頂點與邊到`graph`中。

```
Graph.prototype.addVertex = function(vertex) {
	this.vertexs.push(vertex);
	this.edges[vertex] = [];
};

Graph.prototype.addEdge = function(vertexA, vertexB) {
	this.edges[vertexA].push(vertexB);
	this.edges[vertexB].push(vertexA);
};
```
最後我們建立一個`print`方法來看看我們建立出來的圖。

```
Graph.prototype.print = function() {
	console.log(this.vertexs.map(function(vertex) {
		return (vertex + " -> " + this.edges[vertex].join(" , ")).trim();	
	},this).join(" | "));
};

var graph = new Graph();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");

graph.print();

graph.addEdge("A","B");
graph.addEdge("A","C");
graph.print();
```
我們在上述的程式碼中建立了三個頂點`A、B、C`，並且將`A連結B`和`A連結C`，所以我們簡單用腦袋想一下，畫出來的圖形應該是如下圖。

```
   A
  /	 \
 B    C
```
來看看我們輸出的結果，雖然和上圖不一樣，但實際上是一樣的，`A -> C,B`代表這`A`這頂點連結這`B與C`。

```
A -> C , B | B -> A | C -> A
```
接下來我們要建立`Traveral`，這方法可以讓我們走訪所有的頂點，而且每個頂點只會走訪到一次 ; 傳統上有兩種走訪方式。

#### Depth First Search (DFS ; 深度優先搜尋)
這個方法主要是使用`stack`的概念來進行的，如果忘記`stack`的概念可至這篇文章複習複習。[基礎資料結構(1)---陣列(Array)、堆疊(Stack)、佇列(Queue)](http://marklin-blog.logdown.com/posts/1406967--basic-data-structures-1-an-array-array-stack-stack-queues-queue)

這個方法主要的過程如下。

1. 把起點丟入`stack`中。
2. 若`stack`不為空，則
	* 從`stack`中，取出一個項點(它視為已走訪)，並將此頂點所有相鄰且未走訪的頂點，丟到`stack`中。
	* 若所有的頂點階已被走訪過，而`stack`仍不為空時，則將`stack`清空。
3. 若`stack`為空，則完。

把以上過程說的更白文點就是

> 走訪起始頂點，然後尋找相鄰且未走訪的頂點，再做`dfs`，如果從任何已走訪過的頂點，都無法再走訪到一個尚未被走過的頂點時，則結束走訪。

以下就為實作的程式碼。

```
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
``` 
而假設我們有如下的圖。

```
		A
	  /   \
	 B 		C
	/ \    /
  D   E   F
```
然後我們看看執行`DFS`的結果。

```
A
C
F
B
D
E
``` 
看到了嗎這就是`dfs`的結果，如同它的名字`深度`，它會先針對單一個鄰近頂點就行深入的走訪，等到這條支線都走完，就開始走另外一條，`Depth First Search `這個方法也通時適用於我們前面說的樹狀結構的走訪。

#### Breadth First Search (BFS ; 廣度優先搜尋)
而`BFS`基本上運作流程與`DFS`差不多，只差在把`stack`改為`queue`，我們就直接看程式碼吧。

```
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

```
而假設我們有如下的圖。

```
		A
	  /   \
	 B 		C
	/ \    /
  D   E   F
```
然後我們看看執行`BFS`的結果。

```
A
C
B
F
D
E
``` 
它就如同它的名稱`Breadth First Search (BFS ; 廣度優先搜尋)`，它不是一條子線一直找下去，而是先廣泛的在四周先尋找，然後在尋找更後面一層的頂點。

## 參考資料
* [http://www.csie.ntnu.edu.tw/~u91029/Graph.html](http://www.csie.ntnu.edu.tw/~u91029/Graph.html)
* [https://zh.wikipedia.org/wiki/%E5%9B%BE](https://zh.wikipedia.org/wiki/%E5%9B%BE)

