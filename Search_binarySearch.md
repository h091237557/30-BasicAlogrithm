# 搜尋(1)之二元搜尋法 (binary search)
基本上如果我們要在陣列中搜尋一個元素，最簡單的方法就是跑個迴圈一個一個跑，它有個專有名詞叫`線性搜尋`，這在未排序的資料中，效果還算可以，但是如果在`已排序`的資料中，要來進行搜尋，就不太有效率了，本篇文章說明的二元搜尋法就是用來搜尋`已排序`的資料集。

* 二元搜尋法原理
* 程式碼實作(資料結構:陣列)
* 程式碼實作(二元搜尋樹實作)

## 二元搜尋法原理

它的基本搜尋概念，是將資料切兩半，然後比較搜尋目標在這兩半的左邊還右邊，如果在左邊，則將左邊的資料再切兩半，以此類推，至到尋找到目標。

我們簡單的用下圖來說明，假設我們有個陣列，資料 1 至 9，並且已經排序，然後我們要搜尋`2`，首先我們會先比較目標值( 2 )與中位數( 5 )，由於 5 大於 2 ，所以我們接下來只將搜尋左邊 1 至 4 的資料，然後我們再將目標值( 2 )與中位數( 3 )進行比較，由於 3 大於 2 ，因此再來也只搜尋左邊的 1 至 2 的資料，將目標值( 2 )與中位數( 2 )比較，相等，尋找到目標值。

![](http://yixiang8780.com/outImg/20170421-1.png)

接下來我們簡單的使用`js`來實現二分搜尋法。

## 效能
### 最佳時間複雜度 : O (1)
### 平均時間複雜度 : O (log n) 
### 最差時間複雜度 : O (log n)
### 空間複雜度 : O (1)

## 程式碼實作(資料結構:陣列)

```
function binarySearch(datas, low, heigh, target) {
	let mid = Math.ceil((low + heigh) / 2) ;
	if (datas[mid] == target) {
		return	datas[mid];
	} else if (datas[mid] > target) {
		return binarySearch(datas, 0, mid, target);
	} else if (datas[mid] > target) {
		return binarySearch(datas,mid,datas.length,target);
	}
}

var datas = [1,2,3,4,5,6,7,8,9];

var result = binarySearch(datas,0,datas.length-1,2);

```

## 二元搜尋樹實作
二元搜尋樹是一種資料結構，假設你的資料本來就存儲成二元搜尋樹而不是陣列，那這樣你要使用二元搜尋法來尋找元素會更方便。下列筆者的文章中，有簡單的說明二元搜尋樹的概念。[傳送門-樹與二元樹資料結構](http://marklin-blog.logdown.com/posts/1526463)

二元搜尋樹的基本條件就是`左邊的子樹一定小於右邊的子樹`，我們這邊來簡單的建立`binary search tree`。

首先我們要先建立節點類別與二元樹類別。

```
function Node(){
	this.data = null;
	this.left = null;
	this.right = null;
}

function BinaryTree(){
	this.root = null;
}
```
然後我們要建立一個`add`方法，它可以新增節點至二元樹裡，它的撰寫邏輯為，首先每次要新增節點時，你要先判斷它是放在左邊子陣列，還是右邊子陣列，接下來在判斷是否有空，如果為空則新增，而有貨的話則往下到孫節點建立。

```
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
```
然後我們就可以建立二元搜尋樹了。

```
let tree = new BinarySearchTree();
tree.add(new Node(5));
tree.add(new Node(2));
tree.add(new Node(9));
tree.add(new Node(10));
tree.add(new Node(1));
tree.add(new Node(8));
tree.add(new Node(4));
```
產生出來的二元搜尋樹長這樣。

```
		5
	  /   \
	 2		9
	/ \   /  \
  1   4  8   10
```

然後接下來我們來寫`search`，它的基本觀念就是二元搜尋法，更確切的說，在二元搜尋樹裡做搜尋，本身就是二元搜尋法，我們只要判斷目標值是在左子樹還右子樹，然後在往下去找就夠了。程式碼非常的簡單。

```
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
```

## 參考資料
* [https://en.wikipedia.org/wiki/Binary_search_algorithm](https://en.wikipedia.org/wiki/Binary_search_algorithm)

