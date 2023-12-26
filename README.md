# Payrup API - SSO Proxy Service

![Nest Logo](https://nestjs.com/img/logo_text.svg)

## Introduction

Welcome to the Payrup API - SSO Proxy Service project, powered by [NestJs](https://nestjs.com), a high-performance TypeScript framework.

## Features

- **Comprehensive Framework:** Built on NestJs, a versatile framework that covers a wide range of scenarios and provides excellent documentation.
- **Typeorm Integration:** Utilizes [Typeorm](https://typeorm.io/) for efficient database interactions.
- **Powerful Validation:** Employs [Zod](https://zod.dev/), a TypeScript-first schema validation library, for robust data validation and enhanced Swagger documentation.
- **Unit Testing:** Embraces a test-driven approach using [Jest](https://jestjs.io/) and [NestJs Testing](https://docs.nestjs.com/fundamentals/testing), ensuring that no code goes without proper unit testing.

## Prerequisites

Before diving into this project, it's recommended to familiarize yourself with the following technologies:

- [NestJs](https://nestjs.com): Learn about the core concepts and architecture of the NestJs framework.
- [Typeorm](https://typeorm.io/): Explore how to integrate and work with Typeorm for efficient database interactions.
- [Zod](https://zod.dev/): Understand how Zod can enhance data validation and facilitate Swagger documentation.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://teckborn-technology@dev.azure.com/teckborn-technology/payrup-microservices/_git/sso-proxy-service
   ```

2. **Install project dependencies:**

   ```bash
   npm install
   ```

## Configuration

To set up your environment, copy the .env.sample file to .env and update it according to your needs.

```bash
   #windows
   copy .env.sample .env

   #unix/bash
   cp .env.sample .env
```

## Setting up the environment locally

to setup database in docker with docker cli

```bash
#create/run db
docker compose up
or
docker-compose up

#remove/stop db
docker compose down
or
docker-compose down
```

This will set up the local database. You can then connect using mySql workbench/ mongoDb Compass or any preferred mySql/mongo client.

## Usage

1. **Running:**

   ```bash
   #development
   npm run dev

   #watch mode
   npm run watch

   #production mode
   npm run start:prod
   ```

2. **Access the application and Swagger Documentation in your browser:**

   Open your browser and navigate to:

   ```bash
   http://localhost:8000
   ```

## Migrations

To manage database changes incrementally and maintain a structured database schema, this project uses typeorm migrations. Follow the steps below to generate and apply migrations :

1. **Create or Update Entity**

   If you include a new schema, make sure to add it under `src/entities/ServiceName/index.ts` file. This step ensures that your new entity is included in the migration process. For example:

   ```ts
   ...
   import { YourEntitySchemaFileName } from './YourEntitySchemaFileName';

   export const AllBaseTypeormEntities: EntitySchema[] = [ExistingEntitySchemaFile, YourEntitySchemaFileName]
   ```

2. **Generate a Migration (SQL):**

   ```bash

   #windows
   npm run typeorm:generate-migration-windows --service=<service_name> --migration=<migration_name>

   #mac/linux
   npm run typeorm:generate-migration-mac-linux --service=<service_name> --migration=<migration_name>


   ```

   Instead of <service_name> add your DB_SERVICE_NAME and Instead of <migration_name> add your migration name and run the above command in your terminal

   **example**

   ```bash
   #windows
   npm run typeorm:generate-migration-windows --service=ExampleService --migration=addUser

   #mac/linux
   npm run typeorm:generate-migration-mac-linux --service=ExampleService --migration=addUser

   ```

   This will generate a migration file under `src/migrations/SERVICE` eg: `src/migrations/ExampleService`

3. **Include Migration:**

   After generating a migration file, make sure to include it in the migration index file for proper execution. Open `src/migration/SERVICE/index.ts` Inserted of `SERVICE` it should be service-name eg: `ExampleService` and add an import statement for your new migration file. For example:

   ```ts
   import { YourGeneratedMigrationFileName } from './YourGeneratedMigrationFileName'

   export const ExampleMigrations = [
     ExistingMigrationFile,
     YourGeneratedMigrationFileName,
   ]
   ```

## Tests

Run tests to ensure code quality:

1. **Run the tests:**

   ```bash
   npm run test:dev
   ```

2. **Run the tests on watch:**

   ```bash
   npm run test:dev:watch
   ```

3. **Check the test results and coverage report:**
   ```bash
   npm run test:dev:cov
   ```
