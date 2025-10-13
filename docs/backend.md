---
id: backend
title: Backend Integration
sidebar_label: Backend Integration
---

# Backend Integration

Proem-UI is designed to work seamlessly with [Parse Platform](https://parseplatform.org/), a powerful open-source Backend-as-a-Service. The framework's architecture tightly couples Parse with the Domain Object pattern to create a Redux-friendly, immutable state management system.

## Parse Platform Integration

Parse Platform provides a complete backend solution with:
- **Data persistence** via Parse.Object
- **Real-time queries** with LiveQuery
- **User authentication** and session management
- **Cloud functions** for server-side logic
- **File storage** and management

### Key Integration Points

All Parse-specific code in Proem-UI is marked with `[PARSE]` comments for easy identification. The primary integration points are:

1. **Domain models** - Extend `Parse.Object` via `BasicDomain`
2. **Redux actions** - Use `Parse.Query` for data fetching
3. **Authentication** - Leverage Parse User system
4. **Cloud functions** - Execute server-side logic via `Parse.Cloud.run()`

## How Parse and Domain Objects Work Together

The heart of Proem-UI's backend integration is the relationship between Parse and Domain Objects. This architecture provides three critical benefits:

### 1. Automatic Serialization and Deserialization

Parse.Object handles all data transformation automatically:
- Converts JavaScript objects to Parse-compatible formats
- Handles complex data types (Date, GeoPoint, Pointer, etc.)
- Manages object references and relationships
- Provides automatic JSON serialization

Since `BasicDomain` extends `Parse.Object`, all domain objects inherit these capabilities without any additional code.

### 2. Redux-Friendly Immutability

Redux requires immutable state updates for change detection. The Domain Object pattern ensures this through:

**Clone Methods**: Both `BasicDomain` and `BasicArray` provide `clone()` methods that create deep copies:

```javascript
// BasicDomain cloning
const original = new Organization({ name: 'Acme Corp' });
const copy = original.clone(); // Creates new instance with same data

// BasicArray cloning
const originalList = new OrganizationArray([org1, org2]);
const copyList = originalList.clone(); // Creates new array with cloned items
```

**Reducer Pattern**: Always clone before modifying in reducers:

```javascript
case `${UPDATE}_FULFILLED`: {
    return {
        ...state,
        list: {
            ...state.list,
            data: state.list.data.clone().addUpdate(payload), // Clone first!
        },
    };
}
```

**Why Cloning Matters**: React's change detection relies on reference equality. Without cloning, modifying an object in place won't trigger re-renders:

```javascript
// ❌ WRONG - Modifies in place, React won't detect change
state.list.data.push(newItem);

// ✅ CORRECT - Creates new array reference, React detects change
state.list.data.clone().add(newItem);
```

### 3. Change Tracking and Validation

`BasicDomain` extends Parse.Object with additional state management:

**Dirty Tracking**: Know what's been modified since last save:

```javascript
const org = new Organization({ name: 'Acme' });
org.name = 'Acme Corporation';

console.log(org.isDirty()); // true
console.log(org.dirtyKeys()); // ['name']

await org.save();
console.log(org.isDirty()); // false - saved, no longer dirty
```

**Reset Capability**: Revert unsaved changes:

```javascript
org.name = 'Bad Name';
org.reset(); // Reverts to 'Acme Corporation'
```

**Validation Framework**: Enforce business rules before saving:

```javascript
export default class Organization extends BasicDomain {
    isSavable() {
        return this.name &&
               this.name.trim().length > 0 &&
               this.status === Organization.STATUS_ACTIVE;
    }
}

// In your UI
if (org.isSavable()) {
    await org.save();
} else {
    showError('Organization must have a name and be active');
}
```

## Setting Up Domain Objects Correctly

For the backend integration to work properly, Domain Objects must be configured correctly:

### 1. Extend the Right Base Class

**For single objects**, extend `BasicDomain`:

```javascript
import BasicDomain from './BasicDomain';

export default class Organization extends BasicDomain {
    static DEFAULTS = {
        name: '',
        description: '',
        status: 'ACTIVE',
    }

    static FIELDS = Object.keys(Organization.DEFAULTS);

    constructor(props) {
        super('Organization', props, Organization.DEFAULTS);
    }
}

// CRITICAL: Register with Parse
global.Parse.Object.registerSubclass('Organization', Organization);
```

**For collections**, extend `BasicArray`:

```javascript
import BasicArray from './BasicArray';
import Organization from './Organization';

export default class OrganizationArray extends BasicArray {
    get myItemClass() {
        return Organization;
    }

    get myClass() {
        return OrganizationArray;
    }
}
```

### 2. Never Include 'id' in DEFAULTS

Parse automatically manages object IDs, `createdAt`, and `updatedAt`. Including these in DEFAULTS causes errors:

```javascript
// ❌ WRONG
static DEFAULTS = {
    id: null,           // Don't include - Parse manages this
    createdAt: null,    // Don't include - Parse manages this
    updatedAt: null,    // Don't include - Parse manages this
    name: '',
}

// ✅ CORRECT
static DEFAULTS = {
    name: '',
    description: '',
    status: 'ACTIVE',
}
```

### 3. Define FIELDS for Query Optimization

Always define `FIELDS` to optimize Parse queries:

```javascript
static DEFAULTS = {
    name: '',
    description: '',
    status: 'ACTIVE',
    metadata: {},
}

static FIELDS = Object.keys(Organization.DEFAULTS);

// Use in queries
const query = new Parse.Query(Organization)
    .select(Organization.FIELDS) // Only fetch defined fields
    .find();
```

### 4. Register with Parse

Every domain class MUST be registered as a Parse subclass:

```javascript
global.Parse.Object.registerSubclass('Organization', Organization);
```

This enables Parse to:
- Instantiate the correct class type from queries
- Preserve domain methods on fetched objects
- Handle serialization/deserialization correctly

### 5. Always Use Domain Objects in Redux

Store state should ONLY contain domain objects, never plain JavaScript objects:

```javascript
// ❌ WRONG - Plain object and array
const initialState = {
    list: {
        data: [],  // Plain array
        isLoading: false,
    },
};

// ✅ CORRECT - Domain array
import { OrganizationArray } from '../domain';

const initialState = {
    list: {
        data: new OrganizationArray(),  // Domain array
        isLoading: false,
    },
};
```

## Redux Action Patterns with Parse

### Query Actions

Most data fetching uses Parse.Query:

```javascript
export const actions = {
    // Single record
    get: (id) => ({
        type: 'GET_ORG',
        meta: { id },
        payload: new Parse.Query(Organization)
            .select(Organization.FIELDS)
            .get(id),
    }),

    // List with filters
    list: (status = 'ACTIVE') => ({
        type: 'LIST_ORGS',
        payload: new Parse.Query(Organization)
            .equalTo('status', status)
            .select(Organization.FIELDS)
            .find(),
    }),
};
```

### Save and Delete Actions

Use Parse.Object methods directly:

```javascript
export const actions = {
    // Create or update
    save: (org) => ({
        type: 'SAVE_ORG',
        meta: { org },
        payload: org.save(),  // Returns Promise
    }),

    // Delete
    remove: (org) => ({
        type: 'DELETE_ORG',
        meta: { org },
        payload: org.destroy(),  // Returns Promise
    }),
};
```

### Cloud Function Actions

For complex server-side operations:

```javascript
export const actions = {
    sendNotification: (org) => ({
        type: 'SEND_NOTIFICATION',
        meta: { org },
        payload: Parse.Cloud.run('sendOrgNotification', {
            org: org.toJSON()  // Convert to JSON for cloud function
        }),
    }),
};
```

## Adapting to Other Backends

If you want to use Proem-UI with a different backend (REST API, GraphQL, Firebase, etc.), you'll need to adapt several layers:

### 1. Search for [PARSE] Comments

All Parse-specific code is marked with `[PARSE]` comments. Search your codebase:

```bash
grep -r "\[PARSE\]" src/
```

Key files to modify:
- `src/domain/BasicDomain.js` - Base domain class
- `src/store/*.js` - All reducer files with Parse queries
- `src/utils/parseProvider.js` - Parse SDK initialization

### 2. Replace Parse.Query with Your API Client

Instead of Parse.Query, use your API client:

```javascript
// Before (Parse)
export const actions = {
    list: () => ({
        type: 'LIST_ORGS',
        payload: new Parse.Query(Organization)
            .select(Organization.FIELDS)
            .find(),
    }),
};

// After (REST API)
import apiClient from '../utils/apiClient';

export const actions = {
    list: () => ({
        type: 'LIST_ORGS',
        payload: apiClient.get('/organizations')
            .then(response => new OrganizationArray(response.data)),
    }),
};
```

### 3. Update Domain Base Classes

You have two options:

**Option A: Keep Domain Pattern** - Maintain `BasicDomain` and `BasicArray` but remove Parse.Object inheritance:

```javascript
// BasicDomain without Parse
export default class BasicDomain {
    constructor(className, props = {}, defaults = {}) {
        this.className = className;
        this.id = props.id || null;
        this.attributes = { ...defaults, ...props };
        this._originalValues = {};
    }

    get(key) {
        return this.attributes[key];
    }

    set(key, value) {
        this._logOriginalValue(key, value, this.get(key));
        this.attributes[key] = value;
    }

    // Keep change tracking, validation, cloning...
}
```

**Option B: Simplify** - Use plain JavaScript classes if you don't need change tracking:

```javascript
export default class Organization {
    constructor(props = {}) {
        this.id = props.id || null;
        this.name = props.name || '';
        this.description = props.description || '';
    }

    clone() {
        return new Organization(this);
    }
}
```

### 4. Update Authentication

Replace Parse User system with your auth provider:

```javascript
// Before (Parse)
const user = await Parse.User.logIn(username, password);

// After (Custom API)
const response = await apiClient.post('/auth/login', { username, password });
const user = new User(response.data);
```

### 5. Handle Serialization

Without Parse, you'll need to handle JSON serialization manually:

```javascript
export default class Organization {
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            status: this.status,
        };
    }

    static fromJSON(json) {
        return new Organization(json);
    }
}
```

### 6. Test Thoroughly

After adaptation:
- Test all CRUD operations
- Verify Redux state updates correctly
- Check that cloning works as expected
- Ensure authentication flows work
- Validate error handling

## Coming Soon: RESTful API Guide

We're working on comprehensive guidance for adapting Proem-UI to a basic RESTful API backend. This guide will include:

- Complete example implementation with Axios
- Modified BasicDomain and BasicArray base classes
- Updated Redux action patterns for REST
- Authentication with JWT tokens
- Error handling and response transformation
- Migration checklist and testing strategies

Stay tuned for this addition to the documentation!

## Benefits of the Parse + Domain Object Pattern

This architecture provides several advantages:

1. **Type Safety** - Domain objects enforce structure and validation
2. **Change Detection** - React automatically detects state changes via cloning
3. **Developer Experience** - Rich methods on domain objects (isSavable, isDirty, etc.)
4. **Consistency** - Same patterns across all features and entities
5. **Testability** - Domain logic separated from UI and API concerns
6. **Backend Abstraction** - Domain layer isolates backend details from UI

## Best Practices

### Always Clone in Reducers

```javascript
// ✅ CORRECT
return {
    ...state,
    list: {
        ...state.list,
        data: state.list.data.clone().add(newItem),
    },
};
```

### Use BasicArray Methods

```javascript
// ✅ CORRECT - Use domain array methods
const updated = orgArray.clone().addUpdate(org);
const filtered = orgArray.filter(org => org.isActive());
const found = orgArray.get(orgId);
```

### Validate Before Saving

```javascript
// ✅ CORRECT
if (!org.isSavable()) {
    throw new Error('Invalid organization data');
}
await org.save();
```

### Define Comprehensive FIELDS

```javascript
// ✅ CORRECT - Include all queryable fields
static FIELDS = [
    'name',
    'description',
    'status',
    'owner',
    'metadata',
];
```

## Summary

The Backend Integration in Proem-UI relies on three key pillars:

1. **Parse Platform** - Provides backend infrastructure and data layer
2. **Domain Objects** - Extend Parse.Object with business logic and validation
3. **Redux Store** - Uses cloning pattern for immutable state management

This architecture works because:
- Parse handles serialization automatically
- Domain objects provide cloning for Redux immutability
- Change tracking enables optimistic updates and rollback
- Type-safe collections prevent runtime errors

Setting up Domain Objects correctly is crucial - they must extend BasicDomain/BasicArray, register with Parse, and always be cloned in reducers. When configured properly, this pattern provides a robust, type-safe, and Redux-friendly backend integration.
