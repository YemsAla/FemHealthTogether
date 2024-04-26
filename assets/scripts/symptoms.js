"use strict";

// Global variables
let modalOpen = false;
let screen;
let page = document.getElementById("woman-body").getAttribute("data-pageID");

// modal opening code
const modal = new bootstrap.Modal(`#Modal`, { keyboard: false });

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
  if (window.innerWidth < 992) {
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

  showBodyPart(infoObject.area);
}

function findObjectById(id) {
  return JSONDATA[page].find(function (obj) {
    return obj.id === id;
  });
}

function showBodyPart(bodyPart) {
  // Get all elements with the class body-images
  var images = document.getElementsByClassName("body-images");

  // Loop through each image element
  for (var i = 0; i < images.length; i++) {
    // Get the data-body-part attribute value of the current image
    var dataBodyPart = images[i].getAttribute("data-body-part");

    // Check if the current image's data-body-part matches the provided bodyPart
    if (dataBodyPart === bodyPart) {
      // If it matches, display the image
      images[i].style.display = "block";
    } else {
      // If it doesn't match, hide the image
      images[i].style.display = "none";
    }
  }
}

// staggered animation for icons

function observerAcctivation(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      staggeredTimeout();

      // Disconnect the observer if needed
      observer.disconnect();
    }
  });
}

function staggeredTimeout() {
  const elements = document.querySelectorAll(".symptom-icon");
  let delayIncrement = 100; // Increment delay in milliseconds
  elements.forEach(function (element, index) {
    setTimeout(function () {
      element.classList.add("active");
    }, index * delayIncrement);
  });
}

// reviel sections

const revealElements = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section-hidden");
    observer.unobserve(entry.target);
  });
};
const iconContainer = document.querySelector("#icon-container");

const sectionsObserver = new IntersectionObserver(observerAcctivation, {
  root: null,
  threshold: 0.8,
});
sectionsObserver.observe(iconContainer);
