document.addEventListener("DOMContentLoaded", function () {
    
    const nameInput = document.getElementById("exampleInputName");
    const emailInput = document.getElementById("exampleInputEmail1");
    const passwordInput = document.getElementById("exampleInputPassword1");
    const submitButton = document.querySelector('button[type="submit"]');
  
    // Set onBlur event listeners
    nameInput.addEventListener("blur", validateName);
    emailInput.addEventListener("blur", validateEmail);
    passwordInput.addEventListener("blur", validatePassword);
  
    // Disable submit button initially
    submitButton.disabled = true;
  
    function validateName() {
      const name = nameInput.value.trim();
  
      if (name === "") {
        displayErrorMessage("namelock", "Name cannot be empty");
        disableSubmitButton();
      } else if (/\d/.test(name)) {
        displayErrorMessage("namelock", "Name cannot contain numbers");
        disableSubmitButton();
      } else {
        clearErrorMessage("namelock");
        enableSubmitButton();
      }
    }
  
    function validateEmail() {
      const email = emailInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
      if (email === "") {
        displayErrorMessage("maillock", "Email cannot be empty");
        disableSubmitButton();
      } else if (!emailRegex.test(email)) {
        displayErrorMessage("maillock", "Invalid email format");
        disableSubmitButton();
      } else {
        clearErrorMessage("maillock");
        enableSubmitButton();
      }
    }
  
    function validatePassword() {
      const password = passwordInput.value;
      // Password requirements
      const lengthRequirement = password.length >= 8;
      const numberRequirement = /\d/.test(password);
      const uppercaseRequirement = /[A-Z]/.test(password);
      const lowercaseRequirement = /[a-z]/.test(password);
      const specialCharacterRequirement = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);
  
      if (!lengthRequirement) {
        displayErrorMessage("passwordlock", "Password must be at least 8 characters long");
        disableSubmitButton();
      } else if (!numberRequirement) {
        displayErrorMessage("passwordlock", "Password must contain at least one number");
        disableSubmitButton();
      } else if (!uppercaseRequirement) {
        displayErrorMessage("passwordlock", "Password must contain at least one uppercase letter");
        disableSubmitButton();
      } else if (!lowercaseRequirement) {
        displayErrorMessage("passwordlock", "Password must contain at least one lowercase letter");
        disableSubmitButton();
      } else if (!specialCharacterRequirement) {
        displayErrorMessage("passwordlock", "Password must contain at least one special character");
        disableSubmitButton();
      } else {
        clearErrorMessage("passwordlock");
        enableSubmitButton();
      }
    }
  
    function displayErrorMessage(targetId, message) {
      const errorElement = document.getElementById(targetId);
  
      if (errorElement) {
        errorElement.textContent = message;
      }
    }
  
    function clearErrorMessage(targetId) {
      const errorElement = document.getElementById(targetId);
  
      if (errorElement) {
        errorElement.textContent = "";
      }
    }
  
    function enableSubmitButton() {
      submitButton.disabled = false;
    }
  
    function disableSubmitButton() {
      submitButton.disabled = true;
    }
  });
  