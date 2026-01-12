document.addEventListener("DOMContentLoaded", () => {
  // Energy level
  const energyButtons = document.querySelectorAll(".energy-button");
  const energyDisplay = document.getElementById("energy-display");

  energyButtons.forEach(button => {
    button.addEventListener("click", () => {
      energyButtons.forEach(b => b.classList.remove("selected"));
      button.classList.add("selected");
      const value = button.dataset.value;
      energyDisplay.textContent = value;
      localStorage.setItem("energyLevel", value);
    });
  });

  // Load energy on page load
  const savedEnergy = localStorage.getItem("energyLevel");
  if (savedEnergy) {
    energyButtons.forEach(b => {
      if (b.dataset.value === savedEnergy) {
        b.classList.add("selected");
        energyDisplay.textContent = savedEnergy;
      }
    });
  }

  // Thoughts
  const thoughtsTextarea = document.getElementById("thoughts");
  thoughtsTextarea.value = localStorage.getItem("thoughts") || "";
  thoughtsTextarea.addEventListener("input", () => {
    localStorage.setItem("thoughts", thoughtsTextarea.value);
  });

  // Chores
  const choresTextarea = document.getElementById("chores");
  choresTextarea.value = localStorage.getItem("chores") || "";
  choresTextarea.addEventListener("input", () => {
    localStorage.setItem("chores", choresTextarea.value);
  });

  // Optional features
  const timerCheckbox = document.getElementById("timerCheckbox");
  const breaksCheckbox = document.getElementById("breaksCheckbox");
  const dopamineCheckbox = document.getElementById("dopamineCheckbox");

  [timerCheckbox, breaksCheckbox, dopamineCheckbox].forEach(cb => {
    cb.checked = localStorage.getItem(cb.id) === "true";
    cb.addEventListener("change", () => {
      localStorage.setItem(cb.id, cb.checked);
    });
  });

  // Clear Forms Button with confirmation
  const clearButton = document.getElementById("clear-forms");
  clearButton.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear all forms?")) {
      // Clear energy
      energyButtons.forEach(b => b.classList.remove("selected"));
      energyDisplay.textContent = "0";
      localStorage.removeItem("energyLevel");

      // Clear thoughts
      thoughtsTextarea.value = "";
      localStorage.removeItem("thoughts");

      // Clear chores
      choresTextarea.value = "";
      localStorage.removeItem("chores");

      // Clear optional features
      [timerCheckbox, breaksCheckbox, dopamineCheckbox].forEach(cb => {
        cb.checked = false;
        localStorage.removeItem(cb.id);
      });

      // Flash background for feedback
      document.body.style.backgroundColor = "#ffe6e6";
      setTimeout(() => document.body.style.backgroundColor = "#fdf6e3", 300);
    }
  });
});
