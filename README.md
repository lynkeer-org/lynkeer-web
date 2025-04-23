# Lynkeer Web - Loyalty Program Platform

Lynkeer Web is a modern SaaS platform designed to revolutionize loyalty programs through digital wallet integration. Our platform enables businesses to create, manage, and scale their loyalty programs while providing customers with a seamless digital wallet experience.

## ⚠️ Disclaimer 
> Internal development workspace for the Lynkeer project.

This repository contains early-phase code and experiments for the Lynkeer platform.  
We are building in public for transparency and collaboration, but this repository is **not open source**.

## 🚧 Status

This project is under active development.  
Expect things to break, change, and evolve rapidly.

## 🚀 Features

- Digital wallet integration for loyalty points and rewards
- Modern and responsive user interface
- Real-time transaction processing
- Secure authentication and authorization
- Comprehensive admin dashboard
- Customizable loyalty program rules
- Analytics and reporting tools

## 📁 Project Structure

```
lynkeer-web/
├── apps/
│   └── admin-web/               # Admin dashboard application
├── packages/
│   ├── ui/                      # Shared UI components
│   ├── biome-config/            # Shared configuration for linter and formatter
│   └── typescript-config/       # Shared TypeScript configuration
├── .husky/                      # Git hooks configuration
├── .vscode/                     # VS Code settings
└── turbo.json                   # Turborepo configuration
```

## 🛠️ Tech Stack

- **Framework**: Next.js
- **UI Library**: shadcn/ui
- **Styling**: Tailwind CSS
- **Package Manager**: pnpm
- **Type Checking**: TypeScript
- **Code Formatting**: Biome
- **Version Control**: Git with Husky
- **Monorepo Management**: Turborepo

## 📦 Prerequisites

- Node.js >= 20
- pnpm >= 10.4.1

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone git@github.com:lynkeer-org/lynkeer-web.git
   cd lynkeer-web
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   ```

## 🎨 Adding UI Components

To add new shadcn/ui components to your application:

```bash
# Add a component to the admin web app
pnpm dlx shadcn@latest add [component-name] -c apps/admin-web
```

This will place the UI components in the `packages/ui/src/components` directory.

## 📝 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build all applications
- `pnpm lint` - Run linting
- `pnpm format` - Format code
- `pnpm check:fix` - Fix linting issues

## 🔒 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Add your environment variables here
```

## 🤝 Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for full guide.

## 🛡️ License

This repository is **not licensed for public or commercial use**.  
It is shared for development and collaboration purposes only, with explicit permission from the Lynkeer team.

All rights reserved © 2025 Lynkeer.  
See [`LICENSE.md`](./LICENSE.md) for full terms.

## 📫 Contact

Want to collaborate or have questions?  
Reach us at [contact@lynkeer.com](mailto:contact@lynkeer.com)
