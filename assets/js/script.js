document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.querySelector(".theme-toggle");
  const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");
  let storageAvailable = true;
  let savedTheme = null;

  const handleStorageError = (error) => {
    if (
      !(error instanceof DOMException) ||
      !["QuotaExceededError", "SecurityError"].includes(error.name)
    ) {
      throw error;
    }

    storageAvailable = false;
    if (themeToggle) {
      themeToggle.title = "Theme changes cannot be saved in this browser.";
    }
    console.error("Theme preference could not be saved; changes apply to this page only.", error);
  };

  try {
    savedTheme = localStorage.getItem("portfolio-theme");
  } catch (error) {
    handleStorageError(error);
  }

  let hasSavedTheme = savedTheme === "light" || savedTheme === "dark";

  const setTheme = (theme) => {
    const isDark = theme === "dark";
    document.documentElement.dataset.theme = theme;
    themeToggle.setAttribute("aria-pressed", String(isDark));
    const nextMode = isDark ? "light" : "dark";
    themeToggle.setAttribute(
      "aria-label",
      `Switch to ${nextMode} mode${storageAvailable ? "" : "; preference will not be saved"}`
    );
    themeToggle.textContent = isDark ? "Light mode" : "Dark mode";
  };

  if (themeToggle) {
    setTheme(hasSavedTheme ? savedTheme : colorScheme.matches ? "dark" : "light");

    themeToggle.addEventListener("click", () => {
      const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      setTheme(nextTheme);
      hasSavedTheme = true;
      if (storageAvailable) {
        try {
          localStorage.setItem("portfolio-theme", nextTheme);
        } catch (error) {
          handleStorageError(error);
          setTheme(nextTheme);
        }
      }
    });

    colorScheme.addEventListener("change", (event) => {
      if (!hasSavedTheme) setTheme(event.matches ? "dark" : "light");
    });
  }

  const yearNode = document.getElementById("year");
  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }
});
