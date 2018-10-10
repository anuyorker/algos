class BST {
  constructor (value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  insert (value) {
    // Recursive Insert: Time O(n) worst / O(log(n)) avg | Space O(n) worst / O(log(n)) avg
    if (value < this.value) {
      if (this.left !== null) {
        this.left.insert(value);
      } else {
        this.left = new BST(value);
      }
    } else {
      if (this.right !== null) {
        if (this.right !== null) {
          this.right.insert(value);
        } else {
          this.right = new BST(value);
        }
      }
    }
    return this;
  }

  contains (value) {
    // Recursive Contains: Time O(n) worst / O(log(n)) avg | Space O(n) worst / O(log(n)) avg
    if (value < this.value) {
      if (value.left === null) {
        return false;
      } else {
        return this.left.contains(value);
      }
    } else if (value > this.value) {
      if (value.right === null) {
        return false;
      } else {
        return this.right.contains(value);
      }
    } else {
      return true;
    }
  }

  remove (value, parent = null) {
    // Recursive Remove: Time O(n) worst / O(log(n)) avg | Space O(n) worst / O(log(n)) avg
    if (value < this.value) {
      if (this.left !== null) {
        this.left.remove(value);
      }
    } else if (value > this.value) {
      if (this.right !== null) {
        this.right.remove(value);
      }
    } else {
      if (this.left !== null && this.right !== null) {
        // two child nodes
        this.value = this.right.getMinValue();
        this.right.remove(this.value);
      } else if (parent === null) {
        // root node
        if (this.left !== null) {
          this.value = this.left.value;
          this.left = this.left.left;
          this.right = this.left.right;
        } else if (this.right !== null) {
          this.value = this.right.value;
          this.left = this.right.left;
          this.right = this.right.right;
        } else {
          this.value = null;
        }
      } else if (parent.left === this) {
        // this is a left child
        parent.left = this.left !== null ? this.left : this.right;
      } else if (parent.right === this) {
        // this is a right child
        parent.right = this.left !== null ? this.left : this.right;
      }
    }
    return this;
  }

  getMinValue () {
    // O(h), aka the height of the tree, assuming tree is balanced (?)
    if (this.left === null) {
      return this.value;
    } else {
      return this.left.getMinValue();
    }
  }

  // DEPTH FIRST BST TRAVERSALS
  inOrderTraversal () {
    // Recursive inorder traversal: Time O(n) | Space O(n)
    // bc visiting every node and making recursive calls at almost every node
    const output = [];
    if (this.left !== null) this.left.inOrderTraversal();
    output.push(this.value);
    if (this.right !== null) this.right.inOrderTraversal();
  }

  preOrderTraversal () {
    // Recursive inorder traversal: Time O(n) | Space O(n)
    const output = [];
    output.push(this.value);
    if (this.left !== null) this.left.inOrderTraversal();
    if (this.right !== null) this.right.inOrderTraversal();
  }

  postOrderTraversal () {
    // Recursive inorder traversal: Time O(n) | Space O(n)
    const output = [];
    if (this.left !== null) this.left.inOrderTraversal();
    if (this.right !== null) this.right.inOrderTraversal();
    output.push(this.value);
  }
}
