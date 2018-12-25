function mergeSort(arr) {
  const length = arr.length;

  if (length < 2) {
    return arr;
  }

  const middle = Math.floor(length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  const results = [];

  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      results.push(left.shift());
    } else {
      results.push(right.shift());
    }
  }

  return results.concat(left, right);
}

mergeSort([7, 4, 1, 6, 7, 1, 4, 7, 5, 2]);
// [1, 1, 2, 4, 4, 5, 6, 7, 7, 7]