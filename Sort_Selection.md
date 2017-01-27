# 排序(2)之選擇排序法(Selection Sort)

* 選擇排序法的原理
* 插入排序法的執行效能
* `javascript`演算法實作

## 選擇排序法的原理

選擇排序法，它基本的觀念為，就資料分成已排序與未排序，然後在未排序的資料中尋找最小(大)值，並將它移置已排序資料的右邊，我們以下圖來簡單的進行說明。[圖片來源](http://enelia90.blogspot.tw/2011/02/types-of-sorting-and-sorting-algorithms.html)

> 注意，下列的`A[0]`代表陣列的第一個位置。

* 第一行 : 已排序資料為空，然後尋找未排序資料中最小值`8`，並將它移至已排序資料的右邊，也就是`A[0]`，結果如第二行。
* 第二行 : 已排序資料為`8`，尋找未排序資料中最小值`23`，並將它移至已排序資料的尾端`A[1]`，結果如第三行。
* 以此類推，最後可得到從小到大的排序資料。

![](http://yixiang8780.com/outImg/20170124-1.JPG)

## 插入排序法的執行效能

那這個排序演算法效能如何 ? 我們會分成最好與最壞與平均來看。

### 最好、最壞、平均狀況

`O(n^2)`

對都是一樣的，就算是排序好的，也是`O(n^2)`的時間複雜度，我們來看個例子。

```
[1,2,3,4,5]
```
我們有上面的陣列，它需要進行排序，我們知道它排序好了，但演算法不知，所以還是要跑。

* 第一行 : 已排序資料為空，然後尋找未排序資料最小值，因為演算法不知道最小值是啥，所以還是要從頭找到尾，然後找出`1`，並將它放到`A[0]`位置。
* 然後接下來，每一行還是要從未排序資料中，從頭掃到尾來尋找資料，不管你有沒有排序好。

### 建議使用情況
根據Wiki的說法，嗯……。

> 原地操作幾乎是選擇排序的唯一優點，當空間複雜度要求較高時，可以考慮選擇排序；實際適用的場合非常罕見。

## `javascript`演算法實作

我們來看看它的演算法，我們採用`javascript`來進行撰寫。

```
/**
 * selectionSort
 * Selection Sort Algorithmic
 * @param arr
 * @returns {Array} , Thie return's array has been Sorted.   
 */
function selectionSort(arr){
	var len = arr.length,
			min = 0;
	for (var i=0;i<len;i++){
		min = i;	
		for (var j=i+1;j<len;j++){
			if(arr[min] >= arr[j] ){
				min = j;
			}
		}
		swap(arr,min,i);
		console.log(arr);
	}
	return arr;
}


/**
 * swap
 * Swap the min element and now element location.
 * @param arr , array
 * @param min , the min element's postion 
 * @param pos , now postion
 * @returns {undefined}
 */
function swap(arr,min,pos){
	var temp = arr[min];
	arr[min] = arr[pos];
	arr[pos] = temp;
}


```
簡單的測試一下。

```
selectionSort([3,54,24,33,22,58,95,1,2,31])
```

![](http://yixiang8780.com/outImg/20170124-2.png)

## 參考資料
* [https://zh.wikipedia.org/wiki/%E9%80%89%E6%8B%A9%E6%8E%92%E5%BA%8F](https://zh.wikipedia.org/wiki/%E9%80%89%E6%8B%A9%E6%8E%92%E5%BA%8F)
* [http://www.books.com.tw/products/0010741391](http://www.books.com.tw/products/0010741391)