# 112-1 Web Programming Final Project

## members

<nl>
  <li>陳秉緯</li>
  <li>林禹融</li>
  <li>張均豪</li>
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

### Step 3: Create env.ts in frontend

```sh
# final-project/frontend/src
cp env.example.ts env.ts
```

Go to https://magic.link/, follow the instructions on the website to get an api key.
Paste `MAGIC_PUBLIC_API_KEY: <Your public API key>` in env.ts.

Go to https://firebase.google.com/ and sign up for an account, add a new project, and add an application for website. Then you can get a firebase config file. Paste the necessary columns into env.ts.

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
# make sure that backend is running when you run this command
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

## 使用/操作方式
1. 進入主頁面後可以瀏覽所有articles與看到announcements
2. 點選每個article，可以看到文章內容
3. 若要留言，請先右上角登入，輸入email帳號，magic link寄送認證碼到你的email，去email接收密碼之後在貼到認證畫面，即可登入
4. 登入後可以點選Article，按下發文按鈕，即可開始編輯文章，由基本的markdown語法編輯，或是可以點選上方的小工具列，可以上傳圖片，寫範例程式，也可以點擊open in sandbox，就會直接開啟sandbox在新的頁面。
5.寫完之後，選擇tags，並按下右下角的post即可發表文章或問題
6.登入之後也可以在下方留言，點擊post comment，即可發表問題
7. 可以點擊閃電（就是覺得作者很電）就給他一個
7.點選作者頭像查看自介
8.點選自己頭像修改自己的自介
9.點選About 查看網站作者資訊
10.點選網站作者聯絡方式與網站作者溝通
11.登出！

## 每個組員負責的內容

陳秉緯: 主題與功能發想、架設框架、Announcement與User後端Resolver、Firebase、Markdown Editor、deploy
林禹融: 主題與功能發想、Article後端Resolver、前端主視覺設計、UI/UX
張均豪: 主題與功能發想、Question與Solution後端Resolver、登入功能、測試與除錯