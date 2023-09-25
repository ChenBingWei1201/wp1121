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
const selectTag = document.getElementById("select-tag");
const selectEmo = document.getElementById("select-emo");
const inputPageDate = document.getElementById("input-page-date");
const displayPageDate = document.getElementById("display-page-date");
let dairyID = "000000000000000000000000";

/* global axios */
const instance = axios.create({
  baseURL: "http://localhost:8000/api",
});

// get all dairies
const getDairies = async () => {
  const response = await instance.get("/dairies");
  return response.data;
};

// create a dairy
const createDairy = async (dairy) => {
  const response = await instance.post("/dairies", dairy);
  return response.data;
};

// get a  dairy
const getDairy = async (id) => {
  const response = await instance.get(`/dairies/${id}`);
  return response.data;
};

// update a diary
const updateDairy = async (id, dairy) => {
  const response = await instance.put(`/dairies/${id}`, dairy);
  return response.data;
};

// create a dairy overview
const createDairyElement = (dairy) => {
  const { date, tag, emo, content } = dairy;
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
  contentNode.innerText =
    content.length >= 29 ? `${content.slice(0, 29) + " ..."}` : content;

  divNode.addEventListener("click", async () => {
    const { date, tag, emo, content } = await getDairy(divNode.id);
    dairyID = dairy._id;
    displayPageDate.innerText = date;
    dairyContent.innerText = content;
    textArea.value = content;
    selectTag.options[selectTag.selectedIndex].text = tag;
    selectEmo.options[selectEmo.selectedIndex].text = emo;
    selectTag.disabled = true;
    selectEmo.disabled = true;
    overview.style.display = "none";
    page.style.display = "flex";
    textArea.style.display = "none";
    dairyContent.display = "flex";
    storeButton.style.display = "none";
    cancelButtoon.style.display = "none";
    quitButton.style.display = "flex";
    editButton.style.display = "flex";
    inputPageDate.style.display = "none";
  });

  return item;
};

const renderDairy = async (dairy) => {
  const item = createDairyElement(dairy);
  dairyList.appendChild(item);
};

const editDairy = async ({ overview, page }) => {
  // edit button
  editButton.addEventListener("click", () => {
    storeButton.style.display = "flex";
    cancelButtoon.style.display = "flex";
    textArea.style.display = "flex";
    dairyContent.style.display = "none";
    editButton.style.display = "none";
    quitButton.style.display = "none";
    selectTag.disabled = false;
    selectEmo.disabled = false;
  });

  // store button
  storeButton.addEventListener("click", async () => {
    const content = textArea.value;
    const tag = document.getElementById("select-tag").value;
    const emo = document.getElementById("select-emo").value;
    const originalDate = document.getElementById("input-page-date").value;
    let day = `${new Date(originalDate)}`;
    const week = [
      "（日）",
      "（一）",
      "（二）",
      "（三）",
      "（四）",
      "（五）",
      "（六）",
    ];
    switch (day.slice(0, 3)) {
      case "Sun":
        day = 0;
        break;
      case "Mon":
        day = 1;
        break;
      case "Tue":
        day = 2;
        break;
      case "Wen":
        day = 3;
        break;
      case "Thr":
        day = 4;
        break;
      case "Fri":
        day = 5;
        break;
      case "Sat":
        day = 6;
        break;
    }

    const date = originalDate.replaceAll("-", ".") + week[day];

    if (!content) {
      alert("Please enter your dairy content!");
      return;
    }
    if (!displayPageDate.innerText && !originalDate) {
      alert("Please choose a date!");
      return;
    }

    textArea.style.display = "none";
    dairyContent.style.display = "flex";
    storeButton.style.display = "none";
    cancelButtoon.style.display = "none";
    editButton.style.display = "flex";
    quitButton.style.display = "flex";
    inputPageDate.style.display = "none";
    selectTag.disabled = true;
    selectEmo.disabled = true;

    try {
      const dairy = await createDairy({ tag, emo, date, content, dairyID });
      if (dairy._id === dairyID) {
        const existedDairy = await updateDairy(dairyID, {
          tag,
          emo,
          date,
          content,
        });

        dairyContent.innerText = existedDairy.content;
        selectTag.options[selectTag.selectedIndex].text = tag;
        selectEmo.options[selectEmo.selectedIndex].text = emo;
        const card = document.getElementById(`${existedDairy._id}`);
        card.children[0].children[0].children[0].innerText = date;
        card.children[0].children[1].children[0].innerText = tag;
        card.children[0].children[2].children[0].innerText = emo;
        card.children[1].innerText = existedDairy.content;
      } else {
        renderDairy(dairy);
        dairyContent.innerText = dairy.content;
        selectTag.options[selectTag.selectedIndex].text = dairy.tag;
        selectEmo.options[selectEmo.selectedIndex].text = dairy.emo;
        displayPageDate.innerText = dairy.date;
      }
    } catch (error) {
      alert("Failed to create dairy!");
      return;
    }
  });

  // cancel button
  cancelButtoon.addEventListener("click", () => {
    textArea.style.display = "none";
    dairyContent.style.display = "flex";
    storeButton.style.display = "none";
    cancelButtoon.style.display = "none";
    editButton.style.display = "flex";
    quitButton.style.display = "flex";
    selectTag.disabled = true;
    selectEmo.disabled = true;
  });

  // quit button
  quitButton.addEventListener("click", () => {
    textArea.style.display = "flex";
    textArea.value = "";
    overview.style.display = "block";
    page.style.display = "none";
    dairyContent.innerText = "";
    displayPageDate.innerText = "";
    inputPageDate.style.display = "flex";
    displayPageDate.innerText = "";
  });
};

const setUpEventListeners = async () => {
  const addDairyButton = document.getElementById("my-dairy-add");

  addDairyButton.addEventListener("click", () => {
    overview.style.display = "none";
    page.style.display = "flex";
    storeButton.style.display = "flex";
    cancelButtoon.style.display = "flex";
    editButton.style.display = "none";
    quitButton.style.display = "none";
    selectTag.disabled = false;
    selectEmo.disabled = false;
    dairyID = "000000000000000000000000";
  });

  editDairy({ overview, page });
};

const main = async () => {
  setUpEventListeners();
  try {
    const dairies = await getDairies();
    dairies.forEach((dairy) => renderDairy(dairy));
  } catch (error) {
    alert("Failed to load dairies!");
  }
};

main();
