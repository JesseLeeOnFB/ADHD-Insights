// ADHD Insights JS
let energyLevel = 5;
const energyDisplay = document.getElementById("energy-level");
const tasksList = document.getElementById("tasks-list");

// Load saved data if exists
if(localStorage.getItem("energyLevel")){
  energyLevel = parseInt(localStorage.getItem("energyLevel"));
  energyDisplay.textContent = energyLevel;
}
if(localStorage.getItem("tasks")){
  tasksList.innerHTML = localStorage.getItem("tasks");
}

// Energy buttons
document.getElementById("energy-up").addEventListener("click", () => {
  if(energyLevel < 10) energyLevel++;
  energyDisplay.textContent = energyLevel;
  localStorage.setItem("energyLevel", energyLevel);
});

document.getElementById("energy-down").addEventListener("click", () => {
  if(energyLevel > 0) energyLevel--;
  energyDisplay.textContent = energyLevel;
  localStorage.setItem("energyLevel", energyLevel);
});

// Add task
document.getElementById("add-task").addEventListener("click", () => {
  const taskText = document.getElementById("task-input").value;
  const taskPriority = document.getElementById("task-priority").value;
  if(taskText && taskPriority){
    const li = document.createElement("li");
    li.textContent = `${taskText} (Priority: ${taskPriority})`;
    tasksList.appendChild(li);
    document.getElementById("task-input").value = "";
    document.getElementById("task-priority").value = "";
    localStorage.setItem("tasks", tasksList.innerHTML);
  }
});

// Clear all forms
document.getElementById("clear-forms").addEventListener("click", () => {
  document.getElementById("thoughts").value = "";
  document.getElementById("task-input").value = "";
  document.getElementById("task-priority").value = "";
  tasksList.innerHTML = "";
  energyLevel = 5;
  energyDisplay.textContent = energyLevel;
  localStorage.clear();
  // subtle UI change to indicate reset
  document.body.style.backgroundColor = "#b2dfdb";
  setTimeout(() => document.body.style.backgroundColor = "#e0f7fa", 200);
});
