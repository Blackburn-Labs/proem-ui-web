---
id: components
title: UI Components
sidebar_label: UI Components
---

## Component Organization

Proem-UI uses a clear directory structure to organize UI components based on their scope and reusability. Understanding where to place your components is crucial for maintaining a scalable codebase.

### Directory Conventions

#### `/src/screens/` - Page-Level Components

Contains full-page views that represent the main states/routes of your application. Each screen typically corresponds to a route in your router configuration.

**Examples:** `HomeScreen.jsx`, `DashboardScreen.jsx`, `AboutScreen.jsx`

**When to use:**
- Creating a new route/page in your application
- Building a complete view that fills the entire viewport
- Composing multiple features into a single page

**Best practices:**
- Each screen should be in its own file
- Screens orchestrate features and layouts but contain minimal business logic
- Keep screens focused on composition rather than implementation

#### `/src/features/` - Feature-Specific Components

Contains all UI components related to a specific feature or domain. Each feature gets its own subdirectory with all related components.

**Example structure:**
```
/src/features/profile/
├── ProfileDetails.jsx    # Detailed profile view
├── ProfileList.jsx       # List of profiles
├── ProfileCard.jsx       # Individual profile card
└── ProfileForm.jsx       # Profile editing form
```

**When to use:**
- Building components specific to a business domain or feature
- Creating a set of related components that work together
- Components that aren't reusable across different features

**Best practices:**
- Group all related components in a single feature directory
- Keep feature components focused on their specific domain
- Feature components can import from `/src/components/` but not from other features
- Consider splitting large features into sub-features if needed

#### `/src/components/` - Reusable UI Components

Contains generic, reusable components used across multiple features and screens. These should be highly composable and not tied to specific business logic.

**Common subdirectories:**
- `/src/components/layout/` - Layout components (AppBar, Footer, Sidebar, etc.)
- `/src/components/common/` - Common UI components (Button, Card, Modal, etc.)

**Examples:** Navigation bars, buttons, modals, cards, forms, data tables

**When to use:**
- Creating generic UI components that could be used anywhere
- Building design system components
- Components that provide common functionality across features

**Best practices:**
- Components should be highly reusable and generic
- Avoid coupling to specific business logic or domain models
- Accept data and callbacks via props
- Document expected props and usage patterns
- Keep components small and focused on a single responsibility

### Decision Tree: Where Should My Component Live?

1. **Is this a full-page view?** → `/src/screens/`
2. **Is this specific to one feature/domain?** → `/src/features/[feature-name]/`
3. **Is this reusable across multiple features?** → `/src/components/`

**When in doubt, start with `/src/components/`.** It's easier to move a component to a feature directory later than to refactor a feature-specific component into a generic one.

## Building Components with Material-UI

Proem-UI uses [Material-UI (MUI) v7](https://mui.com/) as its component library. MUI provides a comprehensive set of pre-built, accessible components that follow Material Design principles.

### Getting Started with Material-UI

**Official Resources:**
- [MUI Documentation](https://mui.com/) - Complete API reference and guides
- [MUI Component Examples](https://mui.com/material-ui/getting-started/) - Live examples and code snippets

### Basic Material-UI Component

Here's a simple example using MUI components:

```jsx
import React from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';

export default function WelcomeCard({ title, message, onAction }) {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {message}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onAction}
                    sx={{ mt: 2 }}
                >
                    Get Started
                </Button>
            </CardContent>
        </Card>
    );
}
```

### Common Material-UI Components

**Layout & Structure:**
- [`Box`](https://mui.com/material-ui/react-box/) - Versatile container with system props
- [`Container`](https://mui.com/material-ui/react-container/) - Centered content container with max-width
- [`Grid`](https://mui.com/material-ui/react-grid/) - Responsive grid layout system
- [`Stack`](https://mui.com/material-ui/react-stack/) - One-dimensional layout with spacing

**Data Display:**
- [`Typography`](https://mui.com/material-ui/react-typography/) - Text rendering with semantic variants
- [`Table`](https://mui.com/material-ui/react-table/) - Data tables with sorting and pagination
- [`Card`](https://mui.com/material-ui/react-card/) - Content container with elevation
- [`List`](https://mui.com/material-ui/react-list/) - Lists of items with various configurations

**Inputs:**
- [`TextField`](https://mui.com/material-ui/react-text-field/) - Text input with validation and styling
- [`Button`](https://mui.com/material-ui/react-button/) - Interactive button with variants
- [`Select`](https://mui.com/material-ui/react-select/) - Dropdown selection
- [`Checkbox`](https://mui.com/material-ui/react-checkbox/), [`Radio`](https://mui.com/material-ui/react-radio-button/), [`Switch`](https://mui.com/material-ui/react-switch/) - Form controls

**Feedback:**
- [`Alert`](https://mui.com/material-ui/react-alert/) - Contextual feedback messages
- [`Dialog`](https://mui.com/material-ui/react-dialog/) - Modal dialogs
- [`Snackbar`](https://mui.com/material-ui/react-snackbar/) - Temporary notifications
- [`CircularProgress`](https://mui.com/material-ui/react-progress/) - Loading indicators

### Using the sx Prop

Material-UI v5+ uses the `sx` prop for inline styling with access to the theme:

```jsx
import { Box, Typography } from '@mui/material';

function StyledComponent() {
    return (
        <Box
            sx={{
                p: 2,                    // padding: theme.spacing(2)
                bgcolor: 'primary.main', // background color from theme
                borderRadius: 1,         // border-radius: theme.shape.borderRadius
                boxShadow: 2,           // elevation shadow
            }}
        >
            <Typography
                sx={{
                    color: 'primary.contrastText',
                    fontWeight: 'bold',
                }}
            >
                Styled Content
            </Typography>
        </Box>
    );
}
```

### Theming

Customize your application's appearance by editing `/src/theme/theme.js`:

```javascript
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    shape: {
        borderRadius: 8,
    },
});

export default theme;
```

### Responsive Design

Material-UI provides powerful responsive utilities:

```jsx
import { Box, useMediaQuery, useTheme } from '@mui/material';

function ResponsiveComponent() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: { xs: 1, sm: 2, md: 3 },
                p: { xs: 1, sm: 2, md: 3 },
            }}
        >
            {isMobile ? <MobileView /> : <DesktopView />}
        </Box>
    );
}
```

## Component Best Practices

### 1. Keep Components Small and Focused

Each component should have a single, well-defined purpose:

```jsx
// Good: Focused component
function UserAvatar({ user }) {
    return (
        <Avatar src={user.avatarUrl} alt={user.name}>
            {user.name.charAt(0)}
        </Avatar>
    );
}

// Good: Composed from smaller components
function UserProfile({ user }) {
    return (
        <Card>
            <UserAvatar user={user} />
            <UserDetails user={user} />
            <UserActions user={user} />
        </Card>
    );
}
```

### 2. Use Composition Over Complexity

Build complex UIs by composing simple components:

```jsx
// Reusable layout component
function FeatureLayout({ icon, title, description, action }) {
    return (
        <Box sx={{ textAlign: 'center', p: 3 }}>
            {icon}
            <Typography variant="h5" sx={{ mt: 2 }}>
                {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {description}
            </Typography>
            {action && <Box sx={{ mt: 2 }}>{action}</Box>}
        </Box>
    );
}

// Usage
<FeatureLayout
    icon={<CheckCircleIcon fontSize="large" color="primary" />}
    title="Fast & Reliable"
    description="Built for performance and scalability"
    action={<Button>Learn More</Button>}
/>
```

### 3. Separate Business Logic from Presentation

Keep components presentational and pass data/handlers as props:

```jsx
// Good: Presentational component
function TaskList({ tasks, onTaskComplete, onTaskDelete }) {
    return (
        <List>
            {tasks.map(task => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onComplete={() => onTaskComplete(task.id)}
                    onDelete={() => onTaskDelete(task.id)}
                />
            ))}
        </List>
    );
}

// Feature component handles business logic
function TaskManager() {
    const { tasks } = useSelector(state => state.tasks);
    const dispatch = useDispatch();

    const handleComplete = (taskId) => {
        dispatch(completeTask(taskId));
    };

    const handleDelete = (taskId) => {
        dispatch(deleteTask(taskId));
    };

    return (
        <TaskList
            tasks={tasks}
            onTaskComplete={handleComplete}
            onTaskDelete={handleDelete}
        />
    );
}
```

### 4. Document Component Props

Use PropTypes or TypeScript to document expected props:

```jsx
import PropTypes from 'prop-types';

function NotificationBanner({ message, severity, onClose }) {
    return (
        <Alert severity={severity} onClose={onClose}>
            {message}
        </Alert>
    );
}

NotificationBanner.propTypes = {
    message: PropTypes.string.isRequired,
    severity: PropTypes.oneOf(['error', 'warning', 'info', 'success']),
    onClose: PropTypes.func,
};

NotificationBanner.defaultProps = {
    severity: 'info',
    onClose: undefined,
};

export default NotificationBanner;
```

### 5. Handle Loading and Error States

Always account for asynchronous data:

```jsx
function UserProfileScreen() {
    const { user, loading, error } = useSelector(state => state.profile);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Alert severity="error">
                Failed to load profile: {error.message}
            </Alert>
        );
    }

    return <ProfileDetails user={user} />;
}
```

## Common Patterns

### Layout Wrapper

Create consistent layouts across screens:

```jsx
function ScreenLayout({ title, actions, children }) {
    return (
        <Container maxWidth="lg">
            <Box sx={{ py: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant="h4" component="h1">
                        {title}
                    </Typography>
                    {actions && <Box>{actions}</Box>}
                </Box>
                {children}
            </Box>
        </Container>
    );
}

// Usage
function DashboardScreen() {
    return (
        <ScreenLayout
            title="Dashboard"
            actions={<Button>Export Data</Button>}
        >
            <DashboardContent />
        </ScreenLayout>
    );
}
```

### Feature Toggle

Conditionally render features:

```jsx
function FeatureGate({ feature, children, fallback = null }) {
    const features = useSelector(state => state.features);

    if (!features[feature]) {
        return fallback;
    }

    return children;
}

// Usage
<FeatureGate feature="advancedAnalytics">
    <AnalyticsDashboard />
</FeatureGate>
```

### Error Boundary

Wrap components to catch errors gracefully:

```jsx
import { Component } from 'react';
import { Alert, Button } from '@mui/material';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <Alert
                    severity="error"
                    action={
                        <Button color="inherit" size="small" onClick={() => window.location.reload()}>
                            Reload
                        </Button>
                    }
                >
                    Something went wrong. Please try refreshing the page.
                </Alert>
            );
        }

        return this.props.children;
    }
}
```

## Learning Resources

**Material-UI:**
- [MUI Documentation](https://mui.com/) - Official docs with comprehensive examples
- [MUI Component Examples](https://mui.com/material-ui/getting-started/) - Live interactive examples
- [MUI Templates](https://mui.com/material-ui/getting-started/templates/) - Complete page templates

**React Best Practices:**
- [React Documentation](https://react.dev/) - Official React docs
- [React Component Patterns](https://react.dev/learn/thinking-in-react) - How to think in React

**Design System Resources:**
- [Material Design Guidelines](https://m3.material.io/) - Design principles behind Material-UI
- [Component Composition](https://react.dev/learn/passing-props-to-a-component) - Building with composition

## Summary

Proem-UI's component architecture provides a clear structure for building scalable React applications:

- **Screens** (`/src/screens/`) for full-page views
- **Features** (`/src/features/`) for domain-specific components
- **Components** (`/src/components/`) for reusable UI elements
- **Material-UI** provides a comprehensive component library
- **Best practices** emphasize composition, separation of concerns, and maintainability

Start building by choosing the right directory for your component, leverage Material-UI's powerful components, and follow React best practices for a maintainable codebase.
