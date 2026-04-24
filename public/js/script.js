(() => {
  "use strict";

  // Adding custom validation styles to forms.
  const forms = document.querySelectorAll(".needs-validation");
  
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      },
      false,
    );
  });


  // resolved: The error was coming due to icon hijack on close button of flash messages. I fixed it by using event delegation.
  document.addEventListener("click", (event) => {
    const closeBtn = event.target.closest("[data-flash-close]");
    if (!closeBtn) return;

    const flash = closeBtn.closest("[data-flash]");
    if (flash) flash.remove();
  });
})();
