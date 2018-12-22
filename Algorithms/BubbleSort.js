function bubbleSort(arr, order = '') {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }
  }

  return order === 'descending' ? arr.reverse() : arr;
}

function bubbleSortOptimized(arr, order = '') {
  var swapped = false,
    count = 0;

  for (let i = 0; i < arr.length - 1; i++) {
    swapped = false;
    count++;

    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;

        swapped = true;
      }
    }
    if (swapped) break;
  }

  console.log(`Count: ${count}`);
  return order === 'descending' ? arr.reverse() : arr;
}

bubbleSort([5, 23, 211, 8, 1, 41, 56, 1, 5], 'ascending');
// [ 1, 1, 5, 5, 8, 23, 41, 56, 211 ]

bubbleSort([5, 23, 211, 8, 1, 41, 56, 1, 5], 'descending');
//  [ 211, 56, 41, 23, 8, 5, 5, 1, 1 ]

bubbleSortOptimized([2, 1, 6, 8], 'ascending');
// Count: 1
// [1, 2, 6, 8]

bubbleSortOptimized([2, 1, 6, 8], 'descending');
// Count: 1
// [8, 6, 2, 1]
