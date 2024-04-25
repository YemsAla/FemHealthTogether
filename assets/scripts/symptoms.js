"use strict";

// Global variables
let JsonData
let modalOpen = false;

// On load
fetch("/assets/data/page_data.json")
  .then((response) => response.json())
  .then((data) => {
    // Add data to JSON variable
    JsonData = data;
    // Add Event Listeners to all symptom icons including top tip
    const icons = document.getElementsByClassName("symptom-icon");
    //console.log(icons);
    for (let i = 0; i < icons.length; i++){
        icons[i].addEventListener('click', handleIconClick);
    }
  })
  .catch((error) => {
    console.error("Error fetching JSON:", error);
  });

// On clicking an icon
function handleIconClick(event){
  // Check screen size
  if (window.innerWidth < 1098){
    modalShow();
  } else {
    //console.log("We are on desktop");
  }
  modalFill(event);
}

// Function to handle opening and closing of the modal
function modalShow(){
  // If statement to ensure only one modal can be opened
  if (!modalOpen){
    // Open modal
    modalOpen = true;
    let modal = document.getElementById("symptom-modal");
    modal.style.display = "block";
    console.log("Modal opened")
    // Functionality to close modal on clicking the cross or clicking outside the modal
    let modalClose = () => {
      modal.style.display = "none";
      modalOpen = false;
    };
    // Event listener for cross
    let closeCross = document.getElementById("close");
    closeCross.onclick = modalClose;
    // Event listener for click outside
    const handleClickOutside = (event) => {
      console.log(event);
      if (!modal.contains(event.target)){
        console.log("Modal closed called");
        modalClose();
        document.removeEventListener('mouseup', handleClickOutside);
      } else {
        console.log("Check run click not outside")
      }
    };
    document.addEventListener('mouseup', handleClickOutside);
  }
}

function modalFill(event){
  let iconId = event.target.id;
  let page;
  let name = document.getElementById("symptom-name");
  let description = document.getElementById("symptom-description");
  let tip = document.getElementById("symtpom-tip");
  console.log(iconId)
  // Check page on
  if (iconId.includes("women")){
    page = "woman_page";
    console.log("Womans page")
  } else if (iconId.includes("friend")){
    page = "friend_relative_page";
    console.log("Friends page")
  } else if (iconId.includes("partner")){
    page = "partner_page";
    console.log("Partners page")
  } else if (iconId.includes("colleague")){
    page = "workplace_page";
    console.log("Colleagues page")
  }
  // Check if top tip or symptom and handle
  if (iconId.includes("tip")){
    // Render top tip info
    name.innerText = "Top Tip";
    if (page === "woman_page"){
      description.innerText = "Talk to your family and friends, share how you are feeling and let them know how they can best support you."
      tip.innerText = "Make sure to speak to your doctor or pharmasist if your day to day life is being affected by your symptoms."
    } else if (page === "friend_relative_page"){
      description.innerText = "Talk to your family and friends, share how you are feeling and let them know how they can best support you."
      tip.innerText = "Make sure to speak to your doctor or pharmasist if your day to day life is being affected by your symptoms."
    } else if (page === "partner_page"){
      description.innerText = "Talk to your family and friends, share how you are feeling and let them know how they can best support you."
      tip.innerText = "Make sure to speak to your doctor or pharmasist if your day to day life is being affected by your symptoms."
    } else if (page === "workplace_page"){
      description.innerText = "Talk to your family and friends, share how you are feeling and let them know how they can best support you."
      tip.innerText = "Make sure to speak to your doctor or pharmasist if your day to day life is being affected by your symptoms."
    }
    console.log("Tip");
  } else {
    // Find symptom object and render info
    let pageSymptoms = JsonData[page];
    let symptomObject = pageSymptoms.find(entry => entry.id === iconId);
    console.log(pageSymptoms)
    console.log(symptomObject)
    name.innerText = symptomObject["symptom"];
    description.innerText = symptomObject["description"];
    tip.innerText = symptomObject["tips"];
    console.log("Symptom")
  }
}

