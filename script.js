// Energy Level Logic
const energyButtons = document.querySelectorAll(".energy-btn");
const energyDisplay = document.getElementById("energy-display");

energyButtons.forEach(button => {
  button.addEventListener("click", () => {
    // Remove 'selected' from all
    energyButtons.forEach(b => b.classList.remove("selected"));
    button.classList.add("selected");

    const value = button.getAttribute("data-value");
    energyDisplay.textContent = value;
    localStorage.setItem("energyLevel", value);
  });
});

// Load stored energy level
window.addEventListener("load", () => {
  const stored = localStorage.getItem("energyLevel");
  if (stored) {
    energyDisplay.textContent = stored;
    energyButtons.forEach(b => {
      if (b.getAttribute("data-value") === stored) b.classList.add("selected");
    });
  }
});

// Thoughts Organizer
const thoughtsTextarea = document.getElementById("thoughts");
document.getElementById("save-thoughts").addEventListener("click", () => {
  localStorage.setItem("thoughts", thoughtsTextarea.value);
  alert("Thoughts saved!");
});
window.addEventListener("load", () => {
  const savedThoughts = localStorage.getItem("thoughts");
  if (savedThoughts) thoughtsTextarea.value = savedThoughts;
});

// Chores / Errands
const choresTextarea = document.getElementById("chores");
document.getElementById("save-chores").addEventListener("click", () => {
  localStorage.setItem("chores", choresTextarea.value);
  alert("Chores saved!");
});
window.addEventListener("load", () => {
  const savedChores = localStorage.getItem("chores");
  if (savedChores) choresTextarea.value = savedChores;
});

// Optional Features (save preferences)
const timerCheckbox = document.getElementById("timer");
const breaksCheckbox = document.getElementById("breaks");
const dopamineCheckbox = document.getElementById("dopamine");

window.addEventListener("load", () => {
  timerCheckbox.checked = localStorage.getItem("timer") === "true";
  breaksCheckbox.checked = localStorage.getItem("breaks") === "true";
  dopamineCheckbox.checked = localStorage.getItem("dopamine") === "true";
});

[timerCheckbox, breaksCheckbox, dopamineCheckbox].forEach(cb => {
  cb.addEventListener("change", () => {
    localStorage.setItem(cb.id, cb.checked);
  });
});
