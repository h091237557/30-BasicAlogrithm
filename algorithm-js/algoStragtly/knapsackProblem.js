debugger;
var items = [{
	w: 2,
	v: 3
}, {
	w: 1,
	v: 2
}, {
	w: 3,
	v: 4
}, {
	w: 2,
	v: 2
}];

function Array2DVar(x, y) { // 定義二維陣列原型
	this.length = x;
	this.x = x; // x 維度長度
	this.y = y; // y 維度長度
	for (var i = 0; i < this.length; i++) // 建立個元素陣列
		this[i] = new Array(y); // this 代表物件本身
}
var temp = new Array2DVar(5, 5);

function dpProcess(items, index, weight) {
	if (temp[index][weight] != null) {
		return temp[index][weight];
	}

	var result = 0;
	if (items.length == index) {
		result = 0;
	} else if (items[index].w > weight) {
		result = dpProcess(items, index + 1, weight);
	} else {
		result = Math.max(dpProcess(items, index + 1, weight), dpProcess(items, index + 1, weight - items[index].w) + items[index].v);
	}
	temp[index][weight] = result;
	return result;
}

function showVector(vector) {
	for (var i = 0; i < vector.x; i++) {
		for (var k = 0; k < vector.y; k++) {
			console.log("("+ i+ ","+ k + ")" + vector[i][k]);
		}
	}

}

console.log(dpProcess(items, 0, 5));
showVector(temp);
