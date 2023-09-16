/* global axios */
const dairyCardTemplate = document.querySelector("#my-dairy-card-template");
const dairyList = document.querySelector("#my-dairy-cards");
const body = document.querySelector("body");

let id = 0;

const instance = axios.create({
  baseURL: "http://localhost:8000/api",
});
// my-dairy-page
// async function main() {
//   setupEventListeners();
//   try {
//     const dairies = await getDairies();
//     dairies.forEach((todo) => renderDairy(todo));
//   } catch (error) {
//     alert("Failed to load dairies!");
//   }
// }

const editDairy = async () => {
  const editButton = document.getElementById("button-edit");
  const storeButton = document.getElementById("button-store");
  const cancelButtoon = document.getElementById("button-cancel");
  const textArea = document.getElementById("dairy-content-input");
  const dairyContent = document.getElementById("dairy-content-display");

  // edit button
  editButton.addEventListener("click", () => {
    storeButton.style.display = "flex";
    cancelButtoon.style.display = "flex";
    textArea.style.display = "flex";
    dairyContent.style.display = "none";
    editButton.style.display = "none";
  })

  // store button 
  storeButton.addEventListener("click", async () => {
    const content = textArea.value;
    // console.log(content);
    const tag = document.getElementById("select-tag").innerHTML;
    const emo = document.getElementById("select-emo").innerHTML;
    const date = document.getElementById("page-date").innerHTML;

    if (!content) {
      alert("Please enter your dairy content!");
      return;
    }

    dairyContent.innerHTML = content; // change to backend type
    textArea.style.display = "none";
    dairyContent.style.display = "flex";
    storeButton.style.display = "none";
    cancelButtoon.style.display = "none";
    editButton.style.display = "flex";
    
    try {
      const dairy = await createDairy({ tag, emo, date, content });
      renderDairy(dairy);
    } catch (error) {
      alert("Failed to create dairy!");
      return;
    }
  })

  cancelButtoon.addEventListener("click", () => {
    textArea.style.display = "none";
    dairyContent.style.display = "flex";
    storeButton.style.display = "none";
    cancelButtoon.style.display = "none";
    editButton.style.display = "flex";
  })
}


const quitEditPage = ({ overview, page }) => {
  const quitButton = document.getElementById("button-quit");
  quitButton.addEventListener("click", () => {
    console.log("quit");
    overview.style.display = "block";
    page.style.display = "none";
  })
}

const addDairy = async () => {
  const addDairyButton = document.getElementById("my-dairy-add");
  const overview = document.getElementById("my-dairy-overview");
  const page = document.getElementById("my-dairy-page");
  
  addDairyButton.addEventListener("click", () => {
    overview.style.display = "none";
    page.style.display = "flex";
  });

  editDairy();
  quitEditPage({ overview, page });
}

addDairy();

async function deleteDairyElement(id) {
  try {
    await deleteDairyById(id);
  } catch (error) {
    alert("Failed to delete todo!");
  } finally {
    const todo = document.getElementById(id);
    todo.remove();
  }
}

const renderDairy = async (dairy) => {
  const item = createDairyElement(dairy);
  todoList.appendChild(item);
}

function createDairyElement(todo) {
  const item = dairyCardTemplate.content.cloneNode(true);
  const container = item.querySelector(".todo-item");
  container.id = todo.id;
  console.log(todo)
  const checkbox = item.querySelector(`input[type="checkbox"]`);
  checkbox.checked = todo.completed;
  checkbox.dataset.id = todo.id;
  const title = item.querySelector("p.todo-title");
  title.innerText = todo.title;
  const description = item.querySelector("p.todo-description");
  description.innerText = todo.description;
  const deleteButton = item.querySelector("button.delete-todo");
  deleteButton.dataset.id = todo.id;
  deleteButton.addEventListener("click", () => {
    deleteDairyElement(todo.id);
  });
  return item;
}

async function getDairies() {
  const response = await instance.get("/dairies");
  return response.data;
}

const createDairy = async (dairy) => {
  const response = await instance.post("/dairies", dairy);
  return response.data;
}

// eslint-disable-next-line no-unused-vars
async function updateDairyStatus(id, todo) {
  const response = await instance.put(`/dairies/${id}`, todo);
  return response.data;
}

async function deleteDairyById(id) {
  const response = await instance.delete(`/dairies/${id}`);
  return response.data;
}

// main();
