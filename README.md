# TYPESCRIPT EXPRESS REST APIS WITH AUHENTICATION & PRISMA ORM

This is open source project, please feel free to contribute and make this project as production starter. Detailed documentation will be added later.

This project uses express-validator for validations, jwt for authentication and argon2 for hashing the password.

## Getting started

### 1. Download and install dependencies

Install npm dependencies:

```
cd express-rest-auth-prisma
npm install
```

### 2. Switch to database (e.g. PostgreSQL, MySQL, SQL Server, MongoDB)

You can adjust the the database connection in [`prisma/schema.prisma`](./prisma/schema.prisma) by reconfiguring the `datasource` block.

Learn more about the different connection configurations in the [docs](https://www.prisma.io/docs/reference/database-reference/connection-urls).

<details><summary>Expand for an overview of example configurations with different databases</summary>

### PostgreSQL

For PostgreSQL, the connection URL has the following structure:

```prisma
datasource db {
  provider = "postgresql"
  url      = "postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA"
}
```

Here is an example connection string with a local PostgreSQL database:

```prisma
datasource db {
  provider = "postgresql"
  url      = "postgresql://janedoe:mypassword@localhost:5432/notesapi?schema=public"
}
```

### MySQL

For MySQL, the connection URL has the following structure:

```prisma
datasource db {
  provider = "mysql"
  url      = "mysql://USER:PASSWORD@HOST:PORT/DATABASE"
}
```

Here is an example connection string with a local MySQL database:

```prisma
datasource db {
  provider = "mysql"
  url      = "mysql://janedoe:mypassword@localhost:3306/notesapi"
}
```

### Microsoft SQL Server

Here is an example connection string with a local Microsoft SQL Server database:

```prisma
datasource db {
  provider = "sqlserver"
  url      = "sqlserver://localhost:1433;initial catalog=sample;user=sa;password=mypassword;"
}
```

### MongoDB

Here is an example connection string with a local MongoDB database:

```prisma
datasource db {
  provider = "mongodb"
  url      = "mongodb://USERNAME:PASSWORD@HOST/DATABASE?authSource=admin&retryWrites=true&w=majority"
}
```

Because MongoDB is currently in [Preview](https://www.prisma.io/docs/about/releases#preview), you need to specify the `previewFeatures` on your `generator` block:

```
generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["mongodb"]
}
```

</details>


### 3. Congfiure, create and seed the database

Run the following command to create your MySQL migration. This also creates the `User` and `Sesssion` tables that are defined in [`prisma/schema.prisma`](./prisma/schema.prisma):

```
npx prisma migrate dev --name init
```

When `npx prisma migrate dev` is executed against a newly created database, seeding is also triggered. The seed file in [`prisma/seed.ts`](./prisma/seed.ts) will be executed and your database will be populated with the sample data.

### 4. Start the REST API server

```
npm run dev
```

The server is now running on `http://localhost:3000`. You can now the API requests, e.g. [`http://localhost:3000/api/v1/users`](http://localhost:3000/api/v1/users).

Execpt register and login endpoints all endpoints requires valid jwt token.

## Using the REST API

You can access the REST API of the server using the following endpoints:

### `GET`

- `/api/v1/users`: Fetch all users

### `POST`

- `/api/v1/users/register`: Create a new user
  - Body:
    - `email: String` (required): The email address of the user
    - `password:` (required): The password of the user
    - `fullName: String` (optional): The name of the user

- `/api/v1/users/login`: Login a user
  - Body:
    - `email: String` (required): The email address of the user
    - `password:` (required): The password of the user


### `PUT`

- todo

### `DELETE`

- todo

## Next steps

- Check out the [Prisma docs](https://www.prisma.io/docs)
