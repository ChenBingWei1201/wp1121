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

### Step 3. Setup VITE_API_URL

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

## 基本要求

### 首頁

1.「ADD」按鈕:點擊後跳出彈窗，供使用者輸入清單名稱及清單敘述。完成輸入後，可馬上在首頁看到新的播放清單，並同時將清單資料新增至資料庫。
2.「DELETE」按鈕:
    1. 點擊該按鈕後，進入刪除模式 。按鈕上文字變為「DONE」。
    2. 刪除模式：每個播放清單的右上角會出現刪除按鈕，點擊該播放清單之刪除按鈕後該播放清單即被刪除。
    3. 再次點擊「DONE」按鈕後, 清單右上角之刪除按鈕消失。按鈕上文字變回「DELETE」。

### 播放清單頁

1. 播放清單資訊：可以清楚瀏覽播放清單之圖片、標題、敘述，且標題、敘述皆可供編輯。
2. 歌曲資訊：
    1. 在每個 row 最前方有一個 checkbox 可供選取。而表頭之 checkbox 具全選功能。
    2. 可以清楚看到歌曲之標題、歌手、連結，且皆可供編輯。
    3. 可將歌曲新增至其他清單（仍保留於原播放清單）
3. 支援響應式設計 (RWD)：文字以及歌曲列表之寬度須根據螢幕大小進行調整
4. 「ADD」按鈕:點擊後跳出彈窗,供使用者輸入歌曲名稱、歌手以及連結。完成輸入後，可馬上在頁面看到新的歌曲並同時將歌曲資料新增至資料庫。
5. 「DELETE」按鈕:
    1. 點擊後跳出彈窗，將所有被勾選的歌曲資訊列出。並詢問使用者「是否確定刪除」。若使用者選擇「確定刪除」則刪除所有已選取之歌曲。
    2. 若無歌曲被勾選則提示「請勾選歌曲」。
6. 連結：可供使用者點擊，並以新分頁開啟該連結
7. 範例圖片僅為示意

## 進階要求

1. 使用者提示：當使用者未輸入資訊或是進行錯誤操作時，給予適當提示。例如使用者新增或編輯清單時，未輸入標題，以彈窗提示「請輸入標題」。