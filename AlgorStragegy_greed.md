# 演算法策略(1)---貪心法

通常當我們遇到一個演算法的問題時，通常都有一些策略可以使用，本篇文章中我們將會說明`貪心法`這種策略。

* 基本概念
* 硬幣問題
*  行程規劃問題
*  字點順序最小問題 

## 基本概念
貪心法在解決問題時，基本上它只會根據當前最好的資料，就做出選擇，如果以心理學的`忍耐實驗`來說明 ; 這個實驗會給一堆小孩 1 塊巧克力，然後和小孩說，如果 15 分鐘後沒有吃掉這巧克力，那你就會有 3 塊巧克力，而貪心演算法它就只會考慮當下最佳解，也就是說它會吃掉巧克力。

簡單用一句話說明貪心法的要義那就是

> 只選擇『當時最佳的選擇』

但是對於一個問題時，我們要著麼知道它是否可用貪心法來解決，以及是否得到問題的最佳解 ?
針對第一個問題『我們著麼知道是否可用貪心法』，我們可以看看問題的性質，如果一個問題，我們可以簡單的猜測一個簡單的計算法方，並且答案正確，那這種類型的問題就適合它 ; 那第二個問題『 是否得到最佳解 』，這就不一定了，我們很難判斷我們用貪心法得出的答案是否是最佳解。

那貪心法適合什麼樣的問題呢 ? 這和上面的問題是不同的喔 ? 上面是問可用，這邊是問適合。貪心法在最優子結構的問題中特別有用，最優子結構的意思就是局部最優解能決定全局最優解。

根據`wiki`，我們可以將使用貪心法的過程分解成以下幾個部份。

>1. 建立數學模型來描述問題。
2. 把求解的問題分成若干個子問題。
3. 對每一個子問題求解，得到子問題的局部最優解。
4. 把子問題的解，合成原來解問題的一個解。

## 實作練習
以下的問題都出自於`培養與鍛鍊程式設計的邏輯腦`這個本書裡，但我們這邊的都會使用`JS`來進行實作。

### 硬幣問題
> 一元、五元、十元、五十元、一百元、五百元硬幣。我們想要儘可能少的硬幣支付 A 元。到底需要幾枚硬幣呢 ? 假設這種付款方式至少會存在一種。

這個問題基本上是貪心法的基本問題，而且也是日常常見的問題。這個問題的重點是『盡可能少的硬幣』，所以很自然的我們直覺會想盡量多付五百，再來是一百，然後已此類推，就可以得到最小的硬幣數量。

程式碼如下，非常的簡單。

```
var coins = [1,5,10,50,100,500];
var pay = 2430;

function greedSol(coins,pay){
	var result = {};
	for (var i=coins.length-1;i>=0;i--){
		var coinNum = Math.floor(pay/coins[i]);	
		pay -= coins[i] * coinNum;
		result[coins[i]] = coinNum;
	}
	return result;
}

console.log(greedSol(coins,pay));

```
輸出結果為。

```
{
  '1': 0, 
  '5': 0, 
  '10': 3, 
  '50': 0, 
  '100': 4, 
  '500': 4 
 }
```

### 行程規劃問題
> 有 n 件工作。各工作分別由時間 Si 開始，並於時間 Ti 結束。你一定要選擇是參加各項工作。如果參加了就一定要全程，另外參加之工作時間不能重疊。

這個問題基本上也很常日常發生，假設我們有一堆事情要做，但我們時間有限，只能選擇幾個來做，那我們要著麼選擇，才能完成最多的事情 ? 

第一版實作程式碼如下，基本的概念就是每次取一工作來做，然後做完後，在取得下一件工作。

```
var tasks = [
{ start: 1, end: 3}, 
{ start: 2, end: 4},
{ start: 4, end: 7},
{ start: 6, end: 8},
{ start: 8, end: 11},
{ start: 12,end: 14}
];

function taskPlanSolv(tasks) {
	var curEnd = 0,
		result = [];
	for (var i = 0; i < tasks.length;i++) {
		if (tasks[i].start > curEnd) {
			curEnd = tasks[i].end;
			result.push(tasks[i]);
		}
	}
	return result;
}
console.log(taskPlanSolv(tasks));

```
執行結果如下，它會取這四件工作來做。

```
[ { start: 1, end: 3 },
  { start: 4, end: 7 },
  { start: 8, end: 11 },
  { start: 12, end: 14 } ]
```

但上述的演算法有個很大的問題，那就是假設我們第一個工作改成以下這樣，那我們會發現，我們輸出的結果是`[ { start: 1, end: 13 } ]`，那這樣就錯了，我們要的是能做最多工作的演算法。

```
 { start:1 , end : 13 }
```

所以我們這邊要在上述演算法中修改成如下的目的。

> 從以可以選擇的工作中不斷選擇結束時間最早的工作。

更改後的程式碼如下，我們下面改成會先針對結束時間，將`task`進行排序，然後在進行工作選取，這樣就完成囉。

```
var tasks = [
{ start: 1, end: 13}, 
{ start: 2, end: 4},
{ start: 4, end: 7},
{ start: 6, end: 8},
{ start: 8, end: 11},
{ start: 12,end: 14}
];

function taskPlanSolv(tasks) {
	var curEnd = 0,
		result = [];
	tasks = sortTaskByEndTime(tasks);
	for (var i = 0; i < tasks.length; i++) {
		if (tasks[i].start > curEnd) {
			curEnd = tasks[i].end;
			result.push(tasks[i]);
		}
	}
	return result;
}

function sortTaskByEndTime(tasks) {
	return tasks.sort(function(a, b) {
		return a.end > b.end;
	});
}
```
執行結果如下。

```
var tasks = [
{ start: 2, end: 4},
{ start: 6, end: 8},
{ start: 12,end: 14}
];
```

### 字典順序最小問題 
這個問題是`POJ 3617`的`Best Cow Line`問題，它的問題如下。以下中文範例[來源為此](http://www.cnblogs.com/Simon-X/p/5309380.html)。

> FJ打算带他的N（1 ≤ N ≤ 2,000）头奶牛去参加"Farmer of the Year"比赛。在这个比赛中每个农夫都会把他们的奶牛排成一队，然后经过评审团。
> 
> 比赛方今年采用了一种新的登记方案：每头牛的出场都以名字首字母进行简要登记（换句话说，如果FJ带了Bessie、Sylvia和Dora参加，那么他只要登记成BSD）。登记结束后，每组评判根据奶牛名字首字母串字典序升序评判。
> 
> FJ今年事特多又得赶回农场，想早点完事。因此他决定在登记前把已经排好队的奶牛重排一遍。
> 
> FJ找了块地给比赛的奶牛排新队伍。接着他不断把第一头或最后一头牛从旧（或者剩下的）队伍转移到新队伍的尾部。搞定后，FJ会用这个新队伍登记。
> 
> 给你这群奶牛的大写字母，找出上述方法排列后字典序最小的字符串。

對真的很長，然後我們整理一下，大概可以簡單的變成如下的問題。

> 給定 N 個字完的字串 S ，並建立 N 個字元的字串 T ，然後它從 S 的`開頭或尾端`刪除一個字元，並將之新增至 T 尾端，並使 T 以字典排序儘可能地小。

上面就是我們要實作的演算法，我們先說一下字典排序的意思，例如假設我們有以下的字詞。

```
BAC
ACE
ABF
BCA
```
根據字典排序並且盡可能小的規則，會排序成如下。其中如果第一個字元相同，那就在比第二個字元，第二個字元相同就比第三個，以此類推，這就是`字典排序`。

```
ABF
ACE
BAC
BCA
```

然後我們來說明演算法的流程，假設我們有`ACDBCB`字元 N ，然後我們根據以上的規則，選擇`開頭或尾端`的值，新增到一個新字串 T 上，然後這新字串的字典排序會儘可能的小，我們的流程如下。

 * Step1. `ACDBCB`，頭與尾比`A`比`B`小，新增進T字串，T 字串為`A`。
 * Step2. `CDBCB`，頭與尾比`C`比`B`大，所以`B`新增進T字串，T 字串為`AB`。
 * Step3. `CDBC`，頭與尾比`C`等於`C`，隨便取一個，就取前好了，T 字串為`ABC`。
 * Step4. `DBC`，頭與尾比`D`比`C`大，所以`C`新增至T字串，T 字串為`ABCC`。
 * Step5. `DB`，頭與尾比`D`比`B`大，所以`B`新增至T字串，T 字串為`ABCCB`。
 * 最後結果就為`ABCCBD`。

這就是很典形的貪心演算法的問題，不斷的取開頭或字尾較小字元加到 T 內，它不會在意之後的解如何，只會取當前最有利的值。

我們實作的程式碼如下。

```
debugger;
var N = "ACDBCB";

function bestCowLineSolve(text) {
	var leftPosition = 0,
		rightPosition = text.length - 1,
		result = [],
		textLen = text.length;

	while (textLen > 0) {
		let leftChar = text[leftPosition];
		let rightChar = text[rightPosition];

		if (leftChar < rightChar) {
			result.push(leftChar);
			leftPosition++;
		} else  {
			result.push(rightChar);
			rightPosition--;
		} 
		textLen--;
	}
	return result;
}

console.log(bestCowLineSolve(N));

```
輸出結果如下。

```
[ 'A', 'B', 'C', 'B', 'C', 'D' ]
```
但我們發現到一個問題，我們上面在說明演算法的流程結果為`ABCCBD `，而我們實作寫的程式碼結果為`ABCBCD`，問題是出在那 ? 

答案是在`Step3`由於兩邊相同，所以我們隨便取了`頭`，而實作演算法我們則取`尾`，所以才導至結果不同。但這兩個字串很明顯的在字典排序時`ABCBCD`才是較小的，那著麼時我們要如何修改我們的演算法呢 ? 

答案是遇到相同的，例如上例`CDBC`時，我們會產生針對`CDBC`取名為`N`與相反的`CBDC`取名為`N'`進行字典排序，如果`N`小於`N'`時，則從`N`的開頭取字元新增至新字串，而反之則取`N'`的開頭字元新增至新字串。

所以說如果是`CDBC`與`CBDC`這例子，我們會取`CBDC`這字串的開頭，這樣我們的結果就是正確的`ABCBCD`了。

修正後程式碼如下。

```
debugger;
var N = "ACDBCB";

function bestCowLineSolve(text) {
	var leftPosition = 0,
		rightPosition = text.length - 1,
		result = [],
		textLen = text.length,
		tempStr = text;

	while (textLen > 0) {
		let leftChar = text[leftPosition];
		let rightChar = text[rightPosition];
		if(textLen == 1){
			result.push(leftChar);
			textLen--;
			break;
		}

		if (leftChar < rightChar) {
			result.push(leftChar);
			leftPosition++;
			tempStr = tempStr.substr(leftPosition, textLen);
		} else if (rightChar < leftChar) {
			result.push(rightChar);
			rightPosition--;
			tempStr = tempStr.substr(0, rightPosition);
		} else {
			let reverseStr = tempStr.split("").reverse().join("");
			if (reverseStr < tempStr) {
				result.push(reverseStr[0]);
				rightPosition--;
				tempStr = tempStr.substr(0, rightPosition);
			} else {
				result.push(tempStr[0]);
				leftPosition--;
				tempStr = tempStr.substr(leftPosition, textLen);
			}

		}
		textLen--;
		console.log(tempStr);
	}
	return result;
}

console.log(bestCowLineSolve(N));

```

## 參考資料
* [http://www.cnblogs.com/Simon-X/p/5309380.html](http://www.cnblogs.com/Simon-X/p/5309380.html)
* [https://zh.wikipedia.org/wiki/%E8%B4%AA%E5%BF%83%E6%B3%95](https://zh.wikipedia.org/wiki/%E8%B4%AA%E5%BF%83%E6%B3%95)
* [http://www.csie.ntnu.edu.tw/~u91029/KnapsackProblem.html](http://www.csie.ntnu.edu.tw/~u91029/KnapsackProblem.html)