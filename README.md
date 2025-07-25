# 🛒 E-Commerce admin dashboard

<div align="center">

  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=white&style=for-the-badge" />
  <img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white&style=for-the-badge" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=for-the-badge" />
  <img alt="TailwindCSS" src="https://img.shields.io/badge/TailwindCSS-06B6D4?logo=tailwindcss&logoColor=white&style=for-the-badge" />
  <img alt="TanStack Table" src="https://img.shields.io/badge/TanStack_Table-FF4154?logo=react&logoColor=white&style=for-the-badge" />
  <img alt="shadcn/ui" src="https://img.shields.io/badge/shadcn/ui-black?logo=radixui&logoColor=white&style=for-the-badge" />

</div>

A **modern and modular admin dashboard** for managing e-commerce operations — including products, coupons, users, and more.  
Built with **Next.js App Router**, **MongoDB**, **TailwindCSS**, and **TypeScript**, this project follows a **feature-based architecture** with support for scalable UI components, validation, and server-side interactions.

> Designed to connect seamlessly with a separate e-commerce frontend — with support for RabbitMQ ( will be added soon ), REST APIs, and modular expansion.

# Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Notification System](#notification-system)
- [UI Components](#ui-components)
- [Project Structure](#project-structure)
- [Main Routes](#main-routes)
- [Getting Started](#getting-started)
- [Deployment](#deployment)

## Features

- Modern and responsive UI built with Tailwind CSS and shadcn/ui
- Fetches transactions from Stripe and displays them in a paginated table
- Dynamic module-based routing system
- Robust form validation with Yup and Zod
- Powerful data management with TanStack Table
- Smooth animations with Framer Motion
- MongoDB integration with Mongoose
- Modular and maintainable architecture
- Authentication system ready
- Configurable sidebar and main title
- Notifications system discussed below.

## Tech Stack

- **Frontend**:

  - Next.js 15
  - Tailwind CSS
  - shadcn/ui
  - date-fns
  - Framer Motion
  - TanStack Table
  - TanStack Query
  - Yup (Frontend validations)
  - React Hook Form
  - recharts
  - loadash
  - React dropzone

- **Backend**:

  - MongoDB
  - Mongoose
  - Zod (Backend validations)
  - Stripe

## Notification System

The dashboard implements a real-time notification system that integrates with Redis Pub/Sub and Server-Sent Events (SSE). Key features include:

- Real-time updates from external services (e.g., e-commerce orders)
- Stream API integration for efficient data handling
- Automatic cleanup of old notifications
- Customizable notification types and priorities

## UI Components (shadcn/ui)

The dashboard utilizes several components from shadcn/ui:

- Dialogs and modals
- Form components (inputs, selects, textareas)
- Table components
- Alert and toast notifications
- Buttons and icons
- Custom form fields

## Project Structure

```
/dashboard
├── app/                      # Next.js App Router ( Main routes downwards )
|
├── mongoDB/
│   ├── models/
│   ├── validationSchemas/
│   └── connectDB.ts
├── types/                   # general types
├── hooks/                   # general hooks
├── components/              # Shared UI components
│   ├── Dashboard/
│   ├── general/
│   ├── ui/                  # Tailwind + shadcn components
│   ├── table/               # Table wrappers
│   │   ├── subComponents/
│   │   ├── subUtils/
│   │   └── templates/
│   │   └── types/
│   └── form/                # Form wrappers
├── icons/
├── features/                # Business logic by domain
│   ├── model/
│   │   ├── subComponents/
│   │   ├── table/
│   │   ├── services/
│   │   ├── types/
│   │   ├── utils/
│   │   └── modelConfig.ts
│   ├── otherModel/
├── utils/                   # Shared utilities
│   ├── constants/
│   ├── helperMethods/
│   ├── auth.ts
│   ├── api.ts
│   ├── validation.ts
├── services/
├── middleware.ts
├── tailwind.config.ts
└── env.d.ts
```

## Main Routes

- `/` - Home/Dashboard
- `/auth` - Authentication (login/register)
- `/view/[module]` - Module table view
- `/view/[module]/new` - Add new record
- `/view/[module]/edit/[recordId]` - Edit record
- `/view/[module]/details/[recordId]` - Record details (if showDetails = true)
- `/messages` - Messages
- `/transactions` - Transactions

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/your-username/your-project.git
```

2. Change to your project directory:

```bash
cd your-project
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env.local` file and add your environment variables:

```
MONGODB_URI=your_mongodb_uri
NEXT_PUBLIC_API_URL=your_api_url
```

5. Run the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment
