const addTaskBtn = document.getElementById('addTaskBtn');
const clearAllBtn = document.getElementById('clearAllBtn');
const tasksContainer = document.getElementById('tasksContainer');
const newTaskInput = document.getElementById('newTask');
const energyButtons = document.querySelectorAll('.energy-btn');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let energyLevel = localStorage.getItem('energyLevel') || 'Medium';

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function saveEnergy() {
  localStorage.setItem('energyLevel', energyLevel);
}

function renderTasks() {
  tasksContainer.innerHTML = '';
  tasks.forEach((task, index) => {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');

    const taskInfo = document.createElement('div');
    taskInfo.classList.add('task-info');

    const taskText = document.createElement('span');
    taskText.textContent = task.text;

    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = 1;
    slider.max = 10;
    slider.value = task.priority;
    slider.classList.add('slider');
    slider.oninput = () => {
      task.priority = slider.value;
      saveTasks();
    };

    taskInfo.appendChild(taskText);
    taskInfo.appendChild(slider);

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'X';
    removeBtn.onclick = () => {
      taskDiv.classList.add('removing');
      setTimeout(() => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      }, 200);
    };

    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('task-buttons');
    buttonsDiv.appendChild(removeBtn);

    taskDiv.appendChild(taskInfo);
    taskDiv.appendChild(buttonsDiv);
    tasksContainer.appendChild(taskDiv);
  });
}

// Add new task
addTaskBtn.addEventListener('click', () => {
  const taskValue = newTaskInput.value.trim();
  if (taskValue) {
    tasks.push({ text: taskValue, priority: 5 });
    newTaskInput.value = '';
    saveTasks();
    renderTasks();
  }
});

// Clear all tasks
clearAllBtn.addEventListener('click', () => {
  if (confirm('Clear all tasks?')) {
    tasks = [];
    saveTasks();
    renderTasks();
  }
});

// Enter key to add task
newTaskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTaskBtn.click();
});

// Energy buttons
energyButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    energyLevel = btn.getAttribute('data-level');
    saveEnergy();
    alert(`Energy set to ${energyLevel}`);
  });
});

// Initial render
renderTasks();
