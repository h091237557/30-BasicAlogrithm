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

selectionSort([3,54,24,33,22,58,95,1,2,31])
