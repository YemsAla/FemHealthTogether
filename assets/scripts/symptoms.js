alert("JavaScript connected");

let modalOpen = false;

window.onload = function() {
  // Event listeners added to all symptom icons
  const icons = document.getElementsByClassName("symptom-icon");
  //console.log(icons);
  for (let i = 0; i < icons.length; i++){
      icons[i].addEventListener('click', symptomShow);
  }
};
  
/**
 * Called when a symptom icon is clicked
 */
function symptomShow() {
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
};
