---
id: components
title: UI Components
sidebar_label: UI Components
---

## Component vs Page

React breaks the UI code into components. There are many types of components and ways you can create them. Proem-UI comes pre-configured with a specific component architecture set up that follows well researched common practices

At the highest level, there are two sets of components:

 - **Pages** (located in `/pages`) - This is the high level state of your app. Think of these as each screen in the app. Each screen should be in its own subdirectory (i.e. `/pages/Dashboard/index.js` or `/pages/About/index.js`). Each page subdirectory can also contain specialized components that are specific to those pages (i.e. /pages/Dashboard/DashboardSidebar.js ). However, we suggest keeping this to a minimum and favor putting most of your components in the `/components` directory. When in doubt, use `/components` 
 - **Components** (located in `/components`) - These are the shared (or potentially shared) components in your app. This can be anything from typographic content to dialogs, to entire calculator components.
  
Use components as much as possible. Multiple small chunks of code are far easier to maintain then single large files of code. The smaller and more specialized/focused your components are, the better. 

## Pages
Coming Soon


## Components
There are two types of components you can create within React, [function components & class components](https://reactjs.org/docs/components-and-props.html). Function components allow a simpler lightweight component, while class components are more comprehensive.

### Simplest Function Component
The most basic of components:
```react
import React from 'react';

export default function MyBasicComponent() {
    return (
        <div>Hello World!</div>
    );
}
```

### Typical Function Component
The previous example is helpful, and there are many cases when you’d want to create such a basic component to encapsulate your code as much as possible. However, here is a a more robust example of a function component:
```react
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Dialog, DialogContent, DialogTitle, DialogActions, Button, IconButton,
} from '@material-ui/core';

import { InfoIcon } from 'utils/Icons';

export default function MyBasicDialog({ title, message }) {
    const [isOpen, setOpen] = useState(false);

    return (
        <>
            <IconButton onClick={() => { setOpen(true); }}>
                <InfoIcon />
            </IconButton>
            <Dialog open={isOpen} onClose={() => { setOpen(false); }}>
                <DialogTitle id="dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    {message}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setOpen(false); }} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

MyBasicDialog.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string.isRequired,
};

MyBasicDialog.defaultProps = {
    title: 'My Basic Dialog',
};
```
This Uses:

 - [Classless React Component](https://reactjs.org/docs/hooks-intro.html) with a [state hook](https://reactjs.org/docs/hooks-state.html)
 - [Material-UI Dialogs](https://material-ui.com/components/dialogs/) & [Buttons](https://material-ui.com/components/buttons/)

### Class Component
For scenarios where your component needs to be more robust, a Class component adds more flexibility, but is a bit more verbose:
```javascript
Coming Soon
```

### Further Reading:
 - [Function & Class Components](https://reactjs.org/docs/components-and-props.html)
 - [Classless React Component](https://reactjs.org/docs/hooks-intro.html)
 - [State Hook](https://reactjs.org/docs/hooks-state.html)
 - [Material-UI](https://material-ui.com/)
 
## Component Storybook
[Storybook](https://storybook.js.org/) is an incredibly powerful tool used to test individual UI components in isolation as well as create a visual component library for your project. It comes packaged and preconfigured with Proem-UI. To start Storybook run:
```shell script
> npm run storybook
```
Once Storybook is started it will automatically open the browser for you (or visit: `http://localhost:6006/`). Once started, it will live-reload changes you make to your components. 

Each of your components should have a storybook. For example, the `MyBasicDialog` component we created in the earlier example would be in `/components/MyBasicDialog/index.j`s. Alongside this component there should be a `/components/MyBasicDialog/index.story.js`:
```react
import React from 'react';
import MyBasicDialog from '.';

export default { title: 'MyBasicDialog' };

export const withMessage = () => <MyBasicDialog message="Hello World!" />;

export const withTitleAndMessage = () => (
    <MyBasicDialog
        title="Hello"
        message="World!"
    />
);
```

### Further Reading:
 - [Intro to Storybook](https://www.learnstorybook.com/intro-to-storybook/)
 - [Storybook Docs](https://storybook.js.org/docs/basics/introduction/)
 
## Icons

Coming Soon

 
 
