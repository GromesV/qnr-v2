let qnr = {
    'name' : 'Pets survey',
    'type' : 'survey',
    'children' : [
        {
            'name' : 'intro1',
            'type' : 'block',
            'children' : [
                {
                    'type' : 'm',
                    'name' : 'q1',
                    'text' : 'what pet you have',
                    'instructions' : 'Select one',
                    'children' : [
                        {
                            'type' : 'ans',
                            'code' : 1,
                            'text' : 'dog'
                        },
                        {
                            'type' : 'ans',
                            'code' : 2,
                            'text' : 'cat'
                        }
                    ]
                },
                {
                    'type' : 's',
                    'name' : 'q2',
                    'text' : 'favourite color',
                    'instructions' : 'Select one',
                    'children' : [
                        {
                            'type' : 'ans',
                            'code' : 1,
                            'text' : 'blue'
                        },
                        {
                            'type' : 'ans',
                            'code' : 2,
                            'text' : 'red'
                        }
                    ]
                },
                {
                    'name' : 'intro11',
                    'type' : 'block',
                    'children' : [
                        {
                            'type' : 's',
                            'name' : 'q3',
                            'text' : 'what is your pet name',
                            'instructions' : 'Select one',
                            'children' : [
                                {
                                    'type' : 'ans',
                                    'code' : 1,
                                    'text' : 'pera'
                                },
                                {
                                    'type' : 'ans',
                                    'code' : 2,
                                    'text' : 'mika'
                                }
                            ]
                        },
                        {
                            'type' : 's',
                            'name' : 'q4',
                            'text' : 'when was your pet born',
                            'instructions' : 'Select one',
                            'children' : [
                                {
                                    'type' : 'ans',
                                    'code' : 1,
                                    'text' : '2022'
                                },
                                {
                                    'type' : 'ans',
                                    'code' : 2,
                                    'text' : '2021'
                                }
                            ]
                        }
                    ]
                },
            ]
        },
        {
            'name' : 'mid',
            'type' : 'block',
            'children' : [
                {
                    'type' : 's',
                    'name' : 'q5',
                    'text' : 'favorite actor/actress',
                    'instructions' : 'Select all that apply',
                    'children' : [
                        {
                            'type' : 'ans',
                            'code' : 1,
                            'text' : 'tom cruz'
                        },
                        {
                            'type' : 'ans',
                            'code' : 2,
                            'text' : 'scarlett johansson'
                        }
                    ]
                },
                {
                    'type' : 's',
                    'name' : 'q6',
                    'text' : 'favourite movie',
                    'instructions' : 'Select all that apply',
                    'children' : [
                        {
                            'type' : 'ans',
                            'code' : 1,
                            'text' : 'die hard'
                        },
                        {
                            'type' : 'ans',
                            'code' : 2,
                            'text' : 'top gun'
                        }
                    ]
                },
                {
                    'type' : 'r',
                    'name' : 'q7',
                    'text' : 'What year where you born?',
                    'instructions' : 'Enter number',
                },
                {
                    'type' : 'o',
                    'name' : 'q8',
                    'text' : 'How was your day?',
                    'instructions' : 'Write some text',
                }
            ]
        }
    ]
}


function parseToTree(obj, data){
    if (data.children && data.children.length > 0){
        for (let index = 0; index < data.children.length; index++) {
            let node = data.children[index];
            let prevSibling = null;
            let nextSibling = null;
            if (data.children[index-1])
                prevSibling = data.children[index-1];
            if (data.children[index+1])
                nextSibling = data.children[index+1];
            if (node.type=='ans')
                obj.children.push(new TreeLeaf(obj, node, index));
            else
                obj.children.push(new TreeNode(obj, prevSibling, nextSibling, node, index));
        }
    }
}


class TreeLeaf{
    constructor(parent = null, data, index) {
        this.parent = parent;
        this.text = data.text;
        this.code = data.code;
        this.index = index,
        parseToTree(this, data);
    }
    
}

class TreeNode {
    constructor(parent = null, prevSibling = null, nextSibling = null, data, index) {
      this.parent = parent;
      this.children = [];
      this.type = data.type;
      this.name = data.name;
      this.instructions = data.instructions;
      this.text = data.text;
      this.prevSibling = prevSibling,
      this.nextSibling = nextSibling;
      this.index = index,
      parseToTree(this, data);
    }
    

    get isContainer(){
        return ['block','survey'].includes(this.type);
    }

    get isClosed(){
        return ['s','m'].includes(this.type)
    }
}


class Tree {
    constructor(survey) {
      this.root = new TreeNode(null, null, null, survey);
      this.name = survey.name;
      this.type = survey.type;
      this.currentNode = this.root; // initialize currentNode to root
      this.children = [];
      parseToTree(this, survey);

    }
  
    next() {
        // if the current node has children and the first child is a TreeNode, move to the first child
        if (this.currentNode.children[0] instanceof TreeNode) {
            this.currentNode = this.currentNode.children[0];
        }
        // if the current node does not have children, move to the next sibling if it exists
        else if (this.currentNode.parent && this.nextSibling) {
            this.currentNode = this.nextSibling;
        }
        // if the current node is the last child of its parent, move to the next sibling of the parent (if it exists)
        else {
            let parent = this.currentNode.parent;
            while (parent && parent !== this.root && parent.children.indexOf(this.currentNode) === parent.children.length - 1) {
                this.currentNode = parent;
                parent = parent.parent;
            }
            if (parent) {
                this.currentNode = parent.children[parent.children.indexOf(this.currentNode) + 1];
            }
        }

        if (this.currentNode===undefined)
            return null;

        if (this.currentNode.isContainer)
            this.next()
    }

    last(){
        if (this.currentNode instanceof TreeNode){
            let len = this.currentNode.children.length;
            for (let index = len-1; index >= 0; index--) {
                const element = this.currentNode.children[index];
                if (element instanceof TreeNode){
                    this.currentNode = element.children[element.children.length -1];
                    this.last();
                }
            }
        }
    }

    prev() {
        // if the current node is the root, there is no previous node
        
        if (this.currentNode.type == 'survey' && !this.predecessor.prevSibling) {
            throw new Error('no more');
        }
    
        // if the current node is the first child of its parent, move to the parent
        if (this.currentNode.parent.children[0].name === this.currentNode.name){
             
            this.currentNode = this.currentNode.parent;
            this.movedFromChild = true;
        }
        
        // if the current node has a previous sibling, move to the last leaf node of that sibling's subtree
        else if (this.currentNode.parent && this.currentNode.prevSibling) {
            this.currentNode = this.currentNode.parent.children[this.currentNode.index-1];
            this.movedFromChild = false;
        }

        this.predecessor = this.currentNode;
        if (this.currentNode.isContainer)
            if (this.movedFromChild)
                this.prev()
            else
                this.last();
    }
}

let qnrTree = new Tree(qnr)

export default qnrTree;                             7889