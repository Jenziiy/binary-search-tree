import { Tree, prettyPrint, logTraversalSequence } from './index.js';

const driverArr = Array.from({ length: 12 }, () => Math.floor(Math.random() * 100));
let tree = new Tree(driverArr);

prettyPrint(tree.root);
console.log(tree.levelOrder(logTraversalSequence));
tree.insert(7);
prettyPrint(tree.root);
tree.delete(driverArr[4]);
console.log(driverArr);
prettyPrint(tree.root);
tree.find(5);
console.log(tree.find(5));
console.log(tree.inOrder());
console.log(tree.preOrder());
console.log(tree.postOrder());
console.log(tree.getHeight());
console.log(tree.getDepth());
console.log(tree.isBalanced());
tree.insert(5);
tree.insert(18);
tree.insert(100);
tree.insert(200);
console.log(tree.isBalanced());
prettyPrint(tree.root);
console.log(tree.reBalance());
console.log(tree.isBalanced());
