"use strict";

// Global variables
let JsonData;
let modalOpen = false;
let screen;
let page;

//Called on load
function screenSizeCheck() {
  // Check page on
  page = document.getElementById("woman-body").getAttribute("data-pageID");
}

// modal opening code
const modal = new bootstrap.Modal(`#Modal`, { keyboard: false });

// On load
fetch("../assets/data/page_data.json")
  .then((response) => response.json())
  .then((data) => {
    // Add data to JSON variable
    JsonData = data;
    // Check page on and screensize, then render top tip if on desktop
    screenSizeCheck();
  })
  .catch((error) => {
    console.error("Error fetching JSON:", error);
  });

// On load of desktop view and on clicking top tip icon
function topTip() {
  // Render top tip info
  let name = document.getElementById("symptom-name");
  let description = document.getElementById("symptom-description");
  let tip = document.getElementById("symtpom-tip");
  name.innerText = "Top Tip";
  if (page === "woman_page") {
    description.innerText =
      "Talk to your family and friends, share how you are feeling and let them know how they can best support you.";
    tip.innerText =
      "Make sure to speak to your doctor or pharmasist if your day to day life is being affected by your symptoms.";
  } else if (page === "friend_relative_page") {
    description.innerText =
      "Talk to your family and friends, share how you are feeling and let them know how they can best support you.";
    tip.innerText =
      "Make sure to speak to your doctor or pharmasist if your day to day life is being affected by your symptoms.";
  } else if (page === "partner_page") {
    description.innerText =
      "Talk to your family and friends, share how you are feeling and let them know how they can best support you.";
    tip.innerText =
      "Make sure to speak to your doctor or pharmasist if your day to day life is being affected by your symptoms.";
  } else if (page === "workplace_page") {
    description.innerText =
      "Talk to your family and friends, share how you are feeling and let them know how they can best support you.";
    tip.innerText =
      "Make sure to speak to your doctor or pharmasist if your day to day life is being affected by your symptoms.";
  }
}

function openModal(event) {
  if (window.innerWidth < 768) {
    modal.show();
  }

  const atribute = event.target.getAttribute("data-symphtom-id");

  const messageName = document.getElementsByClassName("message-name");
  const messageDescription = document.getElementsByClassName("message-description");
  const messageTip = document.getElementsByClassName("message-tip");

  const infoObject = findObjectById(atribute);

  let i = 0;
  while (i < 2) {
    messageName[i].innerText = infoObject.symptom;
    messageDescription[i].innerText = infoObject.description;
    messageTip[i].innerText = infoObject.tips;
    i++;
  }
}

function findObjectById(id) {
  return JsonData[page].find(function (obj) {
    return obj.id === id;
  });
}
