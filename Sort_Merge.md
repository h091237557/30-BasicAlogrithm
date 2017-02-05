# 排序(5)之合併排序法(Merge Sort)

* 合併排序法的原理
* 合併排序法的速度效能
* 合併排序法的空間效能
* `javascript`演算法實作

## 合併排序法原理
合併排序法，它也是與上一篇提到的快速排序法一樣，使用分治法的概念，也就是將問題拆分為子問題，各別解決後，再將結果進行合併。

大部份的排序演算法中，都不太需要額外(大量)的儲存空間，而合併排序法，會需要使用到空間，但相對的它在時間複雜度的表現，比其它幾個演算法優質些。

合併排序法實作的概念基本上有分為兩個，`Top Down`與`Bottom Up`

首先請看下圖，它是`Top Down`的概念，它會先將資料拆分開來，然後再進行組合、排序，直到資料全部排序完成。

![](http://yixiang8780.com/outImg/20170205-1.png)

然後我們在看下圖，它為`Bottom Up`的概感，將資料以最小單位`2`為限制，拆分，然後進行排序，再組合成下一個單位`4`，再進行排序，以此類推，直到排序完成。

![](http://yixiang8780.com/outImg/20170205-2.png)


## 合併排序法的速度效能

### 平均

`O(nlogn)`

### 最好

`O(n)`

### 最壞

`O(nlogn)`

## 合併排序法的空間效能

`O(n)`

## `javascript`演算法實作

> 注意，基本上只有在拆分時作法不一樣，但在`merge`時，這邊都是呼叫它一個方法。

### `Top Down實作`

```
debugger;

/**
 * mergeSort_TopDown 
 * @param datas
 * @returns {undefined}
 */
function mergeSort_TopDown(datas) {
  if (datas.length > 1) {
    var len = datas.length;
    var mid = Math.floor(len / 2);
    var right = [];
    var left = [];

    //將datas陣列分兩左子陣列與右子陣列
    for (var i = 0; i < len; i++) {
      if (i < mid) {
        left.push(datas[i]);
      } else {
        right.push(datas[i]);
      }
    }

    var leftSort = mergeSort_TopDown(left);
    var rightSort = mergeSort_TopDown(right);
    return merge(leftSort, rightSort);
  }
  return datas;
}


/**
 * merge
 * 將已排序的左與右子陣列，進行合併
 * @param left
 * @param right
 * @returns {Array} sortedData
 */
function merge(left, right) {
  var sortedData = [],
    leftLen = left.length,
    rightLen = right.length,
    leftIndex = 0,
    rightIndex = 0;

  for (var i = 0; i < leftLen + rightLen; i++) {

    // 如果left陣列已比較完，則都輸入right陣列
    if (leftIndex == leftLen) {
      sortedData.push(right[rightIndex++]);

      // 如果right陣列已比較完，則都輸入left陣列 
    } else if (rightIndex == rightLen) {
      sortedData.push(left[leftIndex++]);

      // 如果left陣列資料小於right陣列資料，則將資料放置sortedData	
    } else if (left[leftIndex] < right[rightIndex]) {
      sortedData.push(left[leftIndex++]);

      // 相反的，則將right資料存放至sortedData
    } else {
      sortedData.push(right[rightIndex++]);
    }
  }
  return sortedData;
}


```

### `Bottom Up`實作

```
/**
 * mergeSort_BottomUp
 *
 * @param datas
 * @returns {undefined}
 */
function mergeSort_BottomUp(datas) {
  var len = datas.length;

	//2、4、8 這邊跑
	//例如 [1,2,3,4,5,6,7,8] 第一圈會跑[1,2]、[3,4]、[5,6]、[7,8]
	//第二圈會跑 [1,2,3,4]、[5,6,7,8
	//第三圈會跑 [1,2,3,4,5,6,7,8]
  for (var width = 1; width < len; width = 2 * width) {
    for (var i = 0; i < len; i = i + 2 * width) {
			var sortedDatas = merge(datas.slice(i,i+width),datas.slice(i+width,i+width+width))	
			for (var k=0;k<sortedDatas.length;k++){
				datas[k+i] = sortedDatas[k];	
			}	
    console.log(datas);
			}
  }
}

/**
 * merge
 * 將已排序的左與右子陣列，進行合併
 * @param left
 * @param right
 * @returns {Array} sortedData
 */
function merge(left, right) {
  var sortedData = [],
    leftLen = left.length,
    rightLen = right.length,
    leftIndex = 0,
    rightIndex = 0;

  for (var i = 0; i < leftLen + rightLen; i++) {

    // 如果left陣列已比較完，則都輸入right陣列
    if (leftIndex == leftLen) {
      sortedData.push(right[rightIndex++]);

      // 如果right陣列已比較完，則都輸入left陣列 
    } else if (rightIndex == rightLen) {
      sortedData.push(left[leftIndex++]);

      // 如果left陣列資料小於right陣列資料，則將資料放置sortedData	
    } else if (left[leftIndex] < right[rightIndex]) {
      sortedData.push(left[leftIndex++]);

      // 相反的，則將right資料存放至sortedData
    } else {
      sortedData.push(right[rightIndex++]);
    }
  }
  return sortedData;
}

```



## 參考資料
* [https://en.wikipedia.org/wiki/Merge_sort](https://en.wikipedia.org/wiki/Merge_sort)
* [http://stackoverflow.com/questions/10153393/mergesort-is-bottom-up-faster-than-top-down](http://stackoverflow.com/questions/10153393/mergesort-is-bottom-up-faster-than-top-down)
* [https://www.google.com.tw/search?q=merge+sort+bottom+up+vs+top+down&oq=merge+sort+bottom+up+vs+top+down&aqs=chrome.0.69i59.1675j0j4&sourceid=chrome&ie=UTF-8](https://www.google.com.tw/search?q=merge+sort+bottom+up+vs+top+down&oq=merge+sort+bottom+up+vs+top+down&aqs=chrome.0.69i59.1675j0j4&sourceid=chrome&ie=UTF-8)