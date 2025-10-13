---
id: domain
title: Domain Objects
sidebar_label: Domain Objects
---

## Overview

One of Proem-UI's most powerful features is its domain layer. Domain objects are business entities that represent the core data models in your application. Similar to POJOs (Plain Old Java Objects) or POCOs (Plain Old CLR Objects), these classes provide structure, validation, and behavior for your application's data.

All domain objects should be stored in the `/domain` directory and typically extend either `BasicDomain` (for single objects) or `BasicArray` (for collections).

## Parse.Object Integration

**Important**: Proem-UI's domain layer extends [Parse Platform](https://parseplatform.org/)'s `Parse.Object`, providing automatic persistence and backend synchronization. For complete details on how Parse integrates with domain objects, including serialization, change tracking, and Redux patterns, see the [Backend Integration](/docs/backend) documentation.

## Base Classes

### BasicDomain

`BasicDomain` is the foundation for all domain objects that need persistence. It extends `Parse.Object` and provides:

- **Dynamic property management** with automatic getters/setters
- **Change tracking** to monitor unsaved modifications
- **Validation framework** for business rule enforcement
- **Cloning and serialization** capabilities
- **Parse Platform integration** for seamless persistence

#### BasicDomain Methods

Domain objects inherit from `BasicDomain` which provides:

- `clone()` - Creates a deep copy (though Parse SDK often provides cloned objects already)
- All Parse.Object methods (`save()`, `destroy()`, `fetch()`, `toJSON()`, etc.)
- `get(key)` - Gets a property value
- `set(key, value)` - Sets a property value
- `dirty()` - Returns true if the object has unsaved changes
- `dirtyKeys()` - Returns array of changed property names
- `isNew()` - Returns true if the object hasn't been saved yet

### BasicArray

`BasicArray` extends JavaScript's native Array class and provides:

- **Type-safe collections** with enforced item types
- **CRUD operations** (add, update, remove) with intelligent handling
- **Query methods** for finding items by ID or index
- **Collection manipulation** (sort, move, clone)
- **Serialization support** for API communication

#### BasicArray Methods

When working with collections in Redux, always use these `BasicArray` methods:

- `clone()` - Creates a deep copy of the array
- `add(item)` - Adds an item to the array
- `update(item)` - Updates an existing item
- `updateAt(index, item)` - Updates item at specific index
- `addUpdate(item)` - Adds if new, updates if exists
- `sort(compareFn)` - Sorts the array
- `remove(id)` - Removes item by ID
- `removeAt(index)` - Removes item at index
- `get(id)` - Gets item by ID
- `getAt(index)` - Gets item at index
- `contains(id)` - Checks if item exists

## Creating Domain Classes

### Simple Domain Class

Here's the recommended pattern for creating a basic domain class:

```javascript
import BasicDomain from './BasicDomain';

export default class SimpleEntity extends BasicDomain {
    static DEFAULTS = {
        name: '',
        description: '',
        isActive: true,
    }

    static FIELDS = Object.keys(SimpleEntity.DEFAULTS);

    constructor(props) {
        super('SimpleEntity', props, SimpleEntity.DEFAULTS);
    }

    isSavable() {
        return this.name && this.name.trim().length > 0;
    }

    getLabel() {
        return this.name || `SimpleEntity ${this.id}`;
    }
}

global.Parse.Object.registerSubclass('SimpleEntity', SimpleEntity);
```

**Important Notes**:
- Never include `id`, `createdAt`, or `updatedAt` in `DEFAULTS` - these are automatically managed by Parse.Object
- Always register your class with Parse using `registerSubclass()`
- The first parameter to `super()` is the Parse class name (should match the registration)

### Domain Class with Enums

For entities with status fields or predefined values, use this pattern:

```javascript
import BasicDomain from './BasicDomain';

export default class StatusEntity extends BasicDomain {
    // Define enum constants
    static STATUS_ACTIVE = 'ACTIVE';
    static STATUS_INACTIVE = 'INACTIVE';
    static STATUS_PENDING = 'PENDING';

    // Array of all valid statuses
    static STATUSES = [
        StatusEntity.STATUS_ACTIVE,
        StatusEntity.STATUS_INACTIVE,
        StatusEntity.STATUS_PENDING,
    ];

    // Human-readable labels for UI display
    static STATUS_LABELS = {
        [StatusEntity.STATUS_ACTIVE]: 'Active',
        [StatusEntity.STATUS_INACTIVE]: 'Inactive',
        [StatusEntity.STATUS_PENDING]: 'Pending Approval',
    };

    static DEFAULTS = {
        name: '',
        status: StatusEntity.STATUS_PENDING,
        email: '',
    }

    static FIELDS = Object.keys(StatusEntity.DEFAULTS);

    constructor(props) {
        super('StatusEntity', props, StatusEntity.DEFAULTS);
    }

    // Validation with enum checking
    isSavable() {
        return this.name &&
               this.email &&
               StatusEntity.STATUSES.includes(this.status);
    }

    // Convenience methods for status checking
    isActive() {
        return this.status === StatusEntity.STATUS_ACTIVE;
    }

    get statusLabel() {
        return StatusEntity.STATUS_LABELS[this.status] || 'Unknown';
    }
}

global.Parse.Object.registerSubclass('StatusEntity', StatusEntity);
```

### Domain Array Classes

Create collection classes for managing groups of domain objects:

```javascript
import BasicArray from './BasicArray';
import MyDomainClass from './MyDomainClass';

export default class MyDomainArray extends BasicArray {
    // Required: specify the item class type
    get myItemClass() {
        return MyDomainClass;
    }

    get myClass() {
        return MyDomainArray;
    }

    // Common pattern: find by key property
    getByKey(key) {
        return this.find(item => item.key === key);
    }

    // Custom sorting logic
    sortByName() {
        return this.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Custom serialization for API
    toSimpleJSON() {
        return this.map(item => ({
            id: item.id,
            name: item.name,
            key: item.key,
        }));
    }
}
```

## Key Features

### Validation Framework

Implement business rules in the `isSavable()` method:

```javascript
isSavable() {
    // Required fields
    if (!this.name || !this.email) return false;

    // Business rules
    if (this.status === 'ACTIVE' && !this.approvedBy) return false;

    // Format validation
    if (!this.email.includes('@')) return false;

    return true;
}
```

### Collection Operations

`BasicArray` provides comprehensive collection management:

```javascript
const collection = new MyEntityArray();

// Adding items
collection.add({ name: 'New Item' });
collection.addUpdate({ id: 1, name: 'Updated Item' }); // Updates if exists, adds if new

// Querying
const item = collection.get('item-id');
const found = collection.getByKey('item-key');
const hasItem = collection.contains(item);

// Manipulation
collection.move(0, 2); // Move item from index 0 to 2
collection.remove(item);
collection.removeAt(1);

// Serialization
const json = collection.toJSON();
const ids = collection.toIds(); // Array of just IDs
```

### Cloning for Immutability

Both `BasicDomain` and `BasicArray` provide deep cloning, which is essential for React's change detection:

```javascript
const original = new MyDomainClass({ name: 'Original' });
const copy = original.clone();
copy.name = 'Modified';

console.log(original.name); // 'Original'
console.log(copy.name);     // 'Modified'
```

**Important**: Always clone objects in Redux reducers/stores so React can detect changes.

## Using Domain Objects in Redux

**Critical Rule**: All objects in the Redux store must be domain objects that extend `BasicDomain` or `BasicArray`. Never store plain JavaScript objects or arrays.

For complete details on using domain objects in Redux, including state management patterns, action creators, and reducer examples, see the [Redux/Data Store](/docs/store) documentation.

## Transient Properties

For performance optimization, you can include transient properties - data loaded for convenience but not persisted:

```javascript
import BasicDomain from './BasicDomain';

export default class EntityWithTransients extends BasicDomain {
    static DEFAULTS = {
        name: '',
        description: '',
        isActive: true,
    }

    static FIELDS = Object.keys(EntityWithTransients.DEFAULTS);

    // Private fields for transient data
    #relatedItems = null;
    #cachedData = null;

    constructor(props) {
        super('EntityWithTransients', props, EntityWithTransients.DEFAULTS);

        // Load transient data if provided
        if (props?.relatedItems) {
            this.#relatedItems = props.relatedItems;
        }
        if (props?.cachedData) {
            this.#cachedData = props.cachedData;
        }
    }

    // Getters and setters for transient properties
    get relatedItems() { return this.#relatedItems; }
    set relatedItems(value) { this.#relatedItems = value; }

    get cachedData() { return this.#cachedData; }
    set cachedData(value) { this.#cachedData = value; }
}

global.Parse.Object.registerSubclass('EntityWithTransients', EntityWithTransients);
```

**When to use transient properties**:
- Performance optimization when related data is frequently accessed together
- UI convenience when components need related data without additional queries
- Temporary state that doesn't belong in the persistent model

**Important**: Transient properties are not saved when the object is persisted. Use private fields (`#property`) to clearly separate transient from persistent data.

## Best Practices

### 1. Always Define DEFAULTS and FIELDS
```javascript
static DEFAULTS = { /* all properties with default values */ }
static FIELDS = Object.keys(MyClass.DEFAULTS);
```

### 2. Register Parse Subclasses
```javascript
global.Parse.Object.registerSubclass('ParseClassName', JavaScriptClass);
```

### 3. Implement Proper Validation
```javascript
isSavable() {
    // Check required fields, business rules, data formats
    return /* boolean validation result */;
}
```

### 4. Use Enums for Status Fields
```javascript
static STATUS_ACTIVE = 'ACTIVE';
static STATUSES = [MyClass.STATUS_ACTIVE /* ... */];
static STATUS_LABELS = { [MyClass.STATUS_ACTIVE]: 'Active' };
```

### 5. Provide Helper Methods
```javascript
getLabel() { return this.name || `${this.constructor.name} ${this.id}`; }
isActive() { return this.status === MyClass.STATUS_ACTIVE; }
isEmpty() { return !this.name && !this.description; }
```

## Using Non-Parse Backends

While Proem-UI is designed to work seamlessly with Parse Platform, you can adapt it to work with other backends. Here's what you need to know:

### Understanding the Parse Dependency

`BasicDomain` extends `Parse.Object`, which provides:
- Automatic property getters/setters
- Change tracking via `dirty()` and `dirtyKeys()`
- Persistence via `save()` and `fetch()`
- Query capabilities via `Parse.Query`

### Adapting for Other Backends

If you're not using Parse, you have several options:

#### Option 1: Vanilla JavaScript Classes

For simple applications without backend persistence:

```javascript
export default class SimpleEntity {
    static DEFAULTS = {
        name: '',
        description: '',
        isActive: true,
    }

    constructor(props = {}) {
        Object.keys(SimpleEntity.DEFAULTS).forEach(key => {
            this[key] = props[key] !== undefined ? props[key] : SimpleEntity.DEFAULTS[key];
        });
        this.id = props.id || undefined;
    }

    isSavable() {
        return this.name && this.name.trim().length > 0;
    }

    clone() {
        return new SimpleEntity({ ...this });
    }

    toJSON() {
        const json = {};
        Object.keys(SimpleEntity.DEFAULTS).forEach(key => {
            json[key] = this[key];
        });
        return json;
    }
}
```

#### Option 2: Create Your Own Base Class

Create a `CustomBaseDomain` that mirrors `BasicDomain`'s API but integrates with your backend:

```javascript
export default class CustomBaseDomain {
    constructor(className, props = {}, defaults = {}) {
        this.className = className;
        this._attributes = { ...defaults, ...props };
        this._id = props.id || undefined;
    }

    get id() { return this._id; }
    set id(value) { this._id = value; }

    // Implement getters/setters for dynamic properties
    get(key) { return this._attributes[key]; }
    set(key, value) { this._attributes[key] = value; }

    // Implement your backend save logic
    async save() {
        const response = await fetch(`/api/${this.className}`, {
            method: this.id ? 'PUT' : 'POST',
            body: JSON.stringify(this.toJSON()),
        });
        return response.json();
    }

    // Implement cloning
    clone() {
        return new this.constructor(this.toJSON());
    }

    // Implement serialization
    toJSON() {
        return { ...this._attributes, id: this.id };
    }

    // Add validation method
    isSavable() {
        return true; // Override in subclasses
    }
}
```

Then use it in your domain classes:

```javascript
import CustomBaseDomain from './CustomBaseDomain';

export default class MyEntity extends CustomBaseDomain {
    static DEFAULTS = {
        name: '',
        email: '',
    }

    constructor(props) {
        super('MyEntity', props, MyEntity.DEFAULTS);
    }

    isSavable() {
        return this.get('name') && this.get('email');
    }
}
```

#### Option 3: Backend Service Layer

Keep the Parse-based domain layer but create a service layer that translates between Parse and your backend:

```javascript
// services/MyEntityService.js
import MyEntity from '../domain/MyEntity';

export async function saveMyEntity(entity) {
    const response = await fetch('/api/myentity', {
        method: entity.id ? 'PUT' : 'POST',
        body: JSON.stringify(entity.toJSON()),
    });
    const data = await response.json();
    return new MyEntity(data);
}

export async function fetchMyEntity(id) {
    const response = await fetch(`/api/myentity/${id}`);
    const data = await response.json();
    return new MyEntity(data);
}
```

### Considerations When Not Using Parse

If you choose not to use Parse, you'll need to implement:

1. **Property Management**: Dynamic getters/setters for domain properties
2. **Change Tracking**: Mechanism to detect which fields have been modified
3. **Persistence**: Save/fetch logic that communicates with your backend
4. **Queries**: Data retrieval and filtering capabilities
5. **Relationships**: Handling of related objects (foreign keys, joins)
6. **Validation**: Client-side validation before persistence

The Parse Platform provides all of this out of the box, which is why Proem-UI uses it by default. However, with some additional work, you can adapt the domain layer to work with REST APIs, GraphQL, Firebase, or any other backend solution.

## Summary

The Proem-UI domain layer provides a robust, type-safe way to manage your application's data models. By extending `BasicDomain` and `BasicArray`, you get:

- Seamless Parse Platform integration
- Built-in validation and business logic
- Type-safe collections
- Deep cloning for React immutability
- Rich serialization capabilities
- Extensible architecture for custom backends

This architecture creates a clean separation between your data models and UI components, making your application easier to maintain and scale.
