# Micro-Frontend Architecture Demo

A scalable micro-frontend architecture built with React, demonstrating modular frontend development with shared state management and design system.

## Tools and Frameworks

### Core Technologies
- **React 18** - UI library
- **TypeScript** - Type safety and developer experience
- **Vite** - Build tool and development server
- **Module Federation** - Micro-frontend implementation (@originjs/vite-plugin-federation)

### State Management & Routing
- **Redux Toolkit** - Centralized state management
- **React Router** - Navigation and routing

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework


## Setup and Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies for all applications:
```bash
# Install host application dependencies
npm install

# Install chat application dependencies
cd apps/chat
npm install

# Install email application dependencies
cd ../email
npm install
cd ../..

# Intsall all required dependencies for tailwind also
npm install tailwindcss @tailwindcss/vite

```


3. Start the development servers:
```bash
npm run start:all

#make sure to build all the app

```

This will start:
- Host application: http://localhost:5000
- Chat application: http://localhost:5001
- Email application: http://localhost:5002

## Project Structure

```
├── apps/
│   ├── chat/               # Chat micro-frontend
│   │   ├── src/
│   │   └── vite.config.ts
│   └── email/              # Email micro-frontend
│       ├── src/
│       └── vite.config.ts
├── src/
│   ├── components/         # Shared components
│   ├── store/             # Redux store configuration
│   └── App.tsx            # Main application
└── vite.config.ts         # Host application config
```

## Architecture Decisions

### Module Federation
- **Decision**: Used Vite's Module Federation plugin for micro-frontend implementation
- **Benefits**:
  - Runtime integration of micro-frontends
  - Independent deployment capability
  - Shared dependencies to reduce bundle size
- **Trade-offs**:
  - Additional build complexity
  - Need for careful dependency management

### State Management
- **Decision**: Centralized Redux store with shared state
- **Benefits**:
  - Consistent state management across micro-frontends
  - Predictable data flow
- **Trade-offs**:
  - Tighter coupling between micro-frontends
  - Need for careful state design to maintain modularity

### Design System
- **Decision**: Shared Tailwind CSS configuration and component library
- **Benefits**:
  - Consistent UI across all applications
  - Reduced duplication of styles
  - Changes affect all micro-frontends

### Routing
- **Decision**: React Router with nested routes for micro-frontends
- **Benefits**:
  - Seamless navigation between applications
  - URL-based state management

## Scalability

The architecture supports adding new micro-frontends by:

1. Creating a new application in the `apps` directory
2. Configuring Module Federation for the new app
3. Adding the remote entry to the host's configuration
4. Creating new routes in the host application

## Development Guidelines

1. **Adding New Features**
   - Create new features within their respective micro-frontend
   - Use shared components from the host when possible
   - Maintain consistent styling using Tailwind utilities

2. **State Management**
   - Keep state local to micro-frontends when possible
   - Use Redux for cross-cutting concerns only
   - Document state shape and interactions

3. **Testing**
   - Test micro-frontends independently
   - Test integration points in the host application
   - Ensure proper error boundaries and fallbacks

## Performance Considerations

- Lazy loading of micro-frontends
