# Web Programming HW#5

deployed website: https://wp1121-chenbingweis-projects.vercel.app/

#### **Please clear you database first and follow the readme clearfully!**

## Running the app

1. Clone the repo

2. Install dependencies

```bash
yarn install
```

3. Create a `.env.local` file in the root of the project and add a valid Postgres URL. To get a Postgres URL, follow the instructions [here](https://ric2k1.notion.site/Free-postgresql-tutorial-f99605d5c5104acc99b9edf9ab649199?pvs=4).

```bash
POSTGRES_URL="postgres://postgres:postgres@localhost:5432/twitter"
```

4. Run the migrations

```bash
yarn migrate
```

4. Start the app

```bash
yarn dev
```

## Managing the database

`drizzle-kit` provides some useful commands to manage the database.

### Update database schema

Note that if your schema changes, some data might be deleted in the process. `drizzle-kit` would prompt you about destructive changes.

```bash
yarn drizzle-kit push:pg
```

### View or edit data

This command launches a web UI to view or edit data in the database.

```bash
yarn drizzle-kit studio
```

## Introduction

本 app 由以下三個部分組成，其功能如下所述：

1. **主頁面：**使用者可以在這個頁面**設定使用者名稱**與**總覽活動**。這個頁面應提供搜尋活動之功能，並可以點擊個別活動、前往各活動之「瀏覽活動」頁面。2.「新增活動」功能：提供使用者新增活動。請實作為懸浮於主頁面上方的 modal。3.「瀏覽活動」頁面：使用者可以在這裡瀏覽活動的訊息。如果加入活動，則可以參與討論。

### 主頁面

1. 使用者可以在這個頁面輸入（切換）使用者名稱，**任何活動的留言都以此名稱顯示**
2. 使用者可以在這個頁面總覽所有活動。每一項活動至少要能看到其活動名稱、自己是否參加（打勾符號）、目前有幾人參加三項資訊。
3. 點擊活動時，進入該活動之「瀏覽活動」頁面。
4. 點擊「新增」按鈕時，打開「新增活動」功能。
5. 「搜尋想參加的活動」欄位：使用者可以在這個欄位對活動名稱進行關鍵字搜尋。若活動名稱中包含該關鍵字，則應顯示於搜尋結果，反之則不應顯示，search bar，如同google搜尋框一樣可點擊想要的搜尋結果，並直接跳轉到該活動頁面。

### 「新增活動」功能

1. 提供使用者新增活動。請實作為懸浮於主頁面上方的 modal。
2. 新增活動時，使用者須填入**活動名稱、開始日期時間、結束日期時間**三項資訊。點擊「新增」按鈕時，若滿足下列條件，則新增該活動，並導引使用者前往該活動之「瀏覽活動」頁面。
   1. 三項資訊都有填寫，且時間形式僅包含年、月、日、小時
   2. 開始、結束日期時間合法（i.e., 是真實可能出現的時間）
3. 成功新增活動後，須導引使用者至「瀏覽活動」頁面，並且自動將使用者自身加入活動。
4. 如果未點擊「新增」而是點擊 modal 外的區域，則取消新增活動。

### 「瀏覽活動」頁面

1. 使用者可以在這個頁面瀏覽個別活動之開始日期時間、結束日期時間、留言
2. 點擊左上角「返回」按鈕（圖中以 ❮ 符號表示），可以返回**主頁面**
3. 每一則留言須包含使用者名稱與留言內容。留言長度若長於一行能顯示的字數，則需自動換行（line wrapping）以顯示完整留言。
4. 留言區的留言應依照存入資料庫時間，從最舊到最新由上至下排列
5. 在留言區應該有一個留言輸入框，依照使用者是否參加活動而有不同行為：
   1. 未參加活動時，應提示使用者可以參加活動以加入討論，並不允許使用者輸入內容。
   2. 已參加活動時，應允許使用者輸入內容，並提示使用者可以在這裡輸入留言。
   3. 使用者點進一個未拜訪過的活動頁面時，預設狀態是「未參加活動」。
   4. 關於「如何參加/退出活動」，請見以下兩點。
6. 參加活動：在未參加活動的情況下，使用者可以點擊「我想參加」按鈕。按下按鈕後，按鈕應改為顯示「我已參加」，並改變顏色。此時用戶便可以使用留言功能。
   1. 自己的訊息發送後，應即時更新至畫面上，不需使用者重新整理。
   2. **來自其他用戶的訊息發送後，不須立即顯示，重新整理後按照留言順序出現即可。**
7. 退出活動：在已參加活動的情況下，使用者可以按下「我已參加」按鈕來退出活動。按下按鈕後，按鈕應改為顯示「我想參加」。不需刪除使用者已留下的留言，但是留言框必須返回無法使用的狀態。