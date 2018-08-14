// Method 1 (suboptimal - making multiple array copies)
// time: O(nlog(n)) | space: O(nlog(n))
function mergeSort (array) {
  if (array.length === 1) return array; // base case
  const middleIdx = Math.floor(array.length / 2);
  const leftHalf = array.slice(0, middleIdx);
  const rightHalf = array.slice(middleIdx + 1);

  // return the two sorted halves using helper method and recursive calls on left and right
  return mergeSortedArrays(mergeSort(leftHalf), mergeSort(rightHalf));
}

// helper method
function mergeSortedArrays (leftHalf, rightHalf) {
  const sortedArray = new Array(leftHalf.length + rightHalf.length).fill(null);
  let k = 0,
    i = 0,
    j = 0;

  // while we're still dealing with a pointer in the left half...
  while (i < leftHalf.length && j < rightHalf.length) {
    /* if the number in the left half (at index i) is smaller than or equal to the corresponding number at index j in the right half, then make the number in the sorted array at index k equal to the left number, otherwise the number at index k in our sorted array should be equal to the right half */
    if (leftHalf[i] <= rightHalf[i]) {
      sortedArray[k] = leftHalf[i];
      i++;
    } else {
      sortedArray[k] = rightHalf[j];
      j++;
    }
    /* in either case, we have to increment k bc we just filled up something in the sorted array */
    k++;
  }
  // if we still have numbers in the left half but not right
  while (i < leftHalf.length) {
    sortedArray[k] = leftHalf[i];
    i++;
    k++;
  }
  // if we still have numbers in the right half but not left
  while (j < rightHalf.length) {
    sortedArray[k] = rightHalf[j];
    j++;
    k++;
  }
  return sortedArray;
}

// Method 2 (optimal) - sorting in place
// time: O(nlog(n)) | space: O(n)
function mergeSortBetter (array) {
  // base case: if given array of length 1 or smaller, return the array
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray);
  return array; // return sorted version
  // NOTE: we call mergeSortHelper with the first main array as our input array and the first auxiliary array as our auxiliary array
  // so in the first call to mergeSortHelper above, when we call doMerge, we pass in the main array to be the main array
}

function mergeSortHelper (mainArray, startIdx, endIdx, auxiliaryArray) {
  // we're not creating copies, no need to return values
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  // make two calls to mergeSortHelper, passing in the main array as the auxiliary array and vice versa (swapped to prevent overwriting)
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray);
  doMerge(mainArray, startIdx, middleIdx, endIdx);
}

function doMerge (mainArray, startIdx, middleIdx, endIdx, auxiliaryArray) {
  let k = startIdx, // start at first index of first (left) subarray
    i = startIdx,
    j = 0; // first index of second (right) subarray

  while (i <= middleIdx && j <= endIdx) {
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      mainArray[k] = auxiliaryArray[i];
      i++;
    } else {
      mainArray[k] = auxiliaryArray[j];
      j++;
    }
    k++;
  }
  while (i <= middleIdx) {
    mainArray[k] = auxiliaryArray[i];
    i++;
    j++;
  }
  while (j <= endIdx) {
    mainArray[k] = auxiliaryArray[j];
    i++;
    j++;
  }
  // do not return an array bc we're already sorting the main array
}
