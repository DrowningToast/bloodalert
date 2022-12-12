# Blood Alert

This is the repository for Bloodalert project.

## What's inside?

This project uses [pnpm](https://pnpm.io/) as a package manager. It includes the following packages/apps:

### Apps and Packages

- `web`: a [Next.js](https://nextjs.org/) app
- `linebot`: a Flask http server with PonyORM connected to PostgresDB

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm run build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm run dev
```

### Requirements

To start locally running the project or deploy you need to have the following technologies setup:

- Docker
- Python 3
- Node js
- pnpm
- LINE Bot account
- Firebase project

### Setup

Before running the setup script, environment variables are required to be setup first.

Begin by duplicating .env.example to the root directory and apps/web. The .env configures the database name, username and database then LINE bot account channel access token and channel secret. And lastly Firebase configuration is required and began with NEXT_PUBLIC\_ prefix.

To run the setup script, run the following command:

```
npm run setup
```

or run the following command if you got pnpm already installed

```
pnpm run setup
```

The setup script will automatically pull, install and setup

- Required Python libraries
- Project Node js dependencies
- PostgresDB Docker image
