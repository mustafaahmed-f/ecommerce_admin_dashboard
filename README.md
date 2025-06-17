# Reusable Admin Dashboard Template

A highly customizable and reusable admin dashboard template built with Next.js, perfect for creating admin interfaces for various projects.

## Features

- Modern and responsive UI built with Tailwind CSS and shadcn/ui
- Dynamic module-based routing system
- Robust form validation with Yup and Zod
- Powerful data management with TanStack Table
- Smooth animations with Framer Motion
- MongoDB integration with Mongoose
- Modular and maintainable architecture
- Authentication system ready
- Configurable sidebar and main title

## Tech Stack

- **Frontend**:

  - Next.js 15
  - Tailwind CSS
  - shadcn/ui
  - date-fns
  - Framer Motion
  - TanStack Table
  - Yup (Frontend validations)
  - React Hook Form

- **Backend**:
  - MongoDB
  - Mongoose
  - Zod (Backend validations)

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
│   ├── ui/                  # Tailwind + shadcn components
│   ├── table/               # Table wrappers
│   └── form/                # Form wrappers
├── icons/
├── features/                # Business logic by domain
│   ├── products/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   ├── users/
│   └── orders/
├── utils/                   # Shared utilities
│   ├── constants/
│   ├── helperMethods/
│   ├── auth.ts
│   ├── api.ts
│   ├── validation.ts
│   └── connectDB.ts
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
- `/view/[module]/edit` - Edit record
- `/view/[module]/details/[recordId]` - Record details (if showDetails = true)
- `/messages` - Messages
- `/transactions` - Transactions

## How to Use This Template

1. Clone the repository:

```bash
git clone https://github.com/your-username/your-project.git
```

2. Change to your project directory:

```bash
cd your-project
```

3. Remove the template remote:

```bash
git remote remove origin
```

4. Add your new remote:

```bash
git remote add origin https://github.com/your-username/your-project.git
```

5. Verify the remote:

```bash
git remote -v
```

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create a `.env.local` file and add your environment variables:

```
MONGODB_URI=your_mongodb_uri
NEXT_PUBLIC_API_URL=your_api_url
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Adding New Modules

1. Add your module to `utils/mainConfig.ts`
2. Create the necessary components in `features/[module]/components`
3. Add validation schemas in `mongoDB/validationSchemas`
4. Create the Mongoose model in `mongoDB/models`
5. Add business logic in `features/[module]/services`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
