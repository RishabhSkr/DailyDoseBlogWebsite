# Server Side-Blog Website
## Backend - Cloudflare Worker
- Cloudflare workers in the backend
- zod as the validation library, type inference for the frontend types
- Typescript as the language
- Prisma as the ORM, with connection pooling
- Postgres as the database
- jwt for authentication
 
- Uses the `hono` framework instead of `express`
## Steps 
- create backened Dir 

   ```cd backened ```
   
```bash
    # Install hono framework
    npm create hono@latest
```
- created routes index.ts
- 
- Uses `wrangler` to deploy the worker
- Utilizing `prisma` as the ORM for database interactions.
    - prisma setup:
    ```bash
        # Install hono framework
        npm create hono@latest
        #setup route
         Initialize DB (prisma)
            1. Get your connection url from neon.db or aieven.tech
            postgres://avnadmin:password@host/db
            
            2. Get connection pool URL from Prisma accelerate
            https://www.prisma.io/data-platform/accelerate
            prisma://accelerate.prisma-data.net/?api_key=eyxxxxxx
            
            3. Initialize prisma in your project
            Make sure you are in the backend folder
            npm i prisma
            npx prisma init
            
             
            Replace DATABASE_URL in .env
            DATABASE_URL="postgres://avnadmin:password@host/db"
            
            Add DATABASE_URL as the connection pool url in wrangler.toml
            name = "backend"
            compatibility_date = "2024-11-23"
            
            [vars]
            DATABASE_URL = "prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJ
- created a schema design
    - User and Post schema as Prisma Doc
## Migration and Connection
```bash
    # Migrate your database
        npx prisma migrate dev --name init_schema
    # Generate the prisma client 
        npx prisma generate --no-engine

    # Add the accelerate extension
        npm install @prisma/extension-accelerate

    # Initialize the prisma client
        import { PrismaClient } from '@prisma/client/edge'
        import { withAccelerate } from '@prisma/extension-accelerate'

       
```
## Authentication- use honojwt- similar jwt in express
- created sighup route- add this 
```bash 
        const prisma = new PrismaClient({
            datasourceUrl: env.DATABASE_URL,
        }).$extends(withAccelerate())
```
- Add jwt signup route
-