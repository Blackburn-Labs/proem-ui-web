---
id: domain
title: Domain Object
sidebar_label: Domain Object
---
## Domain Objects

One of Proem-UIs most unique features is our domain layer. Domain objects are simple JavaScript objects used to represent anything in your application. In Java these are called [POJO](https://en.wikipedia.org/wiki/Plain_old_Java_object)s or Beans, [POCO](https://en.wikipedia.org/wiki/Plain_old_CLR_object)s in .Net. 

All domain objects should be stored in `/domain` and should extend `BasicDomain`:

```javascript

import BasicDomain from './BasicDomain';

export default class ExampleDomain extends BasicDomain {
    getMyClass() { return ExampleDomain; }

    constructor(props = {}) {
        super(props);
        this.id = props.id || undefined;
        this.label = props.label || '';
        this.message = props.message || '';
    }
}


```

This allows you to pass in a JS object, and JSON object, or another `ExampleDomain` to create a new object, such as:

```javasacript

const myObj = new ExampleDomain({ label: 'Hello', message: 'World!'})

```

By extending `BasicDomain` your domain objects come prebuilt with a few convenience features that makes managing them easier, especially when it comes to getting deep clones of your objects. 

You can also add other domain function to you object, like the ability to know if you domain object is savable or has been changed:

```javascript

import BasicDomain from './BasicDomain';

export default class ExampleDomain extends BasicDomain {
    getMyClass() { return ExampleDomain; }

    constructor(props = {}) {
        super(props);
        this.id = props.id || undefined;
        this.label = props.label || '';
        this.message = props.message || '';
    }

    isSame = target => (
        target != null
        && target.id === this.id
        && target.label === this.label
        && target.message === this.message
    );

    isSavable = (user = new User()) => (
        this.label != null
        && this.label.trim() !== ''
        && this.message != null
        && this.message.trim() !== ''
    );
}


```

One of the most powerful functions `BasicDomain` gives you is the `value()` function, which can be used to set or get a value from the object. Accessing the values via the standard JavaScript dot-notation is fine too. However, this can provide a convenient way to manage object values:

```javascript

const myObj = new ExampleDomain({ label: 'Hello', message: 'World!'})
console.log(myObj.label); // Outputs "Hello"
console.log(myObj.value('label')); // Outputs "Hello"

const newObject = myObj.clone().value('label', 'XYZ').value('message', '123')
console.log(newObject.label); // Outputs "XYZ"
console.log(newObject.value('label')); // Outputs "XYZ"
console.log(newObject.message); // Outputs "123"
console.log(newObject.value('message')); // Outputs "123"
console.log(myObj.label); // Outputs "Hello", because newObject is a clone
console.log(myObj.value('label')); // Outputs "Hello", because newObject is a clone

```

## Domain Arrays

Most domain objects also need to be stored and managed in lists. This can be a hassle in React when all objects and arrays should be deep cloned before manipulation. To make this easier, create an array class for each of your domain objects by extending `BasicArray`. For example:

```javascript

import BasicArray from './BasicArray';
import ExampleDomain from './ExampleDomain';

export default class ExampleArray extends BasicArray {
    getMyClass() { return ExampleArray; }

    getMyItemClass() { return ExampleDomain; }

    constructor(items = []) {
        super(items);
    }
}


```

That’s it. It’s a small file, but comes packed with helpful features. You can now get a deep clone of this array and all its children by simply calling:

```javascript

const myArray = new ExampleArray([
   { id: 1, label: 'A', message: 'Y'},
   { id: 2, label: 'B', message: 'Z'},
]); // Creates ExampleArray, and all children are converted to ExampleDomain objects
const myArrayCopy = myArray.clone(); // Deep cloned


```

Adding and removing new items to these arrays is also simplified through the `add`, `update`, `remove` function. For example:

```javascript

const myArray = new ExampleArray([
   { id: 1, label: 'A', message: 'Y'},
   { id: 2, label: 'B', message: 'Z'},
]);
const myArrayCopy = myArray.clone();

myArrayCopy.update(myArrayCopy.get(1).value('label', 'C'))

console.log(myArray.get(1).value('label')); // Outputs "B"
console.log(myArrayCopy.get(1).value('label')); // Outputs “C"


```
