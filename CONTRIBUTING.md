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

We use a **monorepo**, that is a Git repository containing both the **frontend and** the **backend**.

**Using a monorepo offers the following advantages:**

- **Shared code and types:**  
  The *frontend* and *backend* can share types, constants, and validation schemas from a single source of truth 
  (e.g. `@marsai/database`), avoiding duplication and keeping them in sync.
- **Atomic changes:**  
  A single commit or PR can update the database schema, backend API, and frontend together, ensuring they stay compatible.
- **Simplified dependency management:**  
  One `npm install` at the root installs everything.  
  Shared dependencies are hoisted and deduplicated automatically via *npm workspaces*.
- **Easier code reviews:**  
  Reviewers can see the full picture of a change (database + backend + frontend) in a single PR rather than coordinating across multiple repositories.
- **Consistent tooling and configuration:**    
  Linting rules, formatting, CI/CD pipelines, and Git hooks are configured once and apply to all packages.

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

> [!NOTE]
> This project uses a very lightweight **[Git Flow](https://danielkummer.github.io/git-flow-cheatsheet/)**
> branching workflow to develop, integrate, release new features, and fix bugs.
>
> **Why did we make this change?**
>
> Usually, `main` is the default branch and serves both for the "integration" and deployment to production,
> which makes these processes brittle.
>
> **What is this change about?**
>
> To facilitate the integration of several features, we created the `dev` branch.  
> This is where we share the common code with the team.  
> It also serves as an integration branch to ensure that all the merged-in features work properly.
>
> This new branching scheme makes `dev` the new default branch.
>
> [issue #1](https://github.com/ebouchut/mars-ai-project/issues/1) introduced this change.

We use a **monorepo**, meaning it contains both the **frontend and** the **backend**.

The **branches**:

- Main branch: **`dev`**
    - The repository uses this branch as the primary one for development and pull requests.
    - It acts as an "integration" branch contains the common code and serves as a safety net.
    - This branch contains the code shared with the team.
    - This is the **default branch**, meaning it is the one we are on
      after cloning this repository, where we merge our feature branches via PRs.
    - It is also where we test that the merged features do not break the website.    
      Once we are confident the code on `dev` can be deployed to production, we merge `dev` into `main`.
    - We should not commit directly to `dev`, but create a PR (Pull Request) to bring in changes.
    - We have configured `dev` to require two approvals before merging to `dev`.
- **`main`** contains the production-ready code.
    - This is where the team merges `dev` after ensuring that the new features on `dev`
      are working properly together.
    - This branch is used for deployment.

We create **temporary branches** to develop a **feature** or **fix** a bug:

- **`feat/my-feature-description-here`** denotes a feature branch.  
  The naming convention may seem a bit convoluted, but refer to the kind of branch it is (`feat`: this is a feature), and what the branch will bring when merged to `dev` (`my-feature-description-here` should be a quick, hyper-consise, and high level description of the feature, using just a few all-lowercase words separated with an hyphen).  
  For instance: `feat/add-footer`.
- **`fix/concise-bug-description-here`** a bug fix branch  
  We create a bug fix branch, such as `fix/broken-link-page-footer`, when the website breaks in production.


```mermaid
gitGraph
    commit
    branch dev
    checkout dev
    branch feat/add-home-page
    checkout feat/add-home-page
    commit
    commit
    checkout dev
    merge feat/add-home-page

    branch feat/add-footer
    commit
    commit
    checkout dev
    merge feat/add-footer

    checkout main
    merge dev
    commit type: HIGHLIGHT tag: "bug found"
    checkout main
    branch fix/htaccess
    commit
    checkout main
    merge fix/htaccess
    checkout dev
    merge fix/htaccess
```

### Commit Message Convention

### Code Style and Formatting

### Writing Tests

### Running the CI Locally


## Submitting Changes

### Creating a Pull Request

### Pull Request Checklist

### Review Process and Timeline


## Release Process
