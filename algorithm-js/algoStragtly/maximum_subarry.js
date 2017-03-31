debugger;
function maxSubarrary(datas, start, end) {
	if (start == end) {
		return datas[start];
	} else {
		let middle = Math.floor((start+end)/2);
		console.log("startM:" + start + " middleM:"+middle + " end :" + end);
		return  Math.max(maxSubarrary(datas,start,middle),maxSubarrary(datas,middle+1,end),maxCrossover(datas,start,middle,end));		
		return result;
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
