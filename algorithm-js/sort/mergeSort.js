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
var datas = [2,1,7,3,4,5,9,10];
console.log(datas);
mergeSort_BottomUp(datas);
//mergeSort_TopDowan([2, 1, 3, 8, 5, 7]);
