# 基礎資料結構(1)---陣列(Array)、堆疊(Stack)、佇列(Queue)

接下來的幾篇文章，我們將要說簡單說明幾個基礎的資料結構，那麼資料結構又是什麼呢?

根據wiki的解答。

> 資料結構是電腦中儲存、組織資料的方式。

也就是說你丟了一堆資料進去，你的儲存方式，就是資料結構。

那選擇正確的資料結構可以做啥 ? 答案就是可以提供你的演算法效率。接下來我們將在本篇文章說明三種資料結構`陣列(Array)`、`堆疊(Stack)`、`佇列(Queue)`。

本篇文章目錄如下。

* 陣列
* 堆疊
* 佇列

## 陣列(Array)
陣列應該算是我們寫程式時，最常使用到的一種資料結構，它就長的下面這樣，上面那行代表我們的資料陣列，下面那行只是表示每個資料對應到的`Index`，例如`array[0]`的值為`a`。

![](http://yixiang8780.com/outImg/20170211-1.png)

不過有幾點要注意，當初陣列設計之初是在形式上依賴內存分配而成，也就是說必須預先設定陣列的大小。這使得陣列有以下特性。

* 設定陣列大小後，不能在改變(資料溢位問題)。
* 在內存中有該陣列專用的連續空間，不會存在其中程式要調用的資料空間。

由於陣列實在太常使用了，這邊就不多說囉。

##  堆疊(Stack)
它事實上與陣列很相似，只是它有幾個特殊的方，它只能允許在陣列的一端進行操作，而且按照『後進先出』 `LIFO, Last In First Out` 的原理運作。如下圖表示。

[

然後我們簡單的用`javascript`來建立`stack`的資料結構，由於我們是要練習用，所以我們不使用`Js`的陣列內本來就有提供的`stack`方法。

首先我們先建立`Stack`的類別，事實上在`js`中不該說類別，`_size`存放該`stack`的大小，而`_container`則存放資料。

```
/**
 * Stack
 * this is stack data structure;
 * @returns {undefined}
 */
function Stack(){
	this._size =0;
	this._container = {};
}
```
接下來我們要建立的方法有兩個`push`與`pop`，其中`push`就是將資料丟到`stack`內，而`pop`就是取出資料，由於`stack`遵循『後進先出法』，也就是後丟進去的資料，反而會比較快取得，所以`pop`，是要取該`stack`內最後被丟進去的資料。

```
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
```

然後我們接下來要來測試一下，而為了測試方便，我們會多建立一個方法`view`，可以讓我們看到`stack`內的內容。

```
/**
 * view
 * view stack content
 * @returns {undefined}
 */
Stack.prototype.view = function(){
	return this._container;
}
```

最後我們來測試一下，首先我們使用`push`將`ABC`三筆資料丟進`stack`內。

```
var stack = new Stack();
stack.push("A");
stack.push("B");
stack.push("C");

console.log(stack.view());

```
結果如下，可以看到有三筆資料。

```
{ '1': 'A', '2': 'B', '3': 'C' }
```
然後我們使用`pop`來取出資料，根據它的規則『後進先出』，我們應該取出最後丟進去的資料`C`，所以我們執行`view`的結果應該是看不到`C`才對。

```
stack.pop();
console.log(stack.view());
```
結果如下。

```
{ '1': 'A', '2': 'B' }
```

## 佇列(Queue)
在說明完`堆疊(Stack)`後，我們接下來要來說明`佇列`，它上堆疊非常的相似，只是規則不同，佇列，又稱為隊列，從字面上就可以知道，它就是排隊的概念，先到先贏，也就是先進先出法`( FIFO, First-In-First-Out )`的概念。如下圖所示。

![](http://yixiang8780.com/outImg/20170211-3.png)

然後我們接下來實做一下程式碼。首先我們會建立個`queue`的類別。

```
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
```
然後我們要實作兩個方法`enqueue`與`dequeue`，一個是丟資料到`queue`內，裡一個是從`queue`內將資料取出。

```
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
var deleteData;
  if (this._startIndex !== this._endIndex) {
  	 deleteData = this._container[this._startIndex];
     delete this._container[this._startIndex++];
  }
 return deleteData;
}
```
最後來測試一下。

```

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
```
結果如下。

```
{ '1': 'A', '2': 'B', '3': 'C' }

// dequque後的結果。
{ '2': 'B', '3': 'C' }
```
完整程式碼在這，[傳送門](https://github.com/h091237557/30-BasicAlogrithm/blob/master/algorithm-js/baseDataStructure/linklist.js)。


## 參考資料
* [https://zh.wikipedia.org/wiki/%E5%A0%86%E6%A0%88](https://zh.wikipedia.org/wiki/%E5%A0%86%E6%A0%88)
* [https://zh.wikipedia.org/wiki/%E9%98%9F%E5%88%97](https://zh.wikipedia.org/wiki/%E9%98%9F%E5%88%97)