# Algorithms

## Sorting

### Bubble Sort

The Bubble Sort algorithm is possibly the simplest sorting algorithm however it is also one of the worst performers with an O(n^2) worst case time complexity. This method simply swaps the adjacent elements depending on whether the array is being sorted in ascending or descending order.

Take an array of numbers " 6 5 3 1 8 7 2 4", and sort the array from lowest number to greatest number using bubble sort.

#### Visualization

![fig1](/Algorithms/images/fig1.gif)

#### Implementation

```js
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

bubbleSort([5, 23, 211, 8, 1, 41, 56, 1, 5], 'ascending');
// [ 1, 1, 5, 5, 8, 23, 41, 56, 211 ]

bubbleSort([5, 23, 211, 8, 1, 41, 56, 1, 5], 'descending');
//  [ 211, 56, 41, 23, 8, 5, 5, 1, 1 ]
```

The code above will always have a worst case of O(n^2). It is possible to optimize this method by stopping if the last sweep does not require any elements to be swapped.

```js
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

bubbleSortOptimized([2, 1, 6, 8], 'ascending');
// Count: 1
// [1, 2, 6, 8]

bubbleSortOptimized([2, 1, 6, 8], 'descending');
// Count: 1
// [8, 6, 2, 1]
```

### Quick Sort

### Merge Sort

## Search

### Binary Search
