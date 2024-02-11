let currentStep = 1;

const maxStep = 3;

const prevButton = document.getElementById("prevButton")
const nextButton = document.getElementById("nextButton")
const submitButton = document.getElementById("submitButton")
const stepper = document.getElementById("stepper");
const submitPhoto = document.getElementById("submit-photo");

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  let isValid = validateCurrentStep()
  submitPhoto.classList.toggle("hidden", !isValid || currentStep !== maxStep);
});

function changeStep(number) {
    if(number > 0){
      const isValid = validateCurrentStep();
      if(!isValid) {
        return;
      }
    }
    currentStep += number;
    currentStep = Math.min(Math.max(currentStep, 1), maxStep);

    prevButton.classList.toggle("hidden", currentStep === 1);
    nextButton.classList.toggle("hidden", currentStep === maxStep);
    submitButton.classList.toggle("hidden", currentStep !== maxStep);

    toggleSteps();
    updateStepper();
}

function toggleSteps(){
  const steps = document.querySelectorAll("div.step");
  steps.forEach(step => {
      const dataset = step.dataset;
      const isCurrent = dataset.step == currentStep;
      step.classList.toggle("step-active", isCurrent);
      step.setAttribute("data-active", isCurrent);

  })
}
function updateStepper() {
  const listItems = stepper.querySelectorAll("li");

  listItems.forEach(item => {
      const dataset = item.dataset;
      item.classList.toggle("text-blue-600", dataset.step == currentStep);
  })
}

function validateCurrentStep() {
  const step = document.querySelector(`div.step[data-step="${currentStep}"]`);
  if(!step) {
    return false;
  }

  const inputs = step.querySelectorAll("input");

  for(let input of inputs){

 
    const type = input.type;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    switch (type) {
      case "text":
        if(input.value.length <= 0) {
          input.setCustomValidity( "Please fill everything!");
          input.reportValidity();
          return false;
        }
        input.setCustomValidity("");
        break;
      case "email":
 
        if(input.value.length <= 0){
          input.setCustomValidity( "Please fill everything!");
          input.reportValidity();
          return false;
        } else if (!emailRegex.test(input.value)){
          input.setCustomValidity( "This is not a valid email...");
          input.reportValidity();
          return false;
        }
        break;
      case "password":
        if(input.value.length <= 8) {
          input.setCustomValidity( "Your password has to be 8 characters long!");
          input.reportValidity();
          return false;
        }
        input.setCustomValidity("");
        break; 
      case "checkbox":
        if(!input.checked){
          input.setCustomValidity("You have to check this....")
          input.reportValidity();
          return false;
        }
        input.setCustomValidity("");
        break;
    }   
  }

  return true;
}
nextButton.addEventListener("click", () => changeStep(1))
prevButton.addEventListener("click", () => changeStep(-1));