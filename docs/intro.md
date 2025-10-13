---
id: intro
title: Introduction
sidebar_label: Introduction
---
# Proem UI Framework

A modern React application boilerplate built with the latest technologies and best practices. This framework is designed for rapid development of Progressive Web Applications (PWA) with Parse Server as the backend.

## Technology Stack

- **[React 19.1.1](https://react.dev/)** - Modern UI framework with latest features
- **[Material-UI (MUI) v7](https://mui.com/)** - Comprehensive component library
- **[React Router v7](https://reactrouter.com/)** - Client-side routing
- **[Redux](https://redux.js.org/)** - Centralized state management
- **[Vite](https://vite.dev/)** - Next-generation build tool and dev server
- **[Vitest](https://vitest.dev/)** - Modern testing framework
- **[Parse Platform](https://parseplatform.org/)** - Backend-as-a-Service (can be adapted to other backends)

## Quick Start

### 1. Clone and Install

```bash
# Clone this repository
git clone https://github.com/Blackburn-Labs/proem-ui.git your-project-name

# Navigate into the directory
cd your-project-name

# Install dependencies
npm install

# Note: Playwright browsers (~200MB) will be downloaded automatically during installation
# This only happens once and enables E2E testing out of the box
```

### 2. Configure Environment

Create a `.env` file in the root directory (see `.env.example` for template):

```env
API_URL=your_api_url
```

### 3. Start Development Server

```bash
npm start
```

Your application will be available at `http://localhost:5173`

### 4. Disconnect from Boilerplate Repository

After cloning, you'll want to disconnect from the original boilerplate repository and set up your own:

```bash
# Remove the original remote
git remote remove origin

# Initialize fresh git history (optional)
rm -rf .git
git init
git add .
git commit -m "Initial commit from Proem UI boilerplate"

# Add your own repository
git remote add origin your-repo-url
git push -u origin master
```

**Alternative: Download ZIP**

You can also simply download the boilerplate as a ZIP file from the GitHub repository using the "Download ZIP" button. This gives you a clean start without any git connection.

## Development Commands

```bash
# Start development server
npm start

# Build for production
npm build

# Preview production build
npm preview

# Run unit tests
npm test

# Run tests in watch mode
npm test:watch

# Run tests with UI
npm test:ui

# Run tests with coverage
npm test:coverage

# Run E2E tests (browsers installed automatically via postinstall)
npm run test:e2e

# Run E2E tests in UI mode
npm run test:e2e:ui

# Lint and fix code
npm run lint
```

## Project Structure

```
/
├── /public/                # Static assets (icons, images, manifest)
├── /src/
│   ├── /components/        # Reusable app-wide UI components
│   ├── /domain/            # Domain models extending BasicDomain/BasicArray
│   ├── /features/          # Feature-specific components
│   ├── /router/            # Routing configuration
│   ├── /screens/           # Full page components/views
│   ├── /store/             # Redux reducers, actions, and selectors
│   ├── /theme/             # Global styles and theme configuration
│   ├── /utils/             # Utility functions and helpers
│   ├── App.jsx             # Root application component
│   └── main.jsx            # Application entry point
├── /tests/                 # Test files
├── .env.example            # Environment variables template
├── package.json            # Project dependencies and scripts
└── vite.config.js          # Vite configuration
```

For detailed guidance on where to place your UI components (`/screens/`, `/features/`, `/components/`), see the [UI Components](/docs/components) documentation.
