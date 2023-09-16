/* global axios */
const dairyCardTemplate = document.querySelector("#my-dairy-card-template");
const dairyList = document.querySelector("#my-dairy-cards");
const body = document.querySelector("body");

const instance = axios.create({
  baseURL: "http://localhost:8000/api",
});

const getDairies = async () => {
  const response = await instance.get("/dairies");
  return response.data;
}

const createDairy = async (dairy) => {
  const response = await instance.post("/dairies", dairy);
  return response.data;
}

const createDairyElement = (dairy) => {
  const { date, tag, emo, content }  = dairy;
  const item = dairyCardTemplate.content.cloneNode(true);
  const divNode = item.querySelector(".my-dairy-card");
  divNode.id = dairy._id;
  console.log(dairy);
  
  const ulNode = item.querySelector("my-dairy-info");
  const dateNode = item.querySelector("p.my-dairy-date");
  const tagNode = item.querySelector("p.my-dairy-tag");
  const emoNode = item.querySelector("p.my-dairy-emo");

  dateNode.innerText = date;
  tagNode.innerText = tag;
  emoNode.innerText = emo;

  const contentNode = item.querySelector("p.my-dairy-content");
  contentNode.innerText = content;
  
  return item;
}

const renderDairy = async (dairy) => {
  const item = createDairyElement(dairy);
  dairyList.appendChild(item);
}

const editDairy = async ({ overview, page }) => {
  const quitButton = document.getElementById("button-quit");
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
    const tag = document.getElementById("select-tag").value;
    const emo = document.getElementById("select-emo").value;
    const date = document.getElementById("page-date").innerHTML;

    if (!content) {
      alert("Please enter your dairy content!");
      return;
    }

    // dairyContent.innerHTML = content; // change to backend type
    textArea.style.display = "none";
    dairyContent.style.display = "flex";
    storeButton.style.display = "none";
    cancelButtoon.style.display = "none";
    editButton.style.display = "flex";
    quitButton.style.display = "flex";

    try {
      const dairy = await createDairy({ tag, emo, date, content });
      renderDairy(dairy);
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
    console.log("quit");
    overview.style.display = "block";
    page.style.display = "none";
  })
}

const setUpEventListeners = async () => {
  const addDairyButton = document.getElementById("my-dairy-add");
  const overview = document.getElementById("my-dairy-overview");
  const page = document.getElementById("my-dairy-page");
  
  addDairyButton.addEventListener("click", () => {
    overview.style.display = "none";
    page.style.display = "flex";
  });

  editDairy({ overview, page });
  // quitEditPage({ overview, page });
}

const main = async () => {
  setUpEventListeners();
  try {
    const dairies = await getDairies();
    dairies.forEach((todo) => renderDairy(todo));
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