# Web Programming HW#4
**注意: notion上有說可以使用任何你會使用的資料庫，此作業db使用的是mongodb**

## Development
### Instsall packages
```bash
yarn install
```
### .env
copy .env.example to .env.local
```bash
cd web
cp .env.example .env.local
cd ../server
cp .env.example .env.local
```
and paste your mongodb url to MONGO_URL
**please delete any data in your mongodb in advance!**

### Start Backend
```bash
cd ..
yarn server
```
### Start Frontend
```bash
yarn web
```

## Introduction
本次作業將會需要透過 Next.js 以及 Web Socket 來實作一個 messenger-clone app。使用者可以透過此 Web App 與他人進行即時聊天，亦可組織群組並進行群組聊天。同時所有對資料的操作，皆會同步至資料庫。意即關掉服務重開後原本新增資料要存在。


1. **登入 & 登出**：
    1. 使用者可以透過輸入使用者名稱進行登入，並且可以登出。
    2. 使用者名稱必須唯一。
2. **一對一聊天室**：
    1. 灰色框框左上角的加號可新增好友對話聊天室，按叉叉暫時關閉聊天室，再次開啟時保有原本對話紀錄。
    2. 使用者可以在這個頁面總覽所有一對一聊天室。
    3. 每一個聊天室至少要能看到**對方的使用者名稱**以及**與對方的最後一則訊息**
    4. 點擊聊天室後，於下方開啟完整聊天紀錄。
    5. **新增**：可透過輸入任意使用者名稱，新增與該使用者的聊天室。若聊天室已存在，則提示使用者「聊天室已存在」。
3. **聊天紀錄**：
    1. 留言輸入框應改為提示使用者可以輸入留言，當使用者 focused 在留言輸入框時，按下 enter 鍵即可發送訊息。
    2. 自己的訊息發送後，應即時更新至畫面上，不需使用者重新整理。
    3. **來自其他用戶的訊息發送後，須立即顯示。**

跑得時候會有點怪怪的，可能要重新整理幾次才可以，感謝評分，預祝hack2順利!