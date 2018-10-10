// Problem: find closest value in BST
// logic similar to logic in insertion/searching/removal

// Recursive Approach
// Average: O(log(n)) time | O(log(n)) space
// Worst: O(n) time | O(n) sapce
// => Worst case time and space is O(n) when we have a tree that only has one branch, eliminating the halving benefit of a balanced BST
// => We use up space because of frames on the call stack with recursion
function findClosestValueInBst (tree, target) {
  // call recursive helper method initializing closest to Infinity
  return findClosestValueInBstHelper(tree, target, (closest = Infinity));
}

function findClosestValueInBstHelper (tree, target, closest) {
  // base case - reaching the bottom of BST or a leaf
  if (tree === null) {
    return closest;
  }
  if (diff(closest, target) > diff(tree.value, target)) {
    closest = tree.value;
  }
  if (target < tree.value) {
    return findClosestValueInBstHelper(tree.left, target, closest);
  } else if (target > tree.value) {
    return findClosestValueInBstHelper(tree.right, target, closest);
  } else {
    return closest; // you've found the exact value (closest possible)
  }
}

// Iterative Approach
// Average: O(log(n)) time | O(1) space
// Worst: O(n) time | O(1) space
// => space is O(1) in average and worst case bc all we're storing is our closest value and the current node's value
// function findClosestValueInBstHelper (tree, target, closest) {
//   let currNode = tree;
//   while (currNode !== null) {
//     // while not dealing with a leaf
//     if (diff(closest, target) > diff(currNode.value, target)) {
//       closest = currNode.value;
//     }
//     if (target < currNode.value) {
//       currNode = currNode.left;
//     } else if (target > currNode.value) {
//       currNode = currNode.right;
//     } else {
//       break;
//     }
//   }
//   return closest;
// }

// helper function to calculate absolute difference
const diff = (n1, n2) => Math.abs(n1 - n2);
