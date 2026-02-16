# marsAI - International AI Film Festival


## About the Project

Mars Artificial Intelligence Festival (*marsAI*) is a film festival in Marseille (France) 
for one-minute films made entirely by Artificial Intelligence.

This project is a co-creation between [La Plateforme](https://laplateforme.io) (digital school in Marseille) and the [Mobile Film Festival](https://www.mobilefilmfestival.com).


## Description

*marsAI* celebrates human creativity at the intersection of filmmaking and artificial intelligence. 
The festival theme for this inaugural edition is **Imaginez des futurs souhaitables** (Imagine Desirable Futures).
The platform serves as the digital hub for film submissions, public viewing of finalist works, jury evaluation, and festival administration.

### Key Metrics

Based on *Mobile Film Festival*'s track record with international competitions, the project targets representation from over **120 countries**, more than **600 film submissions** during the call for projects, and a minimum of **3,000 visitors** at the physical event in **Marseille**.

From all submissions, **50 short films will be selected** for the official competition.

### Project Timeline

The project follows a 10-week development cycle divided into three phases: *Conception*, *UI/UX Design* (Figma), and *Development*.


## Features

### Submission Portal

Filmmakers create profiles, submit their 1-minute films, and document the AI tools used throughout their creative process. Videos are hosted externally on YouTube; the platform embeds them after copyright validation.

### Public Gallery

Visitors browse and watch all 50 finalist films. The gallery supports filtering by category, AI tool type, and keyword search. Social sharing and newsletter subscription are available without authentication.

### Jury Interface

A private, secure voting system allows jury members to rate films on a scale of 1 to 10 and provide comments. Each jury member has an individual dashboard to prevent influence from other members' ratings.

### Admin Dashboard

Administrators access moderation tools, partner management, and statistical insights including film origin by country and most-used AI tools.

### Copyright Verification

Integration with YouTube Data API validates music and image rights before submitted films hosted on YouTube are listed on the platform.

### Bilingual Support

The entire interface is available in *French* and *English* via i18n (internationalization).


## Tech Stack

marsAI is built with the following:

- Dev Tooling:
  - [`npm`](https://en.wikipedia.org/wiki/Npm) version 11.7+
  - [fnm](https://github.com/Schniz/fnm) _Fast Node Manager_ allows installing and switching Node versions.
      - [Installation](https://github.com/Schniz/fnm?tab=readme-ov-file#installation)
      - [Configuration](https://github.com/Schniz/fnm?tab=readme-ov-file#completions)
  - [`git`](https://en.wikipedia.org/wiki/Git) (ideally the latest version)
- Database:  
    - [MySQL](https://en.wikipedia.org/wiki/MySQL) version 8.4+
- Backend:  
    - [Express](https://expressjs.com/)
    - [Node.js](https://en.wikipedia.org/wiki/Node.js) version 24+
    - [Joi](https://joi.dev/) for input validation  
      We use Joi to define a schema that describes valid JSON data 
    - [Prisma](https://github.com/prisma/prisma) ORM
- Frontend:  
    - [React.js](https://en.wikipedia.org/wiki/React_(software))
    - Styling:  
        - [Tailwind CSS](https://en.wikipedia.org/wiki/Tailwind_CSS)
- Architecture:  
    - MVC Pattern

### Additional Requirements

- Unit testing on critical functions
- *WCAG* accessibility compliance
- Mobile First responsive design
- *Lighthouse* performance optimization

## Prerequisites

Prerequisites

Before getting started, ensure the following software is installed with the required versions:

- **[`Git`](https://git-scm.com/install/)**: latest stable version
- [fnm (Fast Node Manager)](https://github.com/Schniz/fnm?tab=readme-ov-file#installation)
    - **macOS** (with [Homebrew](https://brew.sh)):  
      ```shell
      brew install fnm
      ```
      Then update your [shell dotfiles](https://github.com/Schniz/fnm?tab=readme-ov-file#shell-setup) 
    - **Windows**:  
- [Node.js}(https://nodejs.org/en/download): version 24+ LTS (important)    
  Install _Node.js_ and `npm` with `fnm`, like so:  
  ```shell
  cd  mars-ai-project
  fnm use
  ```
- MySQL: version 8.4+

## Installation

Make sure you meet the [prerequisites](#Prerequisites) which are necessary for the next steps.

- **Clone** the project  
  ```shell
  git clone https://github.com/ebouchut/mars-ai-project.git
  cd mars-ai-project
  ```
- Install **all** dependencies (`database`, `backend`, `frontend`)  
  ```shell
  # cd mars-ai-project  
  npm install         # From the project root folder
  ```

## Configuration

### Environment Variables

> [!NOTE]
> The **environment variables** containing **sensitive information**
> (such as **database username and password**, database name...)
> should be declared in a file named **`.env`**.
> When starting up, the application:
>
> 1. reads the `.env` file,
> 1. exports the variables declared in this file as environment variables
> 1. accesses variables like so:
>     ```js
>     import 'dotenv/config'
>
>     // ...
>     env('DATABASE_URL')  // => Return the value of the DATABASE_URL
>     ```

> [!IMPORTANT]
> The `.env` file MUST NOT be under version control.
> Never ever git commit this file.

**Create and populate the `.env` files.**

1. Copy [`.env.example`](https://github.com/ebouchut/mars-ai-project/blob/dev/packages/backend/.env.example) as `.env`
1. Edit and adjust the variables in `.env`

```shell
cd backend
cp .env.example .env

# Edit backend/.env and update the variables according to your development environment:
#   - DATABASE_HOST=TODO_HOST_HERE
#   - DATABASE_PORT=TODO_PORT_HERE
#   - DATABASE_USER=TODO_USERNAME_HERE
#   - DATABASE_PASSWORD=TODO_PASSWORD_HERE
#   - DATABASE_NAME=TODO_DATABASE_NAME_HERE
#
#   - DATABASE_URL=TODO_SEE_.env_FOR_DETAILS
#   - SHADOW_DATABASE_URL=TODO_SEE_.env_FOR_DETAILS
```

### Database Setup

#### Creating the Databases

You will now run **once** a SQL script below to create two databases and a database user.
Then you will give it access to these databases.


1. Make your own copy of the database creation script [packages/database/create-database.sql](https://github.com/ebouchut/mars-ai-project/blob/dev/packages/database/create-database.sql)
   ```sql
   -- Create the databases for the marsAI project and the database user
   -- Replace the database names, username and password with your current configuration in .env.
   
   CREATE DATABASE IF NOT EXISTS marsai                          DEFAULT CHARACTER SET utf8mb4;
   CREATE DATABASE IF NOT EXISTS prisma_migrate_shadow_db_marsai DEFAULT CHARACTER SET utf8mb4;
   
   CREATE USER IF NOT EXISTS marsai@localhost IDENTIFIED BY 'TODO_PASSWORD_HERE';
   
   GRANT ALL PRIVILEGES ON marsai.*                          TO marsai@localhost;
   -- See: https://www.prisma.io/docs/orm/prisma-migrate/understanding-prisma-migrate/shadow-database
   GRANT ALL PRIVILEGES ON prisma_migrate_shadow_db_marsai.* TO marsai@localhost;
   GRANT CREATE, DROP   ON *.*                               TO marsai@localhost;
   FLUSH PRIVILEGES;
   ```
   Where:
   - `marsai` denotes the main database
   - `prisma_migrate_shadow_db_marsai`  Prisma (the ORM and migration tool) 
     uses this shadow database to detect if a migration introduces unexpected changes such as schema drift and potential data loss.
     This database contains the N-1 version of the database (before the migration).
1. Edit the copy to adjust all the variables according to your current database configuration  
   (database name, database username and password...).
1. log in to MySQL as `root`
1. Run your copy of the SQL script 
1. Create the database **structure** (tables...) and add the **seeds**:
   ```shell
   cd mars-ai-project

   npm run db:migrate dev
   npm run db:seed
   ```


## Usage

### Running the Application

#### Development Mode

- Run the backend:
  ```shell
  # cd mars-ai-project
  npm run dev:backend
  ```
- Run the frontend:
  ```shell
  # cd mars-ai-project
  npm run dev:frontend
  ```


## Contributing

### Database Schema

This section describes how the database is structured.
The *marsAI* platform uses a MySQL relational database to persist entities.

We try to stick to
[Prisma's naming conventions](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#naming-conventions) 
for entities, fields, enums...


#### Database Naming Conventions

Here are the naming conventions for the **name** of our database **tables**:

- All lowercase
- Plural
- Use underscore for multi words names: `social_networks`
- Less than 64 characters (because of a MySQL constraint)

Do not use an underscore as the first character.


#### Database ERD Diagram

The **Entity Relationships Diagram** (ERD) is available as:

- an [SVG image](https://raw.githubusercontent.com/ebouchut/mars-ai-project/dev/docs/ERD.svg)
- a [page with a commented ERD diagram](docs/ERD.md)

> [!NOTE]
> This diagram uses [Crows's foot notation](https://mermaid.js.org/syntax/entityRelationshipDiagram.html#relationship-syntax) 
> for the **cardinality of relationships**, where:
>
> - `o|` denotes `0..1` (zero or one)
> - `||` denotes Exactly one
> - `o{` denotes `0..n` (zero or more)

> [!TIP]
> If you want to create an Entity Relationship Diagram (ERD) like this one, 
> then take a look at [Mermaid.js](https://mermaid.js.org/intro/).
> With this syntax embedded in a Markdown file, GitHub issue, 
> you can easily create many types of diagrams such as sequence/flow/class/state diagrams to only name a few.
>
> GitHub among many other [tools, IDEs and platforms support Mermaid diagrams](https://mermaid.js.org/ecosystem/integrations-community.html#community-integrations).
>
> To give Mermaid diagrams a whirl, you can use the [free online visual editor](https://mermaid.live/) to build your first diagram, 
> share it with others and even export it to various formats.


### Update the Database Schema

> [!NOTE]
> **What is Prisma?**  
The project uses [Prisma](https://www.prisma.io/), which is an ORM (Object Relation Mapper) and database migration tool.
The **database schema** [`packages/database/prisma/schema`](https://github.com/ebouchut/mars-ai-project/blob/dev/packages/database/prisma/schema.prisma)
contains the description of the **database structure**: entities, enums, relationships, and cardinalities.
It is the **source of truth**, which means you never modify the database directly,
> Prisma does it for you using the schema.


To add, remove, an entity or a field/property we need to update the database schema.
It serves as a source of truth and and is used to generate and update the database.

Here is the **workflow** to add/update/remove the database structure (table, table column, relationship, enum value).

> [!IMPORTANT]
> Run the `npm` commands **from the project root folder**.

1. **Update** the **database schema** in [`packages/database/prisma/schema`](https://github.com/ebouchut/mars-ai-project/blob/dev/packages/database/prisma/schema.prisma).  
   Say for instance, you add the `emailVerifiedAt` property to the `User` entity, like so:
   ```prisma
   emailVerifiedAt  DateTime?  @db.Timestamp(0) @map("email_verified_at")
   ```
1. Generate the SQL migration file and apply it to the database:
   ```shell
   # cd mars-ai-project
   npm run db:migrate dev --name add-email-verified-at-to-users
   
   # same as 
   # npm run prisma migrate dev --name add-email-verified-at-to-users -w @marsai/database
   ```
   This command:

    - generates a SQL script named `migration.sql` in `packages/database/prisma/migrations/TIMESTAMP_add_email_verified_at_to_users/`.
    - applies this migration to the database which adds the `email_verified_at` column to the `users` table.

   Adjust the [kebab-case](https://en.wikipedia.org/wiki/Letter_case#Kebab_case) name (after `--name `)
   in this example to reflect the actual changes.
2. Generate the [Prisma Client](https://www.prisma.io/docs/orm/prisma-client) code:
   ```shell
   # cd mars-ai-project
   npm run db:generate
    
   ``` 

> [!INFO]]
> What is the Prisma client?
>
> The **Prisma client** code is composed of ORM type-safe classes:
> - **models** (such as `User`, `Film`, `Vote`), **enums**, and **input/output shapes**.
    >   You can find them in [`packages/database/src/generated/prisma/models/`](https://github.com/ebouchut/mars-ai-project/tree/dev/packages/database/src/generated/prisma/models).
> - **Query API**
    >     - **CRUD methods** for each model: `prisma.user.create()`, `prisma.film.findMany()`, `prisma.work.delete()`...
>     - **Query builder**: `where`, `include`, `select`, `orderBy`...
> - **Autocomplete** so that your IDE knows every field, relation, and filter available


> [!INFO]]
> **Why and when should I regenerate the Prisma client?**
>
> Each time you modify the database schema you need to regenerate the Prisma client code.
> This ensures the database schema and the code to query and model entities remain in sync.


The _backend_ uses `client.ts` containing the generated models and the ORM API to query the database.
```ts
import { PrismaClient, User, Vote, Film, Jury } from "../src/generated/prisma/client.js"
```

The _frontend_ uses `browser.ts` only containing the models because it does not interact with the database
```ts
import { User, Vote, Film, Jury } from "../src/generated/prisma/browser.js"
```

### Apply the Latest Database Migrations

Once you heave picked up the latest changes from the upstream `dev` branch,
you need to apply the latest database migrations as follows:

```shell
npm run db:migrate dev

# equivalent to:
# npm run prisma migrate dev -w @marsai/database
```

### API Documentation


### Running Tests

The project uses [Vitest](https://vitest.dev/) as its testing framework across all packages.

**Resources:**
- [Vitest Getting Started](https://vitest.dev/guide/)
- [Vitest API Reference](https://vitest.dev/api/)
- [Testing Best Practices](https://vitest.dev/guide/features.html)

#### Run All Tests

From the project root:
```shell
npm test
```

This runs tests across all three packages (`@marsai/database`, `@marsai/backend`, `@marsai/frontend`).

#### Run Tests for a Specific Package

```shell
# Database tests
npm test -w @marsai/database

# Backend tests
npm test -w @marsai/backend

# Frontend tests
npm test -w @marsai/frontend
```

#### Test Modes

- **Watch mode** (default) — reruns tests on file changes:
  ```shell
  npm test -w @marsai/backend
  ```

- **Single run** — runs once and exits (useful for CI):
  ```shell
  npm run test:run -w @marsai/backend
  ```

- **With coverage** — generates coverage reports:
  ```shell
  npm run test:coverage -w @marsai/backend
  ```

- **With UI** — opens an interactive browser interface:
  ```shell
  npm run test:ui -w @marsai/backend
  ```



### Add Dependencies

In the example below we **add** the following dependencies (`npm` packages in our case) 
to the **frontend** (`@marsai/frontend`):

- Runtime dependencies
    - `react`
    - `react-dom`
- Development dependency:
    - `@types/react` 


```shell
# IMPORTANT: run npm from the project root folder:
cd mars-ai-project   
  
npm install react react-dom         -w @marsai/frontend
npm install --save-dev @types/react  -w @marsai/frontend
```

Where:

- The first `npm install` line, adds the `react` and `react-dom` **runtime** dependencies (also used in the production environment).
- The second line `npm install` line, adds a **development** dependency ,that will not be used in the production environment.
- `--save-dev` specify that the `@types/react` package is a development dependency that won't be used at runtime (production). 
- `-w @marsai/frontend` specify where to add the npm packages: the _frontend_ npm workspace (in the `packages/frontend/` folder) 



## License

This project is developed for educational purposes as part of the CDPI program at [La Plateforme_](https://laplateforme.io) in partnership with [Mobile Film Festival](https://www.mobilefilmfestival.com).

🇺🇸 This project is dual-licensed under AGPL v3 for open source use and a commercial license for proprietary use. Contact ebouchut@gmail.com for commercial licensing.

🇫🇷 Ce projet est sous double licence AGPL v3 pour une utilisation open source et sous licence commerciale pour une utilisation propriétaire. Contactez ebouchut@gmail.com pour obtenir une licence commerciale.


## Authors

We are a team of five:

- Eva DAUMAS:  [GitHub](https://github.com/eva-daumas)
- Salah BELHASSAN: [GitHub](https://github.com/salah-eddine)
- Alex BACHIR: [LinkedIn](https://www.linkedin.com/in/alex-bachir-108ba5339/) | [GitHub](https://github.com/alex-bachir)
- Benjamin ASTIER: [GitHub](https://github.com/Septieme7)
- Eric BOUCHUT: [LinkedIn](https://linkedin.com/in/ebouchut) | [GitHub](https://github.com/ebouchut)

## Acknowledgments

Thank you to **our instructors** for their involvement and help:
 
- [Alejandro Seijo](https://www.linkedin.com/in/alejandro-f-seijo-1541aa189/),
- [Jean-César Bazin](https://www.linkedin.com/in/jean-c%C3%A9sar-bazin-a7bab9176/),
- Aubry
- [Esteban Bare](https://www.linkedin.com/in/esteban-bare-337927284/).
