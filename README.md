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
  - [fnm](https://github.com/Schniz/fnm) _Fast Node Manager_ allows installing and switching Node versions.
      - [Installation](https://github.com/Schniz/fnm?tab=readme-ov-file#installation)
      - [Configuration](https://github.com/Schniz/fnm?tab=readme-ov-file#completions)
  - [`npm`](https://en.wikipedia.org/wiki/Npm) version 11.7+ ‒ the default package manager for *Node.js*.
  - [`git`](https://en.wikipedia.org/wiki/Git)  ‒ a distributed version control system that tracks changes in code
- Database:[MySQL](https://en.wikipedia.org/wiki/MySQL) version 8.4+
- Backend:  
    - [Node.js](https://en.wikipedia.org/wiki/Node.js) version 24+
    - [Express](https://expressjs.com/) ‒ a minimal Node.js framework that handles HTTP routing, middleware chaining, 
      and request/response processing, giving you the foundation to build a full application server 
      with authentication, validation, error handling, and business logic layers on top.
    - [Prisma](https://www.prisma.io/) is both:
        - an **ORM** (library) that translates JavaScript method calls on entities/models into SQL queries on database tables, 
        - a CLI tool to handle **database migrations** to generate, apply, revert changes to the database.    
          The database migration (SQL file) and ORM client code are generated based on changes made to the *database schema* 
          that acts as a *source of truth*).
    - [Joi](https://joi.dev/) for defining schemas that describe valid [JSON](https://en.wikipedia.org/wiki/JSON) input data
- Frontend:  
    - [React.js](https://en.wikipedia.org/wiki/React_(software))
    - [Tailwind CSS](https://en.wikipedia.org/wiki/Tailwind_CSS) (Styling)
- Testing: [Vitest)(https://vitest.dev/) Testing framework
- I18N (Internationalization): [i18next](https://www.i18next.com/)
- Languages:
    - [TypeScript](https://www.typescriptlang.org/)  
      All woskspace packages in this project use *TypeScript* ‒ a strongly typed programming language that builds on [JavaScript](https://en.wikipedia.org/wiki/JavaScript).
    - [SQL](https://en.wikipedia.org/wiki/SQL) We use *Prisma*, an ORM that maps entities 
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
- [Node.js](https://nodejs.org/en/download): version 24+ LTS (important)    
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

**Create and populate the `.env` files in `packages/database` and `packages/backend`.**

1. Copy [`.env.example`](https://github.com/ebouchut/mars-ai-project/blob/dev/packages/backend/.env.example) as `.env`
   ```shell
   cp packages/backend/.env.example  packages/backend/.env
   cp packages/database/.env.example packages/database/.env
   ```
1. Edit and adjust the variables in `.env` files
   ```txt
   # Edit both .env files and update the variables according to your development environment:
   #   - DATABASE_HOST=TODO_HOST_HERE
   #   - DATABASE_PORT=TODO_PORT_HERE
   #   - DATABASE_USER=TODO_USERNAME_HERE
   #   - DATABASE_PASSWORD=TODO_PASSWORD_HERE
   #   - DATABASE_NAME=TODO_DATABASE_NAME_HERE
   #
   #   - DATABASE_URL=TODO_SEE_.env_FOR_DETAILS
   #   - SHADOW_DATABASE_URL=TODO_SEE_.env_FOR_DETAILS
   #
   #   # Only in packages/backend/.env
   #   - JWT_SECRET=TODO_YOUR_SECRET_KEY_HERE
   #   - JWT_EXPIRES_IN=1h
   #   - JWT_ISSUER=marsai
   ```

> [!IMPORTANT]
> The `.env` file MUST NOT be under version control.
> **NEVER** ever git **commit** `.env` files.
> It is already [gitignored](https://github.com/ebouchut/mars-ai-project/blob/eb9e413659b8ef4d215945be18bdcd356b685bc4/.gitignore#L81-L84).
> 
> The `.env`  file defines **environment variables** which contains **sensitive information**,
> such as **database username and password**, database name...


> [!NOTE]
> How to read variables defined in `.env`?
> 
> When starting up, the application reads the `.env` file and exports its variables 
> as environment variables.    
> You can then read variables defined `.env` like so:
> ```js
> import "dotenv/config"
> // ...
> process.process.env.DATABASE_URL  // => Return the value of DATABASE_URL
> ```

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
1. Create the database **structure** (tables...) and add the **seeds**, like so:
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

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines, including:

- Architecture overview and directory structure
- Code documentation
- Naming conventions
- Database schema, ERD (Entity Relationships Diagram)
- Git branching strategy and commit conventions
- Updating the database schema (Prisma workflow)
- Adding dependencies
- Running tests
- Submitting pull requests
- ...

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
- [Aubry Capitone](https://www.linkedin.com/in/a-capitone/)
- [Esteban Bare](https://www.linkedin.com/in/esteban-bare-337927284/).
