function insertionSort(arr) {
  if (!Array.isArray(arr))
    throw 'elements is not array';

  var len = arr.length;
  var i = 0,
    value = 0;
  for (var pos = 1; pos < len; pos++) {
    i = pos - 1;
		value = arr[pos];
    while (i >= 0 && arr[i] > value) {
      arr[i + 1] = arr[i];
      i--;
    }
    arr[i + 1] = value;
      console.log(arr);
  }
}

insertionSort([3,54,24,33,22,58,95,1,2,31])
