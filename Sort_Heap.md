# 排序(3)之堆積排序法(Heap Sort)

* 堆積排序法的原理
* 堆積排序法的執行效能
* `javascript`演算法實作

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

然後我們會從`最小父節點`，開始進行`Max Heap`判斷，然後再往前遞回。我們會先從`09`該節點進行判斷，由於`09小於16`，因此進行互換，結果如下圖。

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

![](http://yixiang8780.com/outImg/20170127-9.png)
![](http://yixiang8780.com/outImg/20170127-10.png)
![](http://yixiang8780.com/outImg/20170127-11.png)
![](http://yixiang8780.com/outImg/20170127-12.png)
![](http://yixiang8780.com/outImg/20170127-13.png)
![](http://yixiang8780.com/outImg/20170127-14.png)
![](http://yixiang8780.com/outImg/20170127-15.png)





