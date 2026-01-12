// --- TASK LOGIC ---
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task.text;
    if(task.faded) li.classList.add('faded');

    const actions = document.createElement('div');
    actions.className = 'task-actions';

    const doneBtn = document.createElement('button');
    doneBtn.textContent = '✔';
    doneBtn.onclick = () => {
      task.completed = true;
      task.faded = false;
      task.locked = true;
      saveTasks();
      renderTasks();
    }

    const fadeBtn = document.createElement('button');
    fadeBtn.textContent = 'Fade';
    fadeBtn.onclick = () => {
      task.faded = !task.faded;
      saveTasks();
      renderTasks();
    }

    const parkBtn = document.createElement('button');
    parkBtn.textContent = 'Park';
    parkBtn.onclick = () => {
      addParkedThought(task.text);
    }

    actions.appendChild(doneBtn);
    actions.appendChild(fadeBtn);
    actions.appendChild(parkBtn);

    li.appendChild(actions);
    taskList.appendChild(li);
  });
}

addTaskBtn.onclick = () => {
  if(taskInput.value.trim() === '') return;
  tasks.push({text: taskInput.value.trim(), completed:false, faded:false, locked:false});
  taskInput.value = '';
  saveTasks();
  renderTasks();
}

renderTasks();

// --- ENERGY METER ---
const energyButtons = document.querySelectorAll('#energyMeter button');
energyButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const level = btn.dataset.energy;
    tasks.forEach(task => {
      if(level === 'low') task.faded = true;
      if(level === 'good') task.faded = false;
    });
    saveTasks();
    renderTasks();
  });
});

// --- PARKING LOT ---
const parkInput = document.getElementById('parkInput');
const parkBtn = document.getElementById('parkBtn');
const parkedThoughts = document.getElementById('parkedThoughts');

let parked = JSON.parse(localStorage.getItem('parked')) || [];

function saveParked() {
  localStorage.setItem('parked', JSON.stringify(parked));
}

function renderParked() {
  parkedThoughts.innerHTML = '';
  parked.forEach((thought, i) => {
    const li = document.createElement('li');
    li.textContent = thought;
    parkedThoughts.appendChild(li);
  });
}

function addParkedThought(text){
  parked.push(text);
  saveParked();
  renderParked();
}

parkBtn.onclick = () => {
  if(parkInput.value.trim()==='') return;
  addParkedThought(parkInput.value.trim());
  parkInput.value = '';
}

renderParked();

// --- DONE TODAY ---
const doneTodayBtn = document.getElementById('doneToday');
const overlay = document.getElementById('overlay');

doneTodayBtn.onclick = () => {
  overlay.style.display = 'flex';
}

// Optional: clear overlay after click
overlay.onclick = () => overlay.style.display='none';
