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
