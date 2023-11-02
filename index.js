class Node {
  constructor(data, leftChild = null, rightChild = null){
    this.data = data;
    this.leftChild = leftChild;
    this.rightChild = rightChild;
  }
}

class Tree {
  constructor(arr){
    this.arr = [...new Set(arr)].sort((a, b) => a - b);
    this.root = this.buildTree(this.arr, 0, this.arr.length - 1);
  }

  buildTree(arr, start, end) {
    if (start > end) return null;
    const mid = Math.floor((start + end) / 2);
    const node = new Node(arr[mid]);

    node.leftChild = this.buildTree(arr, start, mid - 1);
    node.rightChild = this.buildTree(arr, mid + 1, end);
    return node;
  }

  insert(data){
    let node = new Node(data);
    let prev = this.root;
    let curr = this.root;

    while(curr){
      if (data < curr.data){
        prev = curr;
        curr = curr.leftChild;
      } else {
        prev = curr;
        curr = curr.rightChild;
      }
    }
    curr = node;
    if (prev.data < curr.data) {
      prev.rightChild = curr;
    } else {
      prev.leftChild = curr;
    }
  }

  delete(data, root = this.root) {

    if( root === null) return root;

      if (data < root.data) { root.leftChild = this.delete(data, root.leftChild);
      } 
      else if (data > root.data) {
        root.rightChild = this.delete(data, root.rightChild);
      } else {
        if (root.leftChild === null && root.rightChild === null) return null;
        if (root.leftChild === null) return root.rightChild;
        if (root.rightChild === null) return root.leftChild;
        
        while(root.rightChild && root.rightChild.leftChild !== null){
          root.rightChild = root.rightChild.leftChild;
        }
        let tmp = root.rightChild;
        root.data = tmp.data;
        root.rightChild = this.delete(tmp.data, root.rightChild);
      }
  }
  find(data) {
    let curr = this.root;

    while (curr) {
      if (data < curr.data) {
        curr = curr.leftChild;
      } else if (data > curr.data) {
        curr = curr.rightChild;
      } else {
        return curr;
      }
    }
    return null;
  }

  // levelOrder(root = this.root, cb = null){
  //   let rootNode = root;
  //   let queueArr = [];
  //   let outputArr = [];

  //   if(rootNode == null) return null;
  //   outputArr.push(rootNode.data);
  //   queueArr.push(rootNode.leftChild);
  //   queueArr.push(rootNode.rightChild);
  //   rootNode = queueArr[0];
  //   queueArr.shift();
  //   this.levelOrder(rootNode);
  //   return outputArr;
  // }

  levelOrder(cb = null){
    const queue = [];
    const output = [];
    let count = 0;
    queue.push(this.root);
    while(queue.length !== 0){
      count ++;
      let dequeuedNode = queue.shift();
      if (cb !== null) cb(dequeuedNode, count);
      output.push(dequeuedNode.data);
      if(dequeuedNode.leftChild !== null) queue.push(dequeuedNode.leftChild);
      if(dequeuedNode.rightChild !== null) queue.push(dequeuedNode.rightChild);
    }
    return output;
  }

  inOrder(arr = [], root = this.root){

    if (root === null) return;

    this.inOrder(arr, root.leftChild);
    arr.push(root.data);
    this.inOrder(arr, root.rightChild);

    return arr;
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.rightChild !== null) {
    prettyPrint(node.rightChild, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.leftChild !== null) {
    prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

let arrTree = [1, 2, 3, 4, 5, 6, 7];
let tree = new Tree(arrTree);

//prettyPrint(tree.root);
//tree.insert(7);
// prettyPrint(tree.root);
// tree.delete(4);
// prettyPrint(tree.root);
// tree.find(5);
// console.log(tree.find(5));
console.log(tree.inOrder());

console.log(tree.levelOrder(logTraversalSequence));

function logTraversalSequence(node, sequence){
console.log(`Traversal nr ${sequence } = ${node.data}`)
}
