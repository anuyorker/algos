/* Binary Tree DFS and BFS
BFS (level order traversal)
- O(n^2) solution uses a printGivenLevel function and a printLevelOrder function which uses the former.
- O(n) solution uses a queue (where n is number of nodes in the binary tree)

DFS (3 types):
- inorder traversal
- preorder traversal
- postorder traversal
*/

/* Tree BFS
Approach: Queue (FIFO)
For each node, first node is visited
and then its child nodes are put in a FIFO queue

printLevelOrder (tree)
  1) create an empty queue q
  2) temp node = root // start from root
  3) Loop while temp_node is still null
    a) print temp_node.data
    b) Enqueue temp_node's children (first left then right) to q
    c) Dequeue a node from q and assign its value to temp_node

 Time: O(n), where n is the number of nodes in the binary tree
 Space: O(n), for same reason
*/
class Node {
  constructor (key) {
    this.data = key;
    this.left = null;
    this.right = null;
  }
}

const printLevelOrder = root => {
  if (root === null) {
    // base case
    return;
  }

  const queue = []; // create empty queue for level order traversal
  queue.push(root); // enqueue root and initialize height

  while (queue.length > 0) {
    // print front of queue and remove it from queue
    console.log(queue[0].data);
    const node = queue.shift(); // note: queue.pop() would take from end of queue, not the front, so we use shift()

    // enqueue left child
    if (node.left !== null) {
      queue.push(node.left);
    }
    // enqueue right child
    if (node.right !== null) {
      queue.push(node.right);
    }
  }
};

const testRoot = new Node(1);
testRoot.left = new Node(2);
testRoot.right = new Node(3);
testRoot.left.left = new Node(4);
testRoot.left.right = new Node(5);

console.log('Level Order Traversal of binary tree is -');
printLevelOrder(testRoot);

/* Graph DFS and BFS */
