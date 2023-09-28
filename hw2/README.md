# Web Programming HW#2

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
echo  "PORT=8000
MONGO_URL=${your connection string}" > ./.env
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