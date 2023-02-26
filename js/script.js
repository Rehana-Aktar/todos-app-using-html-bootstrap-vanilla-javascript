const print = console.log;
const todoTitle = document.querySelector('#todo-title');
const todoContent = document.querySelector('#todo-content');
const addTodoBtn = document.querySelector('#submit-btn');
const clearTodoBtn = document.querySelector('#clear-todos-btn');
const todoItems = document.querySelector('.todo-items');


addTodoBtn.addEventListener('click', () => {
  if (localStorage.getItem('todoList') == null) {
    localStorage.setItem('todoList', JSON.stringify([[todoTitle.value, todoContent.value]]));
  } else {
    let todosArray = JSON.parse(localStorage.getItem('todoList'));
    todosArray.push([todoTitle.value, todoContent.value]);
    localStorage.setItem('todoList', JSON.stringify(todosArray));
  }
  checkTodoList();
});

function checkTodoList() {
  if (JSON.parse(localStorage.getItem('todoList')) === null) {
    todoItems.innerHTML = '';
  } else {
    todoItems.innerHTML = '';
    JSON.parse(localStorage.getItem('todoList')).map((value, index) => {
      todoItems.innerHTML += `
      <div class="card my-2" style="width: 18rem">
          <div class="card-body">
            <h5 class="card-title">${index + 1}. ${value[0]}</h5>
            <p class="card-text">${value[1]}</p>
            <button class="btn btn-danger" onClick="removeTodoItem(${index})">Remove TODO</button>
          </div>
        </div>
      `;
    });
  }
}

checkTodoList();

const removeTodoItem = (index) => {
  let todosArray = JSON.parse(localStorage.getItem('todoList'));
  todosArray.splice(index, 1);
  localStorage.setItem('todoList', JSON.stringify(todosArray));
  checkTodoList();
};

clearTodoBtn.addEventListener('click', () => {
  const confirmTodoList = confirm('Are you sure do you want to clear all the todos???');
  if (confirmTodoList) {
    localStorage.removeItem('todoList');
    checkTodoList();
  }
});
