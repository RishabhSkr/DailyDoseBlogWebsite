# Backend Deployment on Cloudflare Workers

Yeh guide aapko step-by-step batayega ki kaise aap apne backend ko Cloudflare Workers par deploy kar sakte hain. Saare steps ke saath commands bhi diye gaye hain.

## Prerequisites

- **Cloudflare Account**: Cloudflare par account hona chahiye. [Sign Up](https://dash.cloudflare.com/sign-up)
- **Node.js and npm**: Aapke system mein Node.js aur npm installed hone chahiye.
- **Wrangler CLI**: Cloudflare Workers manage karne ke liye Wrangler CLI install hona chahiye.

## Steps

### 1. Wrangler CLI Install Karein

Pehle, Wrangler CLI ko globally install karein:

```bash
npm install -g wrangler
```

### 2. Cloudflare Mein Login Karein
Wrangler CLI se Cloudflare account mein login karne ke liye:

```bash
wrangler login
```
Yeh command aapko browser mein login page par redirect karegi. Login karne ke baad terminal mein confirmation milega.

### 3. wrangler.toml File Configure Karein
Apne project root mein wrangler.toml file ko update karein ya create karein:

Apne project root mein wrangler.toml file ko update karein ya create karein:
    
    ```bash
        name = "server"
        main = "src/index.ts"
        compatibility_date = "2024-12-10"  # Aaj ki date ya jis date ke compatibility chahiye


        [vars]
        DATABASE_URL = "your-database-url-here"
        JWT_SECRET = "your-jwt-secret-here"

        Note: DATABASE_URL aur JWT_SECRET ko apni actual values se replace karein.
    ```
### 4. Dependencies Install Karein
    Project ki saari dependencies install karne ke liye:

    ```bash
    npm install
    ```
### 5. TypeScript Setup Karein
    Agar aap TypeScript use kar rahe hain, toh TypeScript compiler install karein:

    ```bash
    npm install --save-dev typescript
    ```

### 6. package.json Mein "build" Script Add Karein
    Apne package.json file mein "build" script add karein:
        
        ```json
        {
        "scripts": {
            "build": "tsc",
            // existing scripts
        },
        // rest of your package.json
        }
    ```
### 7. tsconfig.json File Configure Karein
    Apne TypeScript compiler options set karein:

    ```json
    {
    "compilerOptions": {
        "target": "ESNext",
        "module": "ESNext",
        "moduleResolution": "Bundler",
        "strict": true,
        "skipLibCheck": true,
        "lib": ["ESNext"],
        "types": ["@cloudflare/workers-types/2023-07-01"],
        "jsx": "react-jsx",
        "jsxImportSource": "hono/jsx"
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules", "dist"]
    }
    ```

### 8. Project Build Karein
    TypeScript code ko compile karne ke liye:
    
    ```bash
    npm run build
    ```
### 9. Local Development Server Start Karein (Optional)
    Agar aap locally test karna chahte hain:
    
    ```bash
    wrangler dev
    ```
    Yeh aapke worker ko http://localhost:8787 par run karega.

### 10. Project Deploy Karein
    Cloudflare Workers par project deploy karne ke liye:

    ```bash
    wrangler deploy
    ```
    Deployment successful hone par aapko ek URL milegi, jaise:
        
        ```bash
        https://your-worker-name.your-subdomain.workers.dev
        ```
### 11. Deployment Verify Karein
    Browser ya Postman se apne API endpoints test karein:

    ```bash
    curl https://your-worker-name.your-subdomain.workers.dev
    ```

