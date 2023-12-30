# 112-1 Web Programming Final Project

## members

<nl>
  <li>張均豪</li>
  <li>林禹融</li>
  <li>陳秉緯</li>
</nl>

## Development

### Step 1: Install all dependencies

```sh
# final-project
pnpm install:all
```

### Step 2: Create .env in backend

```sh
# final-project/backend
cp .env.development .env
```

and paste `DATABASE_URL="postgresql://user:password@localhost:5400/WPFP?schema=public"`

## Run Backend

### Step 1 : Start database

This will have postgres and adminer running for the backend

```sh
# final-project
docker compose -f docker-compose.yml up -d
```

### Step 2 : Install dotenv & ts-node

```sh
# final-project/backend
pnpm setup
```

### Step 3 : Run Prisma

```sh
# final-project/backend
pnpm generate
pnpm migrate
```

### Step 4 : Start Apollo Server(backend)

```sh
# final-project
pnpm backend
```

This will run apollo graphql playground at port 5000
you can then use adminer at port 8070

## Frontend codegen

### Step 1:

```sh
# final-project/frontend
pnpm codegen
```

It will update files in gql-generated dir.

## Run Frontend

### Step 1:

```sh
# final-project
pnpm frontend
```

then the frontend will run on port 5713

#### Problems may occur

kill the port being stucked : `sudo kill -9 $(sudo lsof -t -i:port)`. If you want to kill port 8000, type : `sudo kill -9 $(sudo lsof -t -i:8000)`
