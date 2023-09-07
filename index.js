import Tree from './src/Tree.js';
import prettyPrint from './src/prettyPrint.js';

const dataArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(dataArray);
tree.insert(22);
tree.delete(6345);
prettyPrint(tree.root);