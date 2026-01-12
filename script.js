document.addEventListener("DOMContentLoaded", () => {
  // Energy Level
  const energyButtons = document.querySelectorAll(".energy-btn");
  const energyDisplay = document.getElementById("energy-display");

  energyButtons.forEach(button => {
    button.addEventListener("click", () => {
      energyButtons.forEach(b => b.classList.remove("selected"));
      button.classList.add("selected");

      const value = button.getAttribute("data-value");
      energyDisplay.textContent = value;
      localStorage.setItem("energyLevel", value);
    });
  });

  // Load stored energy
  const storedEnergy = localStorage.getItem("energyLevel");
  if (storedEnergy) {
    energyDisplay.textContent = storedEnergy;
    energyButtons.forEach(b => {
      if (b.getAttribute("data-value") === storedEnergy) b.classList.add("selected");
    });
  }

  // Thoughts
  const thoughtsTextarea = document.getElementById("thoughts");
  document.getElementById("save-thoughts").addEventListener("click", () => {
    localStorage.setItem("thoughts", thoughtsTextarea.value);
    alert("Thoughts saved!");
  });
  const savedThoughts = localStorage.getItem("thoughts");
  if (savedThoughts) thoughtsTextarea.value = savedThoughts;

  // Chores
  const choresTextarea = document.getElementById("chores");
  document.getElementById("save-chores").addEventListener("click", () => {
    localStorage.setItem("chores", choresTextarea.value);
    alert("Chores saved!");
  });
  const savedChores = localStorage.getItem("chores");
  if (savedChores) choresTextarea.value = savedChores;

  // Optional Features
  const timerCheckbox = document.getElementById("timer");
  const breaksCheckbox = document.getElementById("breaks");
  const dopamineCheckbox = document.getElementById("dopamine");

  timerCheckbox.checked = localStorage.getItem("timer") === "true";
  breaksCheckbox.checked = localStorage.getItem("breaks") === "true";
  dopamineCheckbox.checked = localStorage.getItem("dopamine") === "true";

  [timerCheckbox, breaksCheckbox, dopamineCheckbox].forEach(cb => {
    cb.addEventListener("change", () => {
      localStorage.setItem(cb.id, cb.checked);
    });
  });
});
