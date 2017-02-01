debugger;

/**
 * swap
 * swap datas location , ex [1,2] => swap(datas,0,1) => [2,1] 
 * @param datas
 * @param i
 * @param j
 * @returns {undefined}
 */
function swap(datas, i, j) {
  var temp = datas[i];
  datas[i] = datas[j];
  datas[j] = temp;
}

/**
 * maxHeapIfy
 * Create the max heap like this 
 * 		6
 * 	4		5
 * 1 2  3
 *
 * @param datas
 * @param root
 * @param length
 * @returns {undefined}
 */
function maxHeapIfy(datas, root, length) {
  var leftChild = root * 2 + 1;
  var rightChild = root * 2 + 2;
  var maxNode = -1;

  // 如果左邊的子節點，大於父節點，則最大node設為左邊子節點
  if (leftChild < length && (datas[leftChild] > datas[root])) {
    maxNode = leftChild;
  } else {
    maxNode = root;
  }

  // 如果右邊的子節點，大於父節點，則最大node設為右邊子節點
  if (rightChild < length && (datas[rightChild] > datas[maxNode])) {
    maxNode = rightChild;
  }

  if (maxNode != root) {
    swap(datas, root, maxNode);
    maxHeapIfy(datas, maxNode, length);
  }
}

/**
 * heapSort
 * heap sort datas
 * @param datas
 * @returns {undefined}
 */
function heapSort(datas) {
  var start = Math.floor(datas.length / 2) - 1,
			len = datas.length;
  for (var i = start; i >= 0; i--) {
    maxHeapIfy(datas, i, datas.length);
  }

	for (var j = len-1;j >=0;j--){
		swap(datas,0,j);	
		maxHeapIfy(datas,0,j);
		console.log(datas);
	}
}

var datas = [8, 11, 9, 2, 10, 16];

heapSort(datas);
