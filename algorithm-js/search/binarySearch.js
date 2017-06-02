function binarySearch(datas, low, heigh, target) {
	let mid = Math.ceil((low + heigh) / 2) ;
	if (datas[mid] == target) {
		return	datas[mid];
	} else if (datas[mid] > target) {
		return binarySearch(datas, 0, mid, target);
	} else if (datas[mid] > target) {
		return binarySearch(datas,mid,datas.length,target);
	}
}

var datas = [1,2,3,4,5,6,7,8,9];

var result = binarySearch(datas,0,datas.length-1,2);
