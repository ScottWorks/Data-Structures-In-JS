# Algorithms

## Sorting

### Bubble Sort

The Bubble Sort algorithm is possibly the simplest sorting algorithm however it is also one of the worst performers with an average of O(n^2) comparisons for n items.

This method simply swaps the adjacent elements depending on whether the array is being sorted in ascending or descending order.

#### Visualization

Take an array of numbers " 6 5 3 1 8 7 2 4", and sort the array from lowest number to greatest number using bubble sort (in-place).

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

Quick Sort is better performing than the bubble sort method that on average requires O(nlog(n)) comparisions for n elements (O(n^2) worst case).

This method is considered a divide and conquer algorithm that cuts the list (array, collection, etc) into two subsets (low and high elements). In general the steps to quick sort are as follows:

1. An element called a pivot is chosen in the list.
2. The list is reordered such that all elements less than the pivot are placed before it (low elements) and all elements with a value greater are placed after (high elements).
3. Recursively apply step 2 to the subarray of low and high elements. The base case is always list.size === 0 or 1.

It should be noted that the pivot selection and partitioning steps can be done in different ways that can greatly impact the algorithms performance.

#### Visualization

Take an array of numbers " 6 5 3 1 8 7 2 4", and sort the array from lowest number to greatest number using quick sort.

![fig2](/Algorithms/images/fig2.gif)

#### Implementation

```js
function quickSort(arr) {
  if (arr.length <= 1) return arr;

  const pivot = arr[arr.length - 1];
  const left = [];
  const right = [];

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}

quickSort([1, 6, 7, 1, 3, 4, 6, 1]);
// [1, 1, 1, 3, 4, 6, 6, 7]
```

### Merge Sort

Out of the three sorting algorithms discussed here Merge Sort is the most efficient with an average and worst case of O(nlog(n)) comparisons for n items. We can implement this technique following the steps below:

1. Divide the list into `n` subsets until each subset contains one element.
2. Recursively merge subsets to produce a new sorted list a single list remains.

#### Visualization

![fig3](/Algorithms/images/fig3.gif)

#### Implementation

```js
function mergeSort(arr) {
  if (arr.length < 2) {
    return arr;
  }
  const length = arr.length;
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
```

## Search

### Binary Search

## References

- [Four Semester of CS in 6 Hours](http://btholt.github.io/four-semesters-of-cs/)
- [Bubble Sort - Wikipedia](https://en.wikipedia.org/wiki/Bubble_sort)
- [Quick Sort - Wikipedia](https://en.wikipedia.org/wiki/Quicksort)
- [Merge Sort](https://www.hackerearth.com/practice/algorithms/sorting/merge-sort/tutorial)
