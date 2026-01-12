// Task Management
const addTaskBtn = document.getElementById('addTaskBtn');
const clearTasksBtn = document.getElementById('clearTasksBtn');
const taskList = document.getElementById('taskList');

addTaskBtn.addEventListener('click', () => {
    const taskInput = document.getElementById('task');
    const importanceInput = document.getElementById('importance');
    const taskValue = taskInput.value.trim();
    const importanceValue = parseInt(importanceInput.value);

    if (taskValue && importanceValue >= 1 && importanceValue <= 10) {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task';
        taskDiv.textContent = `(${importanceValue}) ${taskValue}`;
        taskList.appendChild(taskDiv);
        taskInput.value = '';
        importanceInput.value = '';
    } else {
        alert('Please enter a valid task and importance (1-10).');
    }
});

clearTasksBtn.addEventListener('click', () => {
    taskList.innerHTML = '';
});

// Energy Level Buttons
const energyBtns = document.querySelectorAll('.energy-btn');
const energyDisplay = document.getElementById('energyDisplay');

energyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        energyDisplay.textContent = `Current Energy: ${btn.dataset.level}`;
        energyDisplay.style.color = btn.dataset.level === 'High' ? 'green' : btn.dataset.level === 'Medium' ? 'orange' : 'red';
    });
});
