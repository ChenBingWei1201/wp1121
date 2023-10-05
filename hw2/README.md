# Web Programming HW#2

Please copy commands below and paste them into your terminal in order.

## Setup

### Step 1. Install dependencies

```sh
cd frontend
yarn
cd ../backend
yarn
```

### Step 2. Setup MongoDB

Please replace `${your connection string}` with your MongoDB url

```sh
cp ./.env.example .env
echo  "PORT=3000
MONGO_URL=${your connection string}" > ./.env
```

## Step 3. Setup VITE_API_URL

```sh
cd ../frontend
cp ./.env.example .env
```

## Run the frontend & backend

```sh
cd ..
yarn server # to start backend
yarn start # to start frontend
```

## Lint check

### Frontend

```sh
cd frontend
yarn lint
```

### Backend

```sh
cd ../backend
yarn lint
```