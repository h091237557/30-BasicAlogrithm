<script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=default"></script>
# 排序(3)之堆積排序法(Heap Sort)



## 堆積排序法的原理

### 堆積樹 `Heap Tree`

再說明堆積排序排序前，我們需要先知道一個東西，那就是`Heap Tree`，它是二元樹的一種，
那二元樹是啥 ? 就是長的和下圖一樣的東西，而它有兩個比較嚴謹的定義

* 每個節點最多有兩個子節點
* 子節點有左右之分

![](http://yixiang8780.com/outImg/20170127-6.png)

而其中，我們在這邊需要用的是完全二元樹`Complete Binary Tree`，它除了上面的定義外，還有另外一個。它的樣子大至上如下圖。

* 除了最後一階層之外的階層，都必預完全有左與右節點

![](http://yixiang8780.com/outImg/20170127-7.png)

### 最大堆積 `Max Heap`
在了解完`Heap Tree`後，我們就要來知道，`Max Heap`是啥，它也是種堆積樹一種，不過它有個條件。

* 父節點的值大於子節點
* 樹根(root)一定是所有節點的最大值

根據以上的條件畫出的圖，大概如下。

![](http://yixiang8780.com/outImg/20170127-8.png)

我們這邊來看看下面幾張`Max Heap`產生過程的圖解。

首先我們會先將陣列轉換成`Heap Tree`。

![](http://yixiang8780.com/outImg/20170127-1.png)

然後我們會從`最後的父節點`，開始進行`Max Heap`判斷，然後再往前遞回。我們會先從`09`該節點進行判斷，由於`09小於16`，因此進行互換，結果如下圖。

![](http://yixiang8780.com/outImg/20170127-2.png)

接下來，我們在往回前一個父節點，`11`來進行判斷，因為該父節點值都大於子節點`02與10`因此不需要進行互換。結果如下圖。

![](http://yixiang8780.com/outImg/20170127-3.png)

最後再來判斷`root`，也就是最後一個父節點`08`，它下面兩個子節點`11與16`都比它大，因此，它選擇最大值`16`進行交換，然後`08`再於`09`進行比較，再進行交換，結果如下。

![](http://yixiang8780.com/outImg/20170127-4.png)

最後產生出的`Max Heap`結果如下。

![](http://yixiang8780.com/outImg/20170127-5.png)

### 堆積排序法 
在了解完上面的前制知識後，我們就可以開始了了解堆積排序法的做法囉，它的流程如下。

`前置作業`

1. 將陣列轉換成`Heap Tree`。
2. 在將`Heap Tree`轉換成`Max Heap`

`重複作業`

1. 將最上面的節點`root`與最後面的節點交換位置。
2. 將`Tree`轉換成`Max Heap`
3. 然後一直`re re re re`這流程，直到完全排序完成。

下面我們將簡單用個範例，來說明他如下排序。首先我們有個要排序的陣列。

```
[08,14,16,10,9]
```
然後根據上述的`前置作業`先將它轉換成`Max Heap`。

```
[16,14,18,8,9]
```

接下來我們將要開始進行`重複作業`的步驟。首先，先將`16(root)`與`08(最後結點)`進行交換。其中下圖中的`Swap(0,4)`，代表著陣列位置為`0`與`4`的進資料進行交換。

![](http://yixiang8780.com/outImg/20170127-9.png)

然後接鑑來我們進行`Max Heap`的步驟，我們將從陣列位置`0`的資料`9`進行`Max Heap`，因為`9`小於`14與10`因此選擇較大者`14`進行交換。

![](http://yixiang8780.com/outImg/20170127-10.png)

再將`14(root)`與`8(最後結點)`進行交換，注意這時最後結點是`8`了喔。

![](http://yixiang8780.com/outImg/20170127-11.png)

然後在進行`Max Heap`，`8`小於`9與10`，選擇`10`進行換位。

![](http://yixiang8780.com/outImg/20170127-12.png)

進行`10(root)`與`8(最後結點)`交換。

![](http://yixiang8780.com/outImg/20170127-13.png)

再進行`Max Heap`。

![](http://yixiang8780.com/outImg/20170127-14.png)

最後在進行交換，然後完成。

![](http://yixiang8780.com/outImg/20170127-15.png)

> 注意，上述範例都是由小排到大，如果是要由大排到小的，需要將`Max Heap`修改為`Min Heap`，也就是每個父元素值要小於子元素。

## 堆積排序法的執行效能

### 最好與最壞情況

`O(nlogn)`

## `javascript`演算法實作

```
debugger;

/**
 * swap
 * swap datas location , ex [1,2] => swap(datas,0,1) => [2,1] 
 * @param datas
 * @param i
 * @param j
 * @returns {undefined}
 */
function swap(datas, i, j) {
  var temp = datas[i];
  datas[i] = datas[j];
  datas[j] = temp;
}

/**
 * maxHeapIfy
 * Create the max heap like this 
 * 		6
 * 	4		5
 * 1 2  3
 *
 * @param datas
 * @param root
 * @param length
 * @returns {undefined}
 */
function maxHeapIfy(datas, root, length) {
  var leftChild = root * 2 + 1;
  var rightChild = root * 2 + 2;
  var maxNode = -1;

  // 如果左邊的子節點，大於父節點，則最大node設為左邊子節點
  if (leftChild < length && (datas[leftChild] > datas[root])) {
    maxNode = leftChild;
  } else {
    maxNode = root;
  }

  // 如果右邊的子節點，大於父節點，則最大node設為右邊子節點
  if (rightChild < length && (datas[rightChild] > datas[maxNode])) {
    maxNode = rightChild;
  }

  if (maxNode != root) {
    swap(datas, root, maxNode);
    maxHeapIfy(datas, maxNode, length);
  }
}

/**
 * heapSort
 * heap sort datas
 * @param datas
 * @returns {undefined}
 */
function heapSort(datas) {
  var start = Math.floor(datas.length / 2) - 1,
			len = datas.length;
  for (var i = start; i >= 0; i--) {
    maxHeapIfy(datas, i, datas.length);
  }

	for (var j = len-1;j >=0;j--){
		swap(datas,0,j);	
		maxHeapIfy(datas,0,j);
		console.log(datas);
	}
}

var datas = [8, 11, 9, 2, 10, 16];

heapSort(datas);

```

## 參考資料
* [https://www.google.com.tw/search?q=heapsort&oq=heapsort&aqs=chrome..69i57j0j69i60j0l3.1495j0j4&sourceid=chrome&ie=UTF-8](https://www.google.com.tw/search?q=heapsort&oq=heapsort&aqs=chrome..69i57j0j69i60j0l3.1495j0j4&sourceid=chrome&ie=UTF-8)
