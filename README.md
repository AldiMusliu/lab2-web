# Smart Library Management System

## General Overview

Smart Library Management System is a university project for managing a library in a web application.

The app allows users to browse books, search the collection, borrow books, return books, and view their profile. It also includes an admin area where library staff can manage books, categories, users, borrowings, dashboard data, and notifications.

The project is designed as a full-stack system with a React frontend, an Express backend, one SQL database, and one NoSQL database.

## Project Purpose

The purpose of this project is to show how a modern web application can be built using:

- a frontend framework
- a backend REST API
- authentication
- role-based pages
- SQL database storage
- NoSQL database storage
- clean project structure
- reusable components

The system has two main user roles:

- **User** - can browse books, borrow books, return books, and manage their profile.
- **Admin** - can manage books, categories, users, borrowings, and notifications.

## Technology Stack

### Frontend

- **React** - used to build the user interface.
- **TypeScript** - used for safer and clearer code.
- **TanStack Start / TanStack Router** - used for routing and page structure.
- **TanStack Query** - used for loading and caching API data.
- **Tailwind CSS** - used for styling.
- **shadcn/ui-style components** - used for reusable UI components.
- **React Hook Form** - used for forms.
- **Zod** - used for form and data validation.
- **Zustand** - used for session and UI state.

### Backend

The backend is planned as a separate API project.

- **Node.js**
- **Express.js**
- **REST API**
- **JWT authentication**
- **bcrypt** for password hashing
- **Zod** for request validation

### Databases

This project uses both SQL and NoSQL databases.

#### SQL Database - PostgreSQL

PostgreSQL is used for structured data with clear relationships.

It stores:

- users
- books
- categories
- borrowings

Example relationships:

- one category can have many books
- one user can have many borrowings
- one book can be borrowed many times over time

#### NoSQL Database - MongoDB

MongoDB is used for flexible data that does not need strict table relationships.

It stores:

- notifications
- activity logs
- future AI or recommendation history

## Main Features

- Public home page
- Public book collection page
- Book search and filtering
- Book detail page
- User registration
- User login and logout
- Protected dashboard
- Book borrowing
- Book returning
- User profile page
- Admin book management
- Admin category management
- Admin user management
- Borrowing management
- Notification system

## Main Pages

Public pages:

- Home
- Collections
- Book details
- About us
- Our mission
- Services
- Login
- Register

Protected pages:

- Dashboard
- Books
- Categories
- Users
- Borrowings
- Profile

## Project Structure

```text
src/
  components/   reusable UI and layout components
  features/     app features such as books, users, auth, profile
  lib/          shared helpers and HTTP client
  mocks/        mock data used during frontend development
  providers/    app providers
  routes/       application routes
  schemas/      shared validation schemas
  stores/       global state stores
```

## API Connection

The frontend connects to the backend using the value from `.env`:

```env
VITE_API_URL=http://localhost:3000/api
```

The frontend sends requests to endpoints such as:

- `/auth/login`
- `/auth/register`
- `/books`
- `/categories`
- `/users`
- `/borrowings`
- `/profile/me`
- `/dashboard/stats`
- `/notifications`

## How To Run The Frontend

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend runs on:

```text
http://localhost:3001
```

## Available Scripts

- `npm run dev` - starts the development server.
- `npm run build` - builds the project.
- `npm run preview` - previews the production build.
- `npm run test` - runs tests.
- `npm run lint` - runs linting.
- `npm run typecheck` - checks TypeScript types.
- `npm run format` - formats the code.

## Current Project Status

The frontend already contains the main pages, layouts, forms, components, API client files, and feature structure. It is prepared to work with a backend API that uses PostgreSQL for relational data and MongoDB for flexible data such as notifications and logs.
