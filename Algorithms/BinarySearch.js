function binarySeach(arr, target) {
  const length = arr.length;
  const middle = Math.floor(length / 2);

  if (length <= 1 && arr[middle] !== target) return false;
  else if (target < arr[middle])
    return binarySeach(arr.slice(0, middle), target);
  else if (target > arr[middle]) return binarySeach(arr.slice(middle), target);
  else return true;
}

binarySeach([0, 4, 7, 10, 14, 23, 45, 47, 53], 4);
// true

binarySeach([0, 4, 7, 10, 14, 23, 45, 47, 53], 24);
// false
