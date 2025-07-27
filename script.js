// script.js

document.addEventListener('DOMContentLoaded', () => {
  loadHabits();
});

function addHabit() {
  const habitInput = document.getElementById('habitInput');
  const habitText = habitInput.value.trim();
  if (habitText === '') return;

  const habit = {
    text: habitText,
    completed: false
  };

  const habits = getHabits();
  habits.push(habit);
  saveHabits(habits);
  habitInput.value = '';
  renderHabits(habits);
}

function toggleHabit(index) {
  const habits = getHabits();
  habits[index].completed = !habits[index].completed;
  saveHabits(habits);
  renderHabits(habits);
}

function resetHabits() {
  if (confirm("Are you sure you want to reset all habits?")) {
    localStorage.removeItem('habits');
    renderHabits([]);
  }
}

function getHabits() {
  return JSON.parse(localStorage.getItem('habits')) || [];
}

function saveHabits(habits) {
  localStorage.setItem('habits', JSON.stringify(habits));
}

function renderHabits(habits) {
  const habitList = document.getElementById('habitList');
  habitList.innerHTML = '';
  habits.forEach((habit, index) => {
    const li = document.createElement('li');
    const label = document.createElement('label');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = habit.completed;
    checkbox.addEventListener('change', () => toggleHabit(index));

    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(habit.text));

    li.appendChild(label);
    habitList.appendChild(li);
  });
}

function loadHabits() {
  const habits = getHabits();
  renderHabits(habits);
}
