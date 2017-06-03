# 排序之快速排序法(Quick Sort)

* 快速排序法的原理
* 快速排序法的速度效能
* 快速排序法的空間效能
* 基準點的選擇
* javascript 演算法實作

## 快速排序法的原理
快速排序法，又稱為`分割排序法(partioion exchange sort)`，是一種最快的排序法之一，它使用分治法的概念，將問題拆分成兩個獨立的問題來進行解決，再將兩個結果合成原問題的答案，這就是說所謂的`分治法`[(傳送門)](http://marklin-blog.logdown.com/posts/1636923)。

快速排序的過程有四個步驟。

> 注意以下皆以由小排到大的流程來進行說明。

假設我們總共要排序的資料有`n`個，`D1,D2,D3,...,Dn`。

1. 選定一個基準值`(privot)`，並假設為`D`。
2. 由左至右尋找 `i=2,3,4,..,n`，一直到`Di > D`。
3. 由右至左尋找 `j=n,n-1,n-2,...`，一直到`Dj < D`。
4. 當`i<j`時，`Di與Dj互換`，而當`i>j`時`D與Dj互換`。

### 範例

我們下面來看看這個範例。

假設我們的`基準值設為最左邊的值，也就是陣列的初始值`。

> 基準值的選擇後面會說明

而我們要排序的陣列如下。

[ 39 , 15 , 37 , 89 , 45 , 20 , 32 , 51 ]

然後我們開始進行快速排序法，首先我們選定的基準值為`39`。

[ `39` , 15 , 37 , 89 , 45 , 20 , 32 , 51 ]

然後開始由左至右尋找，直到比`39`大的值，選擇`89`。接下來由右至左找，直到比`39`小的值，選擇`32`。因`i (3) < j (6)`，所以`89`與`32`位置進行互換，如下。

[ `39` , 15 , 37 , `32` , 45 , 20 , `89` , 51 ]

再繼續同樣的步驟，由左至右我們尋找到`45`，由右至左我們尋找到`20`。因`i (4) < j (5)`，所以`20`與`45`互換，結果如下。

[ `39` , 15 , 37 , 32 , `20` , `45` , 89 , 51 ]

再來左至右尋找到`45`，然後由右至左尋找到`20`，這時因`i (5) > j(4)`，所以`39`與`20`進行互換，結果如下。

[ `20` , 15 , 37 , 32 , `39` , `45` , 89 , 51 ]

現在我們看看上面的陣列，我們發現在`39`左邊的都是比它小的，而在右邊的都是比它大的，這時咱們就在將`39`左邊與右邊的陣列，繼續進行上述步驟。

### 左邊子陣列排序 [ 20 , 15 , 37 , 32 ]

首先我們先看`左邊的子陣列`，並且一樣選擇最左邊的資料為基準點。

[ `20` , 15 , 37 , 32 ]

然後從左至右開始尋找，直到比`20`還大的值`37`。接下來由右至左找，直到比`20`還小的值，選擇`15`，因`i (2) > j (1)`，所以將基準點`20`與`15`進行交換，結果如下。

[ 15 , 20 , 37 , 32 ]

我們一樣又將`左邊的子陣列`根據基準點`20`，又分割成兩個陣列`[15]`與`[37,32]`，由於`[15]`只有一個值不需進行排序，因此只要再將`[37,32]`進行排序好，就完成`左邊子陣列的排序囉`，`左邊子陣列`結果如下。

[ 15 , 20 , 32 , 37 ]

### 右邊子陣列排序 [ 45 , 89 , 51 ] 

我們選擇`45`為基準點。

[ `45` , 89 , 51 ] 

然後從右至左尋找，直到比`45`還大的值`89`。接下來由左至右找，直到比`45`還小值，沒有~ 這時我們的`j`事實上就是`0`這個位置，這時`i(1) > j(0)`，所以基準點`45`與`j(0)`的值互換，這時注意，因為都是基準點，所以結果還是長的一樣。

[ `45` , 89 , 51 ] 

這時要著麼處理呢 ? 記好，只要完全上述的步驟我們就可以拆分成兩個子陣列，所以上述的陣列會拆分為`[]`與`[ 89 , 51 ]`，沒錯，空陣列那個就可以不用做囉，我們只要繼續做右邊的那個陣列就行囉，結果如下。

[ 51 , 89 ]

然後再將這個主題的右邊子陣列內的子陣列全部合體，結果如下。

[ 45 , 51 , 89 ]

### 然後將左子陣列與右子陣列排序的結果進行合體，不過別忘了最開始拆分的基準點`39`。

左子陣列結果。

[ 15 , 20 , 32 , 37 ]

右子陣列結果。

[ 45 , 51 , 89 ]

基準點。

[ 39 ]

合體為。

[ 15 , 20 , 32 ,37 , 39 , 45 , 51 , 89 ]

結束 ~

## 快速排序法的速度效能

### 最好情況
`O(n log n)`

### 最壞情況

`O(n^2)`

### 平均情況

`O(n log n)`

## 快速排序法的空間效能
快速排序法的空間複雜度會依實作的方式而有所不同，例如下述範例程式碼，它有兩個快速排序的方法`quickSort_space`與`quickSort_inPlace`，其中`quickSort_space`，這種寫法比較簡單，但缺點就是需要比較多的空間。

快速排序法還有一個東西會影響到空間複雜度，那就是遞迴的深度，深度越多，需要空間越大。

### 最好情況
`O(log n)`

遞迴深度為 `log n`

### 最壞情況

`O(n)`
遞迴深度為 `n-1`

## 基準點的選擇
通常有三種選擇。

* 選擇第一個或最後一個元素

> 但注意，這種選擇在排序的資料，會跑出最壞情況`O(n^2)`

* 隨機亂數

>使用它會題供平均情況的效能

* 三數中位數`(median-of-three)`，也就是第一、最後、中間的資料的中位數

>  根據`Sedgewick`描述，這作法會有`5%`的效能提升，但些情況會不佳，想知細節請參考`(Musser,1997)`。

## `javascript`演算法實作

```
debugger;
/**
 * quickSort
 * This method is easy , but it need more space , not good ~
 * @param datas
 * @returns {undefined}
 */
function quickSort_space(datas) {
  if (datas.length <= 1)
    return datas.slice(0);

  var len = datas.length,
    left = [],
    right = [],
    privot = [datas[0]];

  for (var i = 1; i < len; i++) {
    if (datas[i] < privot[0]) {
      left.push(datas[i]);
    } else {
      right.push(datas[i]);
    }
  }
  console.log("right : " + right);
  console.log("left :" + left);
  return quickSort_space(left).concat(privot.concat(quickSort_space(right)));
}

//console.log(quickSort_space([5, 3, 7, 4, 1, 9, 8, 6, 2]));


function swap(datas, i, j) {
  var temp = datas[i];
  datas[i] = datas[j];
  datas[j] = temp;
}

/**
 * quickSort_inPlace
 * This method is better than quickSort_space
 * @param datas
 * @param left
 * @param right
 * @returns {undefined}
 */
function quickSort_inPlace(datas, left, right) {
  if (left < right) {
    var i = left,
      j = right + 1,
      len = datas.length;
    while (true) {

      while (i + 1 < len && datas[++i] < datas[left]) {};

      while (j - 1 > -1 && datas[--j] > datas[left]);

      if (i >= j)
        break;
      swap(datas, i, j);
    }
    swap(datas, left, j);
    console.log(datas);
    quickSort_inPlace(datas, left, j - 1);
    quickSort_inPlace(datas, j + 1, right);
  }
}

//quickSort_inPlace([39, 15, 37, 89, 45, 20, 32, 51], 0, 7);

quickSort_inPlace([45,89,51], 0, 2);


```

## 參考資料

* [https://zh.wikipedia.org/wiki/%E5%BF%AB%E9%80%9F%E6%8E%92%E5%BA%8F](https://zh.wikipedia.org/wiki/%E5%BF%AB%E9%80%9F%E6%8E%92%E5%BA%8F)
* [https://en.wikipedia.org/wiki/Quicksort](https://en.wikipedia.org/wiki/Quicksort)
* [http://notepad.yehyeh.net/Content/Algorithm/Sort/Quick/Quick.php](http://notepad.yehyeh.net/Content/Algorithm/Sort/Quick/Quick.php)