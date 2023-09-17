/* global axios */
const dairyCardTemplate = document.querySelector("#my-dairy-card-template");
const dairyList = document.querySelector("#my-dairy-cards");
const overview = document.getElementById("my-dairy-overview");
const page = document.getElementById("my-dairy-page");
const quitButton = document.getElementById("button-quit");
const editButton = document.getElementById("button-edit");
const storeButton = document.getElementById("button-store");
const cancelButtoon = document.getElementById("button-cancel");
const textArea = document.getElementById("dairy-content-input");
const dairyContent = document.getElementById("dairy-content-display");

const instance = axios.create({
  baseURL: "http://localhost:8000/api",
});

// get all dairies
const getDairies = async () => {
  const response = await instance.get("/dairies");
  return response.data;
}

// create a dairy
const createDairy = async (dairy) => {
  const response = await instance.post("/dairies", dairy);
  return response.data;
}

// get a  dairy
const getDairy = async (id) => {
  const response = await instance.get(`/dairies/${id}`);
  return response.data;
}

// update a diary
const updateDairy = async (id, dairy) => {
  const response = await instance.put(`/dairies/${id}`, dairy);
  return response.data;
}

// create a dairy overview
const createDairyElement = (dairy) => {
  const { date, tag, emo, content }  = dairy;
  const item = dairyCardTemplate.content.cloneNode(true);
  const divNode = item.querySelector(".my-dairy-card");
  divNode.id = dairy._id;
  
  const dateNode = item.querySelector("p.my-dairy-date");
  const tagNode = item.querySelector("p.my-dairy-tag");
  const emoNode = item.querySelector("p.my-dairy-emo");

  dateNode.innerText = date;
  tagNode.innerText = tag;
  emoNode.innerText = emo;

  const contentNode = item.querySelector("p.my-dairy-content");
  contentNode.innerText = content;
  
  divNode.addEventListener("click", async () => {
    const diary = await getDairy(divNode.id);
    dairyContent.innerText = diary.content;
    textArea.value = diary.content;
    overview.style.display = "none";
    page.style.display = "flex";
    textArea.style.display = "none";
    dairyContent.display = "flex";
    storeButton.style.display = "none";
    cancelButtoon.style.display = "none";
    quitButton.style.display = "flex";
    editButton.style.display = "flex";
  })

  return item;
}

const renderDairy = async (dairy) => {
  const item = createDairyElement(dairy);
  dairyList.appendChild(item);
}

const editDairy = async ({ overview, page }) => {

  // edit button
  editButton.addEventListener("click", () => {
    storeButton.style.display = "flex";
    cancelButtoon.style.display = "flex";
    textArea.style.display = "flex";
    dairyContent.style.display = "none";
    editButton.style.display = "none";
    quitButton.style.display = "none";
  })

  // store button 
  storeButton.addEventListener("click", async () => {
    const content = textArea.value;
    const tag = document.getElementById("select-tag").value;
    const emo = document.getElementById("select-emo").value;
    const date = document.getElementById("page-date").innerText;

    if (!content) {
      alert("Please enter your dairy content!");
      return;
    }

    textArea.style.display = "none";
    dairyContent.style.display = "flex";
    storeButton.style.display = "none";
    cancelButtoon.style.display = "none";
    editButton.style.display = "flex";
    quitButton.style.display = "flex";

    try {
      const dairy = await createDairy({ tag, emo, date, content });
      renderDairy(dairy);
      dairyContent.innerText = dairy.content;
    } catch (error) {
      alert("Failed to create dairy!");
      return;
    }
  })

  // cancel button
  cancelButtoon.addEventListener("click", () => {
    textArea.style.display = "none";
    dairyContent.style.display = "flex";
    storeButton.style.display = "none";
    cancelButtoon.style.display = "none";
    editButton.style.display = "flex";
    quitButton.style.display = "flex";
  })

  // quit button
  quitButton.addEventListener("click", () => {
    textArea.style.display = "flex";
    textArea.value = "";
    overview.style.display = "block";
    page.style.display = "none";
    dairyContent.innerText = "";
  })
}

const setUpEventListeners = async () => {
  const addDairyButton = document.getElementById("my-dairy-add");
  
  addDairyButton.addEventListener("click", () => {
    overview.style.display = "none";
    page.style.display = "flex";
    storeButton.style.display = "flex";
    cancelButtoon.style.display = "flex";
    editButton.style.display = "none";
    quitButton.style.display = "none";
  });

  editDairy({ overview, page });
}

const main = async () => {
  setUpEventListeners();
  try {
    const dairies = await getDairies();
    dairies.forEach((dairy) => renderDairy(dairy));
  } catch (error) {
    alert("Failed to load dairies!");
  }
}

main();

//--------------------------------
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

// eslint-disable-next-line no-unused-vars
async function updateDairyStatus(id, todo) {
  const response = await instance.put(`/dairies/${id}`, todo);
  return response.data;
}

async function deleteDairyById(id) {
  const response = await instance.delete(`/dairies/${id}`);
  return response.data;
}
// -----------------------------------