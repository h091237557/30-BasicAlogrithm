# 排序之桶子排序法(Bucket Sort)

* 比較排序法與非比較排序法
* 桶子排序法原理
* 桶子排序法使用時機
* 桶子排序法複雜度
* javascript 演算法實作

## 比較排序法與非比較排序法
前面幾篇我們學的排序演算法都被歸類為`比較排序法`，而另一種歸類為`非比較排序法`，桶子排序法`Bucket Sort`就是屬於該歸類。

我們這邊簡單的說一下`比較排序法`與`非比較排序法`的差別，首先比較排序法是透過資料兩兩比較進行排序，而且它在效能上有根本的限制，在最差的情況下，任何一種比較排序法至少需要`O(nlogn)`比較操作。

網上有個簡單的證明，就設我們有3個資料要進行排序，`1,4,5`，那們它有幾種排序組合? 
答案是`3! = 3 * 2 * 1 = 6`，六種排序法，也就是說它六較次數至少為 
`Log(N!) = O ( N log N )`。

而`非比較排序法`就沒有效能上的限制，通過非比較操作能在``O(n)`完成，但它缺少了靈活性，比較排序法能對各種數據型態進行排序，而非比較排序則不能，這種靈活性也導致了比較排序被更多的應用在大多數實際工作中。

像在`Mozilla`的`javascript`的`sort`預設是`Merge Sort`，而`WebKit`則是`Selection Sort`，都是選用比較排序法。

## 桶子排序法原理
桶子排序法，它的原理是將陣列，分散到有限數量的桶子中，然後每個桶子再個別進行排序，其中每個桶子的個別排序可以運用其它的演算法來進行排序。

桶子排序法有三個特點

* 桶子排序法是穩定的。
* 它是常見的排序法中最快的一種，大多數的情況下。
* 它非常快，但缺點是非常的耗空間。

> 上面有說到穩定，但穩定是什麼意思呢?例子，假設我們有個數列為3,5,19,3*,10，其中3*只是為了識別它和前面的3是不一樣的。
> 
> 穩定排序結果 => 1,3,3*,5,10,19
> 
> 不穩定排序結果 => 1,3*,3,5,10,19
> 
> 從上面結果可知穩定的它的順序會與原資料一樣3在3*前面，而不穩定則會有不同結果。

桶子排序法基本的流程如下。

1. 建立桶子群。
2. 將資料丟到對應的桶子裡。
3. 個別桶子進行排序。
4. 然後在依順序取出結果。

我們來看看下面的圖片說明，假設我們要排序的資料如下。

`[ 7 , 5 , 9 , 2 , 10 , 1 , 8 ]`

然後首先第一步，我們要將資料分配到`Bucket`中，但要著麼分呢 ? 我們會建立個`雜湊函式Hash(x)`，然後盡可能讓這個函式可以`平均`的分配資料，不然可能會發生最壞的情況。

我們這邊假設`hash(x) = x/3`，並且每個桶子都給予值，來決定誰該放到那個桶子，例如桶子值為`1`則，我們只會將`x/3`為`1開頭`的放至到該桶子，如下圖`5/3 = 1.666..`的會放到值為`1`的桶子。

![](http://yixiang8780.com/outImg/20170206-1.png)

接下來各別的桶子進行排序，排序的方法自由決定，可以是選擇排序、快速排序。

![](http://yixiang8780.com/outImg/20170206-2.png)

最後呢再將資料從桶子取出，然後就完成囉。

![](http://yixiang8780.com/outImg/20170206-3.png)

## 桶子排序法使用時機
有以下兩點。

1. `資料均勻分布` : 輸入的資料必須是均勻分布於特別範圍，並依據這個範圍，建立`n`個桶子。
2. `有序的雜湊函` : 桶子必須是有序的。如果沒有順序那取出時又要再排序一次就沒意義了。

## 桶子排序法時間複雜度

### 最好與平均

`O ( n+k )`

### 最壞

`O ( n^2 )`

## 桶子排序法空間複雜度

`O ( n*k ) `

## javascript 演算法說明

這邊我們根據上面的範例，來建立`Bucket Sort`。

下列為`javascript`說明，而最下面為全部程式碼。不過先仔細看一下會發現，為什麼預設的桶子數為`5`，事實上這只是假設，實際上，它應該用其它方法來計算可能的桶子數，我們這邊的`Hash function`為`x/3`，並且我們是根據計算出的`Hash`值，來決定它該丟到那個桶子，例如`1.3`，我們就會丟到`1`的桶子。

所以我們總共要設幾個桶子呢，這邊我們可以先找出陣列中的最大值，然後計算它的`Hash`值，並用該值來決定我們總共要建立多少個桶子。

我們的最大值為`10`，所以根據`Hash function`計算出的結果為`3`，所以我們至少要建立`4`個桶子，因為陣列從`0`開始所以要加一個。

> 桶子數嚴格來說要根據你的`Hash function`來進行決定。

我們簡單的說明一下程式碼。首先我們先看`Hash function`，假設我們的`x`為`10`，則`hash`值為`3`，而假設為`2`，則出來的結果為`0`。

```
function(x){
	// 取最小整數
	return Math.floor(x/3);
}
```
然後我們建立桶子，並且每個桶子為陣列型式。

```
  // create buckets 
  for (var i = 0; i < bucketsCount; i++) {
    buckets[i] = [];
  }
```
接下來我們會根據`hash function`計算出的`hash`值，來決定各資料要丟到那個桶子內。

```
// According to hashFun, we can distruibute data to buckets
  for (var k = 0; k < len; k++) {
    buckets[hashFun(datas[k])].push(datas[k]);
  }

```
再來我們將各別桶子內的值進行排序，我們直接使用`javascript`的預設排序，由於它的排序是依字母排序所以我們自訂排序規則`(a,b)=>{return a-b}`。

最後我們將每個排序好的桶子內資料，一個一個取出，然後就產生出已排序資料。

```
  Object.keys(buckets).forEach((key) => {
 // By default the sort in js is elements alphabetically. so we must add sort function.
    buckets[key].sort((a, b) => {
      return a - b
    });
    console.log(buckets[key]);
    buckets[key].forEach((value) => {
      result.push(value)
    });
  })
```

## 全部程式碼

```
/**
 * bucketSort
 * bucketSort and hash function is x/3;
 * @param datas
 * @returns {undefined}
 */
function bucketSort(datas) {
  var bucketsCount = 5,
			buckets = {},
		 	len = datas.length,
		 	result = [];

  // create hash function
  function hashFun(x) {
    return Math.floor(x / 3);
  }

  // create buckets 
  for (var i = 0; i < bucketsCount; i++) {
    buckets[i] = [];
  }

	// According to hashFun, we can distruibute data to buckets
  for (var k = 0; k < len; k++) {
    buckets[hashFun(datas[k])].push(datas[k]);
  }

  Object.keys(buckets).forEach((key) => {
 // By default the sort in js is elements alphabetically. so we must add sort function.
    buckets[key].sort((a, b) => {
      return a - b
    });
    console.log(buckets[key]);
    buckets[key].forEach((value) => {
      result.push(value)
    });
  })

  console.log(result);
}

bucketSort([7, 5, 9, 2, 10, 1, 8]);

```

## 參考資料
* [https://zh.wikipedia.org/wiki/%E6%A1%B6%E6%8E%92%E5%BA%8F](https://zh.wikipedia.org/wiki/%E6%A1%B6%E6%8E%92%E5%BA%8F)
* [https://en.wikipedia.org/wiki/Bucket_sort](https://en.wikipedia.org/wiki/Bucket_sort)