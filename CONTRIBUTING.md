# Contributing to marsAI

## Welcome

Thank you for your interest in contributing to **marsAI**, the platform 
for the first international 1-minute AI-generated short film festival.

Whether you're fixing a bug, proposing a new feature, improving documentation, 
or writing tests, every contribution helps make this project better. 
This guide will walk you through the process of contributing.

If you have any questions, feel free to 
[open an issue](https://github.com/ebouchut/mars-ai-project/issues) on GitHub.

## Before You Start

### Code of Conduct

### Prerequisites for Development


### Understanding the Codebase

#### Architecture Overview

#### Directory Structure

The project is composed of **3 `npm` packages. 
These are scoped below the `@marsai` `npm` workspace:

- **`@marsai/database`**: Database schema and generated JavaScript code
  (database ORM client, and types mainly model JS objects) (in `packages/database`)
- **`@marsai/backend`**:  Node/Express app (in `packages/backend`)
- **`@marsai/frontend`**: React app (in `packages/frontend`)

`@marsai/backend` and `@marsai/frontend` depend on `@marsai/database`.   
The *frontend* only uses the types (models such as `Film`, `User`...) from `@marsai/database`.   
The *backend* uses everything from `@marsai/database`: the models and the ORM client code to interact with the database using JS objects.

The project uses a **feature-based folder structure**
where there is one folder per feature, for example: `packages/backend/src/features/vote` (singular).
This folder contains all the related files,
such as:`vote.routes.ts`, `vote.controller.ts`, `vote.validation.ts`, and `vote.service.ts`.


```
├── package.json
├── package-lock.json
├── node_modules/
├── packages
│    ├── database/
│    │    ├── .env.example
│    │    ├── package.json
│    │    ├── prisma/                         Contains database schema definition and migrations (with Prisma ORM syntax)
│    │    │   ├── schema.prisma               Database schema
│    │    │   └── migrations/                 Database migrations
│    │    |       └── 20260130101437_add_is_active_to_users/
│    │    |           └─- migration.sql
│    │    └── src                     
│    │        └── generated/
│    │            └── prisma/
│    ├── backend/
│    │    ├── .env.example
│    │    ├── package.json
│    │    ├── src/
│    │    │   ├── features/
│    │    │   │   │
│    │    │   │   └─── vote/                   Contains code related to the voting feature
│    │    │   │       ├── vote.routes.ts      Define routes to map URLs to controllers
│    │    │   │       ├── vote.controller.ts  Handle HTTP request/response
│    │    │   │       ├── vote.validation.ts  Validate input with Joi schemas
│    │    │   │       └── vote.service.ts     Handle the Business logic operations
│    │    │   │
│    │    │   ├── common/
│    │    │   │   ├── middlewares/
│    │    │   │   │   └── auth_middleware.ts
│    │    │   │   │
│    │    │   │   └── utils/
│    │    │   │       └── hash.ts
│    │    │   │
│    │    │   ├── integrations/
│    │    │   │   ├── youtube/
│    │    │   │   │   ├── youtube.client.ts
│    │    │   │   │   └── youtube.service.ts
│    │    │   │   └── email/
│    │    │   │       ├── email.service.ts
│    │    │   │       └── templates/
│    │    │   │
│    │    │   ├── config/
│    │    │   │   ├── prisma.ts
│    │    │   │   ├── environment.ts
│    │    │   │   └── constants.ts
│    │    │   │
│    │    │   ├── loaders/
│    │    │   │   ├── express.ts
│    │    │   │   ├── routes.ts
│    │    │   │   └── i18n.ts
│    │    │   │
│    │    │   └── app.ts
│    │    │
│    │    └── tests/
│    │
     └── frontend/
         ├── package.json
         ├── .env.example
  ```

The table below explains what are the folders:

| Folder          | Purpose                                                                                |
|-----------------|----------------------------------------------------------------------------------------|
| `features/`     | Business domain modules, each self-contained (routes, controller, validation, service) |
| `common/`       | Shared utilities, middlewares, and validators                                          |
| `integrations/` | External service connections (YouTube API, Email Service Provider)                     |
| `config/`       | Environment and application configuration                                              |
| `loaders/`      | Application bootstrapping and initialization                                           |
| `tests/`        | Tests (mirrors the `src/` structure)                                                   |

> [!NOTE]
> The feature folder does not contain `vote.model.js` nor `vote.dal.js`
because [Prisma](https://github.com/prisma/prisma), the ORM library we are using,
handles the model and Data Access Layer (DAL) for us.

## How to Contribute

### Reporting Bugs

#### Bug Report Template

### Suggesting Enhancements

#### Feature Request Template

### Finding Issues to Work On (good first issue, help wanted)


## Development Workflow

### Setting Up Your Development Environment

### Branching Strategy

### Commit Message Convention

### Code Style and Formatting

### Writing Tests

### Running the CI Locally


## Submitting Changes

### Creating a Pull Request

### Pull Request Checklist

### Review Process and Timeline


## Release Process
