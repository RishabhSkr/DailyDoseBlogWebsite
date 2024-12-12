# Daily Dose- MERN Blog Website [DailyDose](https://daily-dose-blog-website.vercel.app/)
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
- Add jwt signup/signin route
- Add the blog request route
- Add middleware to verify the token (before the blog request route)
- create `zod` schema for `validation` for user and blog
- make zod validatons common for frontend and backend
    - created a common repo for zod schema
    - move the zod schema to the common/src folder /index.ts
    - creating a tsconfig.json file in the common folder
    ```bash 
        npm init -y
        npx tsc --init
        #build the common package
        npx tsc -build
        # modify the package.json file
            rootDir: "src/",
            outDir: "dist/",
            declaration: true, // d.ts files created 
    ```
- publish the common repo to npm
    - create a new repo in github
    - push the code to the repo
    - create a new npm package
        - give the package name unique (packgae.json)
        - create a new version
        - cmd - npm login
        - cmd - npm publish --access public (to access the package publicly)
    - publish the package
    - install the package in the backend
    ```bash
        npm install @rishabh786/medium-common
        # now you can use the zod schema in the backend
    ```

## Bug Fixing
- Fix the bug type(authorId) string  to Int (invalid type zod val) in the blog request route
- blog id int to (uuid)string in the blog request route
- Bug Fix change the behaviour after and before login/Signup using useLocation Hook
- Bug Fix Responive Design for the Blog Page
- Bug fix date is not showing in the blogs page showing (Invalid Date) Reason:backned updated not to cloudflare worker

## Commit changes
- commit the changes to the git
- write the backened routes user and blog
- write the zod schema for user and blog
- write the middleware for the token verification
- write the blog request route
- write the signup and signin route
- common zod schema for the frontend and backend
- publish the common zod schema to npm
- install the common zod schema in the backend
- bug fixing in the blog request route
- blog id int to (uuid)string in the blog request route
- deploy the backend to the cloudflare worker

## Frontend - Commits
- create the frontend folder and setup the react app
- create the components folder and add the components
- create the pages folder and add the pages
- create the hooks folder and add the hooks
- create the sighin up sighin page and add the components
- Created a Landing page
- Created a Navbar
- Created a Footer
- Created a Blog page
- Created a BlogCard component
- Created a fullBlog component
- Fullblog divided into two parts
    - BlogHeader- Autor Section and Blog Title
    - BlogContent- Blog Content
- 
- Added a BlogSkeleton UI for the blogs loading state
- Added a blog page to view the blog
- Added a blog page to Publish the blog
- Using the common zod schema in the frontend
- Created interface for blog and user
- Created a hook to fetch the blogs 
- Created a hook to fetch the blog by id
- Created a hook to publish the blog
- Created a hook to delete the blog
- Use useLocation to change the behaviour of AppBar
- Added list in Appbar to show the user name and logout
- Created a layout component to wrap the pages and make AppBar common
- Created  a useTypingEffect custom Hook for TypinEffect of Quotes
- fix Responive Design for the Blog Page


