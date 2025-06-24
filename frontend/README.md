# AI PROMPT SCHEDULER.

## Project Structure

```
/
├── app
│    ├── overview           # landing page
│    │    └── scheduler
│    │      └── page.tsx
│    │    └── layout.tsx
│    ├── favicon.ico           # landing page
│    ├── globals.css           # landing page
│    ├── layout.tsx           # landing page
│    ├── page.tsx           # landing page
├── components           # common-used components
│    ├── Login    # landing page component
│    │    └── phone-verify.tsx
│    │    └── sms-verify.tsx
│    │    └── signup.tsx
│    │    ...
│    └── ui              # shadcn/uiのコンポーネント
├── hooks                # custom-hooks
├── lib                  # library specific functions (not including data acquisition)
├── utils                # commonly used utility functions
├── public               # static files
│
├── middleware.ts        # Next.jsmiddleware
├── .env.example         # env variable sample file
├── .gitignore           # Git excluded files configuration file
├── .prettierrc.json     # Prettier configurationfile
├── .dockerignore        # Dockerexcluded files configuratin file
├── components.json      # shadcn/ui configuratin file
├── Dockerfile           # Docker image configuration file
├── eslint.config.mjs    # ESLint configuration file
├── docker-compose.yml   # Docker startup configuration file
├── next.config.js       # Next.js configuratin file
├── package.json         # Package configuration file
├── package-lock.json    # Package lock file
├── playwright.config.ts # Playwright configuration file
├── postcss.config.mjs   # PostCSS configuration file
├── tailwind.config.ts   # Tailwind CSS configuration file
└── tsconfig.json        # TypeScript configuration file
```

## Getting Started

First, install packates:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
