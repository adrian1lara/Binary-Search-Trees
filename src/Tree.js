import Node from './Node.js';

class Tree {
    constructor(dataArray) {
        this.root = this.buildTree(dataArray);
    }

    buildTree(dataArray) {
        if (dataArray.length === 0) {
          return null;
        }
      
        // Remove duplicates and sort the unique values
        const uniqueSortedArray = [...new Set(dataArray)].sort((a, b) => a - b);
      
        const middleIndex = Math.floor(uniqueSortedArray.length / 2);
        const rootNode = new Node(uniqueSortedArray[middleIndex]);
      
        rootNode.left = this.buildTree(uniqueSortedArray.slice(0, middleIndex));
        rootNode.right = this.buildTree(uniqueSortedArray.slice(middleIndex + 1));
      
        return rootNode;
    }

    insert(data) {
        this.root = this._insertNode(this.root, data);

        return this.root;
    }

    _insertNode(node, data) {
        if(node === null) {
            return new Node(data);
        }
        if(data < node.data) {
            node.left = this._insertNode(node.left, data);
        } else {
            node.right = this._insertNode(node.right, data);
        } 
        return node;
    }

    findMinNode(node) {
        let current = node;
        while (current && current.left !== null) {
          current = current.left;
        }
        return current;
    }
    
    delete(data) {
        this.root = this._deleteRec(this.root, data);
    }
    
    _deleteRec(root, data) {
        if (root === null) {
          return root;
        }
    
        if (data < root.data) {
          root.left = this._deleteRec(root.left, data);
        } else if (data > root.data) {
          root.right = this._deleteRec(root.right, data);
        } else {
          // Node with only one child or no child
          if (root.left === null) {
            return root.right;
          } else if (root.right === null) {
            return root.left;
          }
    
          // Node with two children: Get the inorder successor (smallest in the right subtree)
          root.data = this.findMinNode(root.right).data;
    
          // Delete the inorder successor
          root.right = this._deleteRec(root.right, root.data);
        }
        return root;
    }

    find(data) {
        return this._find(this.root, data);
    }

    _find(node, data) {
        if(node === null) {
            return null;
        }
        if(data < node.data) {
            return this._find(node.left, data);
        } else if (data > node.data) {
            return this._find(node.right, data);
        } else {
            return node;
        }
    }

    levelOrder(func) {
        this._levelOrder(this.root, func);
    }

    _levelOrder(node, func) {
        if(node === null) {
            return;
        }
        func(node);
        this._levelOrder(node.left, func);
        this._levelOrder(node.right, func);
    }

}

export default Tree

