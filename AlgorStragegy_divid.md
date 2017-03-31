# 演算法策略(2)---分治法

在解決一個問題時，有一種很常見的方法，那就是將這個問題，分成很多個小問題，然後將所以小問題全部解決，最後可以合成一個解答。這種將問題分割變小，再將小變回大的方法，在計算機科學中成為`分治法`。

## 分治法適用的情況
但並不是所有問題都適合分治法，有以下特性的問題才可以使用。

* 問題的規模可小到一定的程式就可以容易解決。
* 問題可以分解為若干個規模較小的相同問題，該問題有最優子結構性質，最優子結構的意思就是局部最優解能決定全局最優解。(同貪心法)
* 可使用這個問題分解出的子問題的解，合併成該問題的解。
* 這個問題的子問題都是獨立的。

## 分治法的方法
要用分治法來解決一個問題，通常會有以下的步驟。

1. 分解 : 將大問題分解成小問題。
2. 解決 : 將每個小問題解決。
3. 合併 : 將每個子問題的解合併為原問題的解。

分治法基本上的手段是『遞迴』，也就是自已呼叫自已的意思。

## 實作練習
以下的問題都出自於`培養與鍛鍊程式設計的邏輯腦`這個本書裡或leetcode中找到的，但我們這邊的都會使用`JS`來進行實作。

### 最大子序列問題 (Maximum Subarray)
最大子序列是個經典的問題，它的問題定義如下。

> 在一個包含正負值的陣列中，尋找一段連續的元素總合『最大』的區間。

例如假設我們有陣列`[1,5,-8,7,4,1,-9,6]`，所以這時我們的最大子序列就為`7、4、1`。

這邊的解法基本概念如下圖，它會將陣列分成兩塊，並且最大子區塊有可能會落在左邊區塊、中間跨陣列區塊、右邊區塊，而每個區塊又可以在繼續切分成三塊，這樣就可以使用遞回取出，每塊最大子區間，最後再將結果組合起來就ok囉。以下是程式碼。`maxCrossover`是用來尋找中間那塊的最大子區塊值。

![](http://yixiang8780.com/outImg/20170324-1.png)

```
function maxSubarrary(datas, start, end) {
	if (start == end) {
		return datas[start];
	} else {
		let middle = Math.floor((start+end)/2);
		console.log("startM:" + start + " middleM:"+middle + " end :" + end);
		return Math.max(maxSubarrary(datas,start,middle),maxSubarrary(datas,middle+1,end),maxCrossover(datas,start,middle,end));		
	}
}

function maxCrossover(datas,start,middle,end){
	var currentLeftSum =0;
	var leftSum = 0;
	var currentRightSum =0;
	var rightSum=0;

	for (var i=middle+1;i<=end;i++){
		currentRightSum += datas[i];
		if(currentRightSum > rightSum){
			rightSum = currentRightSum;
		}
	}
	for (var k=middle;k>=start;k--){
		currentLeftSum += datas[k];
		if(currentLeftSum > leftSum){
			leftSum = currentLeftSum;
		}
	}
	let test = rightSum+leftSum;
	console.log("!!!! start:" + start + " end:" + end + " middle"+middle+" : "+ test);
	return rightSum + leftSum;
}


var datas = [1,5,-8,7,4,1,-9,6];
console.log(maxSubarrary(datas,0,datas.length-1));

```

然後我們來研究看看輸出的結果和他的過程。

```
startM:0 middleM:3 end :7
startM:0 middleM:1 end :3
startM:0 middleM:0 end :1
!!!! start:0 end:1 middle0 : 6
startM:2 middleM:2 end :3
!!!! start:2 end:3 middle2 : 7
!!!! start:0 end:3 middle1 : 6
startM:4 middleM:5 end :7
startM:4 middleM:4 end :5
!!!! start:4 end:5 middle4 : 5
startM:6 middleM:6 end :7
!!!! start:6 end:7 middle6 : 6
!!!! start:4 end:7 middle5 : 5
!!!! start:0 end:7 middle3 : 12
```
前三行就是說明程式碼會先將左半邊的`1、5、-8、7`一直進行切割，也就是下面這段程式碼的第一個`maxSubarrary(datas,start,middle)`，它會一直遞回進去，然後直到切分到`1、5`時，會執行到`maxCrossover`，它會輸出最大交互子區塊`6`，也就是第四行的結果。所以在`1、5`這兩個陣列的最大子區間為`1、5`，因為相加為`6`大於個別的`1`與`5`。

```
let middle = Math.floor((start+end)/2);
Math.max(maxSubarrary(datas,start,middle),maxSubarrary(datas,middle+1,end),maxCrossover(datas,start,middle,end));
```

然後處理完`1、5`後，就來處理`-8、7`，根據上述的流程，它會取得最大子取間為`7`，因為它比`-8`和`-8、7`這兩個還大。

在來處理`1、5、-8、7`，由於上述流程，我們已經計算出兩邊`1、5`與`-8、7`的最大子區間分別為`1、5`與`7`，這時我們還要計算誇兩邊的子區間，這邊我們計算出的結果為`1、5`，這時我們可以根據這三個區間`[1,5]、[7]、[1,5]`，取這三個中最大值的那個，來當做`1,5,-8,7`區間的最大子區間，因為我們取了`[7]`。

右邊區塊的`[4,1,-9,6]`也可以用上述方法，一樣求出最大子區塊為`[6]`，最後我們左邊最大子區間為`[7]`，右邊最大子區間為`[6]`，而我們這邊還要計算交互區間的最大子區間，我們取出`[7,4,1]`，然後再將這三個區間進行比較，因為我們這個陣列的最大子區間為`[7,4,1]`。
