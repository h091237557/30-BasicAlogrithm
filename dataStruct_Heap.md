# 基礎資料結構(5)---堆積 Heap
這篇文章中，我們將要來說明`堆積(heap)`這種資料結構，但在說明這個資料結構前，讀者需要先了解`二元樹`這種資料結構，如果不了解的話，可以看看筆者的這篇文章。

> [基礎資料結構(3)---樹狀結構與二元樹](http://marklin-blog.logdown.com/posts/1526463)

不過我們這邊也簡單的複習一下二元樹 ; 二元樹它是一種樹狀結構，但它要符合`每個節點最多有兩個子樹`這個特性，才能稱為二元樹。

在大概知道了二元樹後，我們就可以開始本篇文章的重點`堆積heap`。

* 堆積的原理
* 二元樹轉成堆積
* 程式碼實作

## 堆積 Heap 的原理
堆積這種資料結構，它是一種二元樹，而且要有以下兩種特點的，才能被稱為`堆積`。

* 任意節點小於(大於)它的所有子節點，最小(大)的節點一定在根上。
* 堆積是種完全樹。

> 完全樹 : 除了最低層外，其它層的節都都被塞滿。

我們畫個圖來看看，就可以很明顯的知道二元樹與堆積的差別，如下圖，左邊的堆積樹很明顯的，子節點值一定小於父節點，而二元樹的就沒這特性。

![](http://yixiang8780.com/outImg/20170314-1.png)

## 二元樹轉換成堆積 
上面簡單的說明什是堆積，接下來我們這邊要來說明，如何將二元樹轉換成堆積。

傳統上有二種方法，`由下而上`與`由上而下`，我們本章節將說明`由下而上`的方法，不然文章會太長……。

這個方法的基本流程如下，我們以下說明都以`max heap`為主，也就是根節點為最大值。

* 計算出此棵樹的節點數量，假設為`n`。
* 在從其`n/2`節點(事實上也就是`最後一個父節點`)開始進行比較。
* 若子節點的值大於父節點，則相互對調。
* 若有交換，還比較在去子節點進行比較。

我們來舉個例子，假設我們有如下圖的二元素。

![](http://yixiang8780.com/outImg/20170314-2.png)

接下來我們開始說明他的轉換成堆積的流程。

![](http://yixiang8780.com/outImg/20170314-3.png)
![](http://yixiang8780.com/outImg/20170314-4.png)
![](http://yixiang8780.com/outImg/20170314-5.png)
![](http://yixiang8780.com/outImg/20170314-6.png)

最後下圖就是二元樹轉換成堆積的結果。

![](http://yixiang8780.com/outImg/20170314-7.png)


## 程式碼實作
最後我們來將來上述說明進行程式碼的實作，將二元樹轉換成堆積。我們先來簡單的複習實作二元樹。首先是二元樹的基本結構。

```
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
```
然後我們將要新增個方法，可以新增節點到二元樹中。

```
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
```
完成上需的新增方法，我們就可以新增節點至二元樹中，使用方法如下。

```
var tree = new BinaryTree();
tree.add(new Node(14));
tree.add(new Node(16));
tree.add(new Node(4));
tree.add(new Node(17));
tree.add(new Node(42));
tree.add(new Node(20));
```
接下來才是我們本篇的重點，將二元樹轉換成堆積，我們會直接在`BinaryTree`這物件下新增方法`transToHeap`，該方法可以轉換成堆積。

```
BinaryTree.prototype.searchByIndex = function(index) {
	var result ;
	this.postOrderTraverse(function(node) {
		if (node.index === index)
			result= node;
	});
	return result;
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
```

## 參考資料
* [https://zh.wikipedia.org/zh-tw/%E5%A0%86_(%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84)](https://zh.wikipedia.org/zh-tw/%E5%A0%86_(%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84))
* [https://openhome.cc/Gossip/AlgorithmGossip/HeapSort.htm](https://openhome.cc/Gossip/AlgorithmGossip/HeapSort.htm)