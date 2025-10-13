---
id: faq
title: Frequently Asked Questions
---

# Frequently Asked Questions

## General Questions

### What is Proem UI Framework?

Proem UI is a modern React application boilerplate built with the latest technologies and best practices. It's designed for rapid development of Progressive Web Applications (PWA) with Parse Server as the backend. The framework provides a complete starting point with React 19, Material-UI v7, Redux, and Vite pre-configured and ready to use.

### What are the main technologies used in Proem UI?

Proem UI uses a modern stack including:
- React 19.1.1 for building the UI
- Material-UI (MUI) v7 for component styling
- React Router v7 for navigation
- Redux for state management
- Vite for fast development and building
- Vitest for unit testing
- Playwright for end-to-end testing
- Parse Platform for backend services (optional, can be replaced)

### Can I use Proem UI with a different backend instead of Parse Server?

Yes! While Proem UI is designed to work with Parse Server, all Parse-specific code is marked with `[PARSE]` comments for easy identification. To adapt the boilerplate for a different backend:
1. Search for `[PARSE]` comments throughout the codebase
2. Replace Parse.Query calls with your API client
3. Update domain models in `src/domain/BasicDomain.js` to use your data layer
4. Modify the authentication flow in `src/store/auth.js`

## Getting Started

### What are the prerequisites for running Proem UI?

You need:
- Git for version control
- Node.js version 22.13.0 or higher (includes NPM)

That's it! During installation, Playwright browsers will be automatically downloaded for E2E testing.

### How do I start a new project with Proem UI?

There are two approaches:

**Method 1 - Clone and disconnect:**
```bash
git clone https://github.com/Blackburn-Labs/proem-ui.git your-project-name
cd your-project-name
npm install
git remote remove origin
git remote add origin your-repo-url
```

**Method 2 - Download ZIP:**
Simply download the ZIP file from GitHub using the "Download ZIP" button for a clean start without any git connection.

After setup, create a `.env` file based on `.env.example` and run `npm start` to launch the development server.

### What should I customize after cloning the boilerplate?

Follow these steps to make it your own:
1. Search and replace `{{App Name}}` with your application name
2. Search and replace `{{domain}}` with your domain/organization
3. Update `package.json` with your project details
4. Customize `src/theme/theme.js` with your brand colors
5. Replace logos in `/public/` directory
6. Update `public/manifest.json` for PWA settings
7. Replace this README with your project documentation

## Development

### What is the project structure and where should I put my code?

Proem UI follows a clear organizational pattern:
- `/src/screens/` - Full-page components that represent routes (e.g., HomeScreen.jsx)
- `/src/features/` - Feature-specific components organized by domain (e.g., /profile/ProfileCard.jsx)
- `/src/components/` - Reusable UI components used across features (e.g., buttons, modals)
- `/src/domain/` - Domain models extending BasicDomain or BasicArray
- `/src/store/` - Redux reducers, actions, and selectors
- `/src/router/` - Routing configuration

### How do I add a new page/route to my application?

To add a new route:
1. Create a new screen component in `/src/screens/` (e.g., `MyNewScreen.jsx`)
2. Add the route to your router configuration in `/src/router/`
3. Import and use React Router's route components

Example:
```javascript
// src/screens/MyNewScreen.jsx
export default function MyNewScreen() {
    return <div>My New Page</div>;
}

// In your router configuration
import MyNewScreen from './screens/MyNewScreen';
// Add route: <Route path="/my-new-page" element={<MyNewScreen />} />
```

### How do I customize the theme colors and typography?

Edit `/src/theme/theme.js` to customize your application's appearance:

```javascript
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2', // Your brand color
        },
        secondary: {
            main: '#dc004e',
        },
    },
    typography: {
        fontFamily: '"Your Font", "Roboto", sans-serif',
    },
});
```

See the [MUI theming documentation](https://mui.com/material-ui/customization/theming/) for all available options.

### What testing approach does Proem UI use?

Proem UI follows a pragmatic testing philosophy focused on business logic rather than implementation details:
- **Unit Tests** - Test pure functions and utilities
- **Integration Tests** - Test Redux reducers, selectors, and domain models
- **E2E Tests** - Test 3-5 critical user journeys
- **No UI Component Tests** - We don't test React components directly (see tests/README.md for the reasoning)

Run tests with `npm test`, `npm run test:watch`, or `npm run test:e2e` for end-to-end tests.

### Why aren't my React components re-rendering when Redux state changes?

This is usually caused by modifying domain objects without cloning them first. Redux relies on reference equality to detect changes.

**Problem:**
```javascript
// WRONG - modifies in place
state.list.data.push(newItem); // React won't detect this change
```

**Solution:**
```javascript
// CORRECT - creates new reference via clone
state.list.data.clone().add(newItem); // React detects new reference
```

**Key Rule**: Always clone domain objects in Redux reducers before modifying them. See the [Redux/Data Store](/docs/store) and [Domain Objects](/docs/domain) documentation for more details.

## Deployment

### How do I deploy my Proem-UI app to production?

**Quick Deployment to Netlify:**

1. Build your app:
```bash
npm run build
```

2. The build output will be in `/dist`

3. Deploy to CDN host/provider, for example, [Netlify](https://www.netlify.com/):
   - Connect your GitHub repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Add environment variables in Netlify dashboard

**Important for production:**
- Set your environment variable to your production Parse Server
- Ensure Parse Server is properly configured with your production domain in CORS settings
- Test the build locally first with `npm run preview`
- Configure proper error tracking and monitoring

See popular hosting options:
- [Netlify](https://www.netlify.com/) 
- [Vercel](https://vercel.com/) 
- [AWS Amplify](https://aws.amazon.com/amplify)
- [Google Cloud CDN](https://cloud.google.com/cdn)
