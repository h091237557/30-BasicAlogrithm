debugger;
/**
 * quickSort
 * This method is easy , but it need more space , not good ~
 * @param datas
 * @returns {undefined}
 */
function quickSort_space(datas) {
  if (datas.length <= 1)
    return datas.slice(0);

  var len = datas.length,
    left = [],
    right = [],
    privot = [datas[0]];

  for (var i = 1; i < len; i++) {
    if (datas[i] < privot[0]) {
      left.push(datas[i]);
    } else {
      right.push(datas[i]);
    }
  }
  console.log("right : " + right);
  console.log("left :" + left);
  return quickSort_space(left).concat(privot.concat(quickSort_space(right)));
}

//console.log(quickSort_space([5, 3, 7, 4, 1, 9, 8, 6, 2]));


function swap(datas, i, j) {
  var temp = datas[i];
  datas[i] = datas[j];
  datas[j] = temp;
}

/**
 * quickSort_inPlace
 * This method is better than quickSort_space
 * @param datas
 * @param left
 * @param right
 * @returns {undefined}
 */
function quickSort_inPlace(datas, left, right) {
  if (left < right) {
    var i = left,
      j = right + 1,
      len = datas.length;
    while (true) {

      while (i + 1 < len && datas[++i] < datas[left]) {};

      while (j - 1 > -1 && datas[--j] > datas[left]);

      if (i >= j)
        break;
      swap(datas, i, j);
    }
    swap(datas, left, j);
    console.log(datas);
    quickSort_inPlace(datas, left, j - 1);
    quickSort_inPlace(datas, j + 1, right);
  }
}

//quickSort_inPlace([39, 15, 37, 89, 45, 20, 32, 51], 0, 7);

quickSort_inPlace([45,89,51], 0, 2);
