# Web Programming HW#1

## Development

### Backend

#### Step 1: install node_modules
```sh
cd backend
yarn
```
#### Step 2: open server
remember to write your db url into .env first
```sh
cd ..
yarn server
```

### Frontend
#### Step 1: install node_modules
```sh
cd frontend
yarn
```
#### Step 2: open index.html
If you are a linux user:
```sh
cd ..
yarn start
```
or open ./frontend/index.html in your default browser

## Basic Requirement
1. click "新增日記卡" then an edit-page will be rendered for you to write a dairy
2. type something in the text area, change tag and mood, and choose the date of the dairy
3. click "儲存" to store the dairy or "取消" to cancel the action
4. click "離開" to quit the edit-page or "編輯" to edit the dairy
5. if "離開" is clicked, the main page will be rendered and you can see the summary of the dairy you added just now in the diary card.
6. if you click the card, then the overview of the diary content will pop out, it can be edit after the button called "編輯" clicked. 
7. click "儲存" to ensure that the dairy has been updated.
8. enjoy yourself!

## Advance Requirement
1. User can choose the date at the first time the diary created.