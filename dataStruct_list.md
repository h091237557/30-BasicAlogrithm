# 基礎資料結構(2)---連結串列（Linked list)

前篇文章中，我們說明三種資料結構、陣列、堆疊、佇列，在開始今天的文章前，我們先簡單的複習一下這三個東西是啥。

* 陣列`(array)` : 最常用使用到的資料結構，它是一種相同形態`(!)`的資料集合，並且會分配『連續』的記憶體空間給予陣列存放資料。
* 堆疊`(stack)` : `後進先出`法原理的資料結構，後進去的資料會先取出，就像是你有個箱子，你最先放進去的東西，要先將上面的東西取出後，才能取得。
* 佇列`(queue)` : `先進先出`法原理的資料結構，先進去的東西先取出，就像是排隊一樣，先排先贏，理論上(和平)。

> 剛剛在陣列那有說到相同形態，但事實上`javascript`的陣列，可以存放任何形態的資料，但其它的語言就需要先宣告形態了，某此方面來說它的陣列比較算是`list`。 

複習完了上一篇文章後，咱們可以來學習新的資料結構`連結串列(linked list)`。

* 串列`(Linked list)`原理
* 串列與陣列的比較
* `javascript`程式實作

## 串列 (Linked List) 原理
在上一篇中，我們有學習到陣列，它在儲放資料時非常的彈性，但在進行新增或刪除時卻沒著麼方便，主要原因為它的記憶體是連續的。

本篇文章將要說明的連結串列`(list)`，在新增或刪除時就非常的方便，因為它記憶體不是連續的，而是每個結點分配一段記憶體，然後在結點中記錄下個結點的位置。

連結串列有分很多種，我們在這篇文章中將說明比較常用到的『單向連結串列』與『雙向連結串列』。

### 單向連結串列
單向連結串列，它主要組成的定義如下。

* 由一組節點`(Node)`組成的有序串列。
* 每個節點有『資料欄』與一個『連結欄』組成。
* 『連結欄』指向其它節點的位置。

根據以上的定義，大至上長的如下圖。

![](http://yixiang8780.com/outImg/20170213-1.png)

接下來假如我們要`新增節點D至A與B`之間，過程會和下圖一樣，會將`A節點的Link`連至`D節點`，然後它再連到`B結點上`。而刪除結果過程也差不多，就只是重新指向節點位置。

![](http://yixiang8780.com/outImg/20170213-2.png)

### 雙向連結串列 (Double Linked List)
雙向連結串列是另一種常用的串列結構，在單向串列中，它只能順著一個方向尋找資料，而且中間不小心有個節點斷掉，那後面串列的資料就會消失且救不回來，而雙向連結就是可以改善『單向』與『節點斷掉』這兩個缺點。

雙向連結串列，它主要組成的定義如下。

* 由一組節點`(Node)`組成的有序串列。
* 每個節點有『資料欄』與二個『連結欄』組成，一個連結前一個節點，而另一個則連結後一個節點。
* 『連結欄』指向其它節點的位置。

根據以上的定義，大至上長的如下圖。

![](http://yixiang8780.com/outImg/20170213-3.png)

然後我們看下圖，來理解如果要插入與刪除節點時，雙向連結串列會如何處理。事際上原理和單向連結串列差不多，都是重新指向位置，只是它要多指向一個。

![](http://yixiang8780.com/outImg/20170213-4.png)

## 串列和陣列的比較
由於串列和陣列這兩個使用起來很相似，但原理上，很多地方是不一樣的。以下比較表格來源為此，[傳送門](http://notepad.yehyeh.net/Content/DS/CH04/1.php)。


|        | 連結串列 `(List)`          | 陣列 `(Array)` |
| ------------- |:-------------:| -----:|
| 記憶體     | 不需要連續的空間 | 需要連續的空間 |
| 節點型態      |各`node`形態不相同      |   各`node`形態相同 |
| 操作複雜度 | 插入、刪除都為`O(1)`      |    插入刪除都為`O(n)` |
| 空間配置     | 不需預留空間 | 須事先宣告連續空間 |
| 資料分割、連結     |容易      |   不容易 |
| 存取方式| 只能循序存取      |    可支援隨機與循序存又 |
| 存取速度     |速度慢      |   速度快|
|可靠性| 差      |    佳 |
|額外指標空間| 需要額外的指標空間     |    不需要 |

## Javascript程式碼實作
我們將實作`Single Linked List`與`Double Linked List`。

### 單向連結串列(Single Linked List)實作

我們這邊主要實作三個方法。

* `add` : 可以新增資料至`list`中。
* `remove` : 可以從`list`內，移除指定位置的節點。
* `view` : 可以輸出現在`list`的內容。

首先我們要先建立`list`的結構，我們需要兩個物件，一個代表節點，另一個則代表`list`。
`Node`中我們主要有兩個屬性`data`為該節點的資料，`next`為存放它的下個節點。

而在`SingleList`中，也有兩個屬性`head`，用來存放第一個節點，其它的節點則存放在它的`next`中，而另一個`_length`為代表`list`的節點數。

```
/**
 * Node
 * Node class 
 * @param data
 * @returns {undefined}
 */
function Node(data) {
  this.data = data;
  this.next = null;
}

/**
 * SingleList
 * SingleList class 
 * @returns {undefined}
 */
function SingleList() {
	this.head = null;
	this._length = 0;
}

```
然後我們接下來建立方法`add`，它可以新增節點至`list`中。

```
 * add
 * add data to last .
 * @param data
 * @returns {undefined}
 */
SingleList.prototype.add = function(data){
	var node = new Node(data);
	var currentNode = this.head;	

	if(!currentNode){
		this.head = node;	
		this._length++;
		return node;
	}

	while (currentNode.next){
		currentNode = currentNode.next;	
	}

	currentNode.next = node;
	this._length++;
	return node;	
}
```
上面的程式碼中，有一段程式碼如下，這段是什麼意思呢 ? 它是指將`currentNode`，移動至最後一個節點，再將最後一個節點的`next`，存放我們要新增的節點。這樣我們新增節點的方法就算完成了。

```
	while (currentNode.next){
		currentNode = currentNode.next;	
	}

	currentNode.next = node;
```

接下來我們再來完成`remove`。

```
/**
 * remove
 * it method can remove data from list , depend on postition.
 * @param position
 * @returns {undefined}
 */
SingleList.prototype.remove = function(position){
	var  message = {failure: 'Failure: non-existent node in this list.'};
	var currentNode = this.head,
			deleteNode,
			previous,
			i=1;

	if(position < 1 || position > this._length){
		throw new Error()
	}

	if(position === 1){
		this.head = currentNode.next; 	
		deleteNode = currentNode; 
		this._length--;
		return deleteNode;
	}

	while (i++ < position){
		previous = currentNode;	
		currentNode = currentNode.next;
	}
	previous.next = currentNode.next;
	
	return currentNode;
}

```
這邊我們說明一下`remove`中的這段程式碼，因為這段比較容易讓人混亂。假設我們`list`有三筆資料`A、B、C`，然後我們要刪除`B`，這時我們來跑`while`看看。

* 第一次 : i=2 (是指console.log時的), previous = A , currentNode = B 。
* 第二次 : 由於 i=2 沒有符合小於position 2 ，所以跳出 while 。

跳出後，我們再將`previous`也就是`A`節點，並將它下一個節點設為`B`的下一個節點也就是`C`，所以這時`B`節點就消失囉。

```
    while (i++ < position){
        console.log(i)
        previous = currentNode; 
        currentNode = currentNode.next;
    }
    previous.next = currentNode.next;
```

最後我們來做個可以觀看`list`資料的方法，`view`，這個方法就比較簡單了。

```
/**
 * view
 * It can console log list 
 * @returns {undefined}
 */
SingleList.prototype.view = function(){
	var currentNode = this.head;
	while (currentNode != null){
		console.log(currentNode.data);
		currentNode =  currentNode.next;	
	}
}
```
最後我們來試用看看。

```
var singleList = new SingleList();
singleList.add("A");
singleList.add("B");
singleList.add("C");

singleList.view();

singleList.remove(2);
singleList.view();
```
輸出的結果如下。

```
// 原來的
A B C

// 刪除後

A C
```

### 雙向連結串列 (Double Linked List)實作

我們這邊與上面一樣，主要實作三個方法。

* `add` : 可以新增資料至`list`中。
* `remove` : 可以從`list`內，移除指定位置的節點。
* `view` : 可以輸出現在`list`的內容。

首先我們要先建立`list`的主題，我們需要二個物件，一個代表節點，另一個則代表`list`。
`Node`中我們主要有三個屬性`data`為該節點的資料，`next`為存放它的下個節點而`previous`為存放前一個節點。

而在`DoubleLinkList `中，有三個屬性`head`，用來存放第一個節點，`final`用來存放`list`中最後的節點，最後的屬性`_length`為代表`list`的節點數，

```
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
```
然後我們一樣也先來建立`add`方法，該方法可以讓我們新增資料到`list`中。

```
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
```
其中下面這段程式碼，在單向連結時，我們需要先用`while`來移動到最後的節點，但因為我們雙向連結這邊，多加了一個屬性，`final`用來記錄最後的節點，因此我們在新增時，只要修改這最後的節點就好囉，不用在使用`while`進行移動。

`這是雙向連結串列`的程式碼部份。

```
   this.final.next = node;
   node.previous = this.final;
   this.final = node;
```

`這是單向連結串列`的程式碼部份。

```
while (i++ < position){
	previous = currentNode;	
	currentNode = currentNode.next;
}
	previous.next = currentNode.next;
```

完成後，我們再繼續完成`remove`方法，這個方法真的變比較複雜點兒，我們來慢慢說明。

```
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

  // 1.刪除的節點為第一個的流程
  if (position === 1) {
    this.head = currentNode.next;

    // 如果不是只有一個節點的list則
    if (this.head) {
      this.head.previous = null;
    } else {
      this.final = null;
    }
		
	// 2.刪除的節點為最後一個的流程
  } else if (position === this._length) {
    this.final = this.final.previous;
    this.final.next = null;
    return;
    
    // 3.其餘的刪除的節點流程
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
```
首先我們要先知道，在上面的`remove`程式碼中，大至上可以分成三個部份，來處理不同位置的刪除。

`1.刪除的節點為第一個的流程` : 這個流程中，我們還需要判斷『這個`list`是否只有一個節點』，然後在分開來處理。

```
  // 1.刪除的節點為第一個的流程
  if (position === 1) {
    this.head = currentNode.next;

    // 如果不是只有一個節點的list則
    if (this.head) {
      this.head.previous = null;
    } else {
      this.final = null;
    }
		
	// 2.刪除的節點為最後一個的流程
  }
```

`2.刪除的節點為最後一個的流程` : 這個流程只要將要刪除的節點，它的前一個節點的`next`設置為`null`，並修改`final`為它。

```
// 2.刪除的節點為最後一個的流程
  } else if (position === this._length) {
    this.final = this.final.previous;
    this.final.next = null;
    return;
    
    // 3.其餘的刪除的節點流程
  }
```

3. `其餘的刪除的節點流程` : 這個流程就是先移動到要刪除的節點上，然後再將它的前一個與後一個的節點，連結在一起，這樣它就消失囉。

```
// 3.其餘的刪除的節點流程
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
```
最後一個`view`方法，因為與單向連結列表一樣，所以就不多說囉。

```
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

```
然後我們一樣來測試一下。

```
var list = new DoubleLinkList();
list.add("A");
list.add("B");
list.add("C");

list.view();
list.remove(2);
list.view();

```
結果如下。


```
// 原來的
A B C

// 刪除後

A C
```
最後全部程式碼在此，[傳送門]()。

## 參考資料
* [http://notepad.yehyeh.net/Content/DS/CH04/1.php](http://notepad.yehyeh.net/Content/DS/CH04/1.php)
* [https://zh.wikipedia.org/wiki/%E9%93%BE%E8%A1%A8](https://zh.wikipedia.org/wiki/%E9%93%BE%E8%A1%A8)
* [https://code.tutsplus.com/articles/data-structures-with-javascript-singly-linked-list-and-doubly-linked-list--cms-23392](https://code.tutsplus.com/articles/data-structures-with-javascript-singly-linked-list-and-doubly-linked-list--cms-23392)
