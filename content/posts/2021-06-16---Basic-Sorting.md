---
title: Basic Sorting
date: "2021-06-16T06:14:39.920Z"
template: "post"
draft: false
slug: "basic-sorting-algorithm"
category: "Algorithm"
tags:
  - "Algorithm"
  - "Sorting"
description: "Writing basic sorting algorithms in Javascript helps the understanding of sorting algorithms in depth."
socialImage: "/media/42-line-bible.jpg"
---

# Sorting 

## Insertion Sort

- Time Complexity
    - O(n ^ 2)
- Space Complexity
    - O(1)
- Stable

```javascript
function insertionSort(arr, n) { 
    let i, key, j; 
    for (i = 1; i < n; i++) { 
        key = arr[i]; 
        j = i - 1; 
   
        while (j >= 0 && arr[j] > key) { 
            arr[j + 1] = arr[j]; 
            j--; 
        } 
        arr[j + 1] = key; 
    } 
} 
```
[Source](https://www.geeksforgeeks.org/insertion-sort/)

## Bubble Sort

- Time Complexity
    - O(n ^ 2)
- Space Complexity
    - O(1)    
- Stable

```javascript
function bubbleSort(arr, n) {
    let i, j;
    for (i = 0; i < n - 1; i++) {
        for (j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[i], arr[j + 1]] = [arr[j + 1], arr[i]];
            }
        }
    }
}
```
[Source](https://www.geeksforgeeks.org/bubble-sort/)

## Selection Sort

- Time Complexity
    - O(n ^ 2)
- Space Complexity
    - O(1)
- Unstable
    - However, it can be turned into stable sort by swapping the target element with the very first least element(if the sorting condition is ascending order).[reference](https://stackoverflow.com/questions/20761396/why-selection-sort-can-be-stable-or-unstable)

```javascript
function selectionSort(arr,  n) {
    let i, j, minIdx;

    for (i = 0; i < n - 1; i++) {
        minIdx = i;
        for (j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        [arr[minIdx], arr[i]] = [arr[i], arr[minIdx]];
    }
}
```
[Source](https://www.geeksforgeeks.org/selection-sort/)

![Nulla faucibus vestibulum eros in tempus. Vestibulum tempor imperdiet velit nec dapibus](/media/image-3.jpg)

## Quick Sort

- Time Complexity
    - O(n * log n)
    - Worst Case
        - O(n ^ 2)
- Space Complexity
    - O(log n)
- Unstable

```javascript
function partition(array, left, right, compare) {
    let pivot = array[right];
    let i = left - 1;

    for (let j = left; j < right; j++) {
        if (compare(array[j], pivot)) {
            i++;
            swap(array, i, j);
        }
    }

    let pivotPos = i + 1;
    [array[pivotPos], array[right]] = [array[right], array[pivotPos]];

    return pivotPos;
}

function quickSortRecursive(array, left, right, compare) {
    if (left >= right) {
        return;
    }

    const pivotPos = partition(array, left, right, compare);

    quickSortRecursive(array, left, pivotPos - 1, compare);
    quickSortRecursive(array, pivotPos + 1, right, compare);
}

function quickSort(array, compare) {
    quickSortRecursive(array, 0, array.length - 1, compare);
}
```

## Merge Sort

- Time Complexity
    - O(n * log n)
- Space Complexity
    - O(n)
- Stable

```javascript
function merge(arr, l, m, r) {
    let n1 = m - l + 1;
    let n2 = r - m;
 
    var L = new Array(n1);
    var R = new Array(n2);
 
    for (let i = 0; i < n1; i++) {
        L[i] = arr[l + i];
    }
    for (let j = 0; j < n2; j++) {
        R[j] = arr[m + 1 + j];
    }

    let i = 0;
    let j = 0;
    let k = l;
 
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        }
        else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
 
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }
 
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}

function mergeSort(arr,l, r){
    if(l >= r){
        return;
    }

    const m = l + parseInt((r - l) / 2);
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
}
```
[Source](https://www.geeksforgeeks.org/merge-sort/)