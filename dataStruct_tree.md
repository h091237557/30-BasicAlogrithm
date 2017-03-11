# 基礎資料結構(3)---樹狀結構與二元樹

在這篇文章中，我們將要仔細的來說明樹(Tree)這個資料結構，它在計算機科學中非常的重要，有很多演算法都一定會運用到這種資料結構。接下來我們將要好好的研究它，目錄如下。

* 樹的定義與特性
* 二元樹
* 二元樹的實作與方法操作方法實作

## 樹的定義與特性

在資料結構中，樹這種結構，是用來模擬具有樹狀結構性質的數據集合，它有很明確的層級關係，它長的就像個倒過來的樹，不過你也可以將他想像成祖譜，它真的很像。

在說它的特性前，我們先簡單的知道它的一些素語。我們會搭配著下圖來進行說明。

* 節點`(node)` : 下圖的每一個圈圈都存放資料，稱為`節點(node)`。
* 根節點`(root)` : 就是最上面的節點，如下圖的節點 A 。
* 邊`(edge)` : 下圖連節每個節點的線，稱為`邊(edge)`。
* 分支度`(degree)` : 一個節點的分支度是它擁有的子節點數量，如下圖看節點 C 它的分支度為 3 。
* 階度`(level)` : 樹中節點的層級數量，一代為一個階度，樹根(A)的階度為 1 ，下圖的樹階度為 3 。
* 高度`(Height)`、深度`(depth)` : 樹中某節點的高度代表此節點至最深階度的子節點距離，也就是邊的數量，例如 A 節點的高度為 2 ，而 B 節點的高度為 1 。

![](http://yixiang8780.com/outImg/20170309-1.png)


接下來我們來說明樹的特性，它具有以下的特點 ; 只要符合下面特點的，我們就可以稱為樹狀結構。

* 每個節點有零個或多個子節點
* 沒有父節點的節點稱為根節點
* 每一個非根節點有且只有一個父節點
* 除了根節點外，每個子節點可以分為多個不相交的子樹


## 二元樹 ( Binary tree )
這邊我們要來說明二元樹，它是樹的一種，我們常聽到的二元啥演算法，有很大一部份都是運用二元樹這種資料結構來處理，它的定義如下。

> 二元樹是每個節點最多有兩個子樹的樹狀結構

只要符合上述條件的樹，我們都歸類為二元樹。其中二元樹還是有不同的種類。

### 滿二元樹 ( Full Binary tree )
如果一棵樹的階度為 k 的樹，它的節點樹量為 `2^k - 1` ，則稱為滿二元樹，也就是說全部塞滿的意思，如下圖就是個滿二元樹，它階度為 3 ， 所以它的節點樹量應該為 `2^3 - 1 = 7 `，下圖的節點數量就為 7 。

![](http://yixiang8780.com/outImg/20170309-2.png)

### 完全二元樹 ( Complete tree )
一棵樹階度為 k 的樹 ，則它至少有 `2^(k-1)`個節點，最多有`2^k - 1`個節點，也就是說除了最後一階層，沒有全滿，其餘階層都有全滿的就可稱為完全二元樹。

如下圖，階度為 3 ，所以它至少有 `2^(3-1) = 4`個節點，而最多為`2^3 - 1 = 7`個節點，也就是說滿二元樹必為完全二元樹，但反之這否。

![](http://yixiang8780.com/outImg/20170309-3.png)

### 二元搜尋樹 ( BinarySearch Tree ) 
二元搜尋樹它有以下特性。

* 在左子樹的鍵值均小於樹根的鍵值。
* 在右子樹的所有鍵值均大於樹根的鍵值。
* 左子樹和右子樹亦是二元搜尋樹。
* 每個鍵值都不一樣。

畫出來大至上如下圖可以看出，左子樹所有的鍵值都小於右子樹，而每個節都也是符合這個規則。

![](http://yixiang8780.com/outImg/20170309-6.png)

### 樹的表示法
上面我們知道了二元樹的定義後，我們接下來來學習它的表示法，我們常用的方法有兩種，一種是用陣列`(Array)`來表示，而另一種則是用串列，首先我們先來看看如何用陣列來表示。

首先假設我們有個陣列如下圖，然後它會一個一個從頭排到尾。這種應用對滿二元數與完全二元樹來說相當適合，但是在其它的二元樹，則會造成需多空間的浪費，而且在新增和刪除節點的時後，往需要移動很多的節點。

![](http://yixiang8780.com/outImg/20170309-4.png)

而另一種用串列的表示法就可以用來解決，`新增與刪除時需要移動很多的節點`這項缺點。下圖為串列的表示法。

![](http://yixiang8780.com/outImg/20170309-5.png)


## 樹的實作與方法操作方法實作
最後我們將要使用`javascript`來實作二元樹的實例與二元樹的方法，而我們將要實作的方法有以下這些。

* `add` : 可以新增節點至二元樹裡。
* `traverse` : 遍歷(traverse)，主要的功能為走訪每個節點，並且可以對它們操作某動作，這個功能又可以分成三種分別為以下三種，同時我們會搭配下圖，來知道每種方法的走訪順序。
	1. `中序追蹤(inOrder)` : 先走訪左子樹，然後在樹根，最後在右子樹 ; 
		走訪順序為`DBEAFCG`。 
	2. `前序追蹤(preOrder)` : 先走訪樹根，然後在左子樹，最後在右子樹 ; 走訪順序為`ABDECFG`。
	3. `後序追蹤(postOrder)` : 先走訪左子樹，然後在右子樹，最後在樹根 ; 走訪順序為`DEBFGCA`。

![](http://yixiang8780.com/outImg/20170309-2.png)

### 實作

首先我們要先建立節點類別與二元樹類別。

```
function Node(){
	this.data = null;
	this.left = null;
	this.right = null;
}

function BinaryTree() {
	this.root = null;
}
```
接下來我們來建立`add`這方法，它可以新增節點至二元樹內。基本的邏輯就是每次要新增節點時，要先判斷『現在節點』也就是`insertNode內的node`，它的左右子節點是否是空的，有缺就補，而如果兩個子節點都有貨，那就先判斷`左子節點的子節點`是否有缺，有缺就補，沒缺就丟到右子節點裡面。

```
BinaryTree.prototype.add = function(node) {
	if (this.root == null) {
		this.root = node;
	} else {
		insertNode(this.root,node);
	}

	function insertNode (node, newNode) {
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
在開始建立走訪前，我們先來建立個二元素，在走訪時會用到。

```
var tree = new BinaryTree();
tree.add(new Node("A"));
tree.add(new Node("B"));
tree.add(new Node("C"));
tree.add(new Node("D"));
tree.add(new Node("E"));
tree.add(new Node("F"));
```

然後我們可以開始`traverse`這個方法，上面有提到有三種走訪方法，首先是`中序追蹤(inOrder)`。

#### 中序追蹤(inOrder)

```
BinaryTree.prototype.inOrderTraverse = function(callback) {

	inOrderTraverseNode(this.root,callback);

	function inOrderTraverseNode(node,callback) {
		if(node !== null){
			inOrderTraverseNode(node.left,callback);
			callback(node.data);
			inOrderTraverseNode(node.right,callback);
		}
	}	
};

tree.inOrderTraverse(function(item){
	console.log(item);
});

// 輸出結果。
D
B
E
A
F
C
```

#### 前序追蹤(preOrder)

```
BinaryTree.prototype.preOrderTraverse = function(callback) {

	preOrderTraverseNode(this.root,callback);

	function preOrderTraverseNode(node,callback) {
		if(node !== null){
			callback(node.data);
			preOrderTraverseNode(node.left,callback);
			preOrderTraverseNode(node.right,callback);
		}
	}	
};

tree.preOrderTraverse(function(item){
	console.log(item);
});

tree.preOrderTraverse(function(item){
	console.log(item);
});

// 輸出結果。
A
B
D
E
C
F
```

#### 後序追蹤(postOrder)

```
BinaryTree.prototype.postOrderTraverse = function(callback) {

	postOrderTraverseNode(this.root,callback);

	function postOrderTraverseNode(node,callback) {
		if(node !== null){
			postOrderTraverseNode(node.left,callback);
			postOrderTraverseNode(node.right,callback);
			callback(node.data);
		}
	}	
};

// 輸出結果。
D
E
B
F
C
A
```

## 參考資料
* [https://zh.wikipedia.org/wiki/%E4%BA%8C%E5%8F%89%E6%A0%91](https://zh.wikipedia.org/wiki/%E4%BA%8C%E5%8F%89%E6%A0%91)
* [https://zh.wikipedia.org/wiki/%E6%A8%B9%E7%8B%80%E7%B5%90%E6%A7%8B](https://zh.wikipedia.org/wiki/%E6%A8%B9%E7%8B%80%E7%B5%90%E6%A7%8B)