document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  const nameField = document.getElementById("name");
  const emailField = document.getElementById("email");
  const messageField = document.getElementById("message");
  const fields = [nameField, emailField, messageField];
  const status = form.querySelector(".form-status");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const getError = (field) => {
    if (field === nameField && !field.value.trim()) {
      return "Please enter your name.";
    }

    if (field === emailField && !emailPattern.test(field.value.trim())) {
      return "Please enter a valid email address.";
    }

    if (field === messageField && field.value.trim().length < 10) {
      return "Message should be at least 10 characters long.";
    }

    return "";
  };

  const clearError = (field) => {
    const errorId = `${field.id}-error`;
    document.getElementById(errorId)?.remove();
    field.removeAttribute("aria-invalid");
    field.removeAttribute("aria-describedby");
  };

  const validateField = (field) => {
    const message = getError(field);
    const errorId = `${field.id}-error`;
    let errorNode = document.getElementById(errorId);

    if (!message) {
      clearError(field);
      return true;
    }

    if (!errorNode) {
      errorNode = document.createElement("p");
      errorNode.id = errorId;
      errorNode.className = "error-message";
      field.insertAdjacentElement("afterend", errorNode);
    }

    errorNode.textContent = message;
    field.setAttribute("aria-invalid", "true");
    field.setAttribute("aria-describedby", errorId);
    return false;
  };

  fields.forEach((field) => {
    field.addEventListener("input", () => {
      if (field.hasAttribute("aria-invalid")) validateField(field);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    status.textContent = "";

    const invalidFields = fields.filter((field) => !validateField(field));
    if (invalidFields.length > 0) {
      invalidFields[0].focus();
      status.textContent = "Please correct the highlighted fields and try again.";
      return;
    }

    form.reset();
    status.textContent =
      "Your message passed validation, but this demo does not send or store it.";
  });
});
