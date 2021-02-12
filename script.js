"use strict";

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

let todoData = [];

const uploadStorage = function(arr){
 const json = JSON.stringify(arr);
 localStorage.todoData = json;
};

const downloadStorage = function(){
 const arr = JSON.parse(localStorage.todoData);
 return arr;
};




const render = function() {
 if (todoData.length === 0){
  localStorage.removeItem('todoData');
 } else {
  uploadStorage(todoData);
 }
  

 todoList.textContent = '';
 todoCompleted.textContent = '';

 todoData.forEach(function(item){
   const li = document.createElement('li');
   li.classList.add('todo-item');
   li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
    '<div class="todo-buttons">' +
    '<button class="todo-remove"></button>' +
    '<button class="todo-complete"></button>' +
    '</div>';

    if (item.completed) {
     todoCompleted.append(li);
    } else {
     todoList.append(li);
    }

    const todoComplete = li.querySelector('.todo-complete');
    const todoRemove = li.querySelector('.todo-remove');

    todoComplete.addEventListener('click', function(){
     item.completed = !item.completed;
     render();
   });
    todoRemove.addEventListener('click', function(){
    todoData.splice(todoData.indexOf(item),1);
    
    render();
    });

 });

};

todoControl.addEventListener('submit', function(event){
 event.preventDefault();
 if (!headerInput.value) {
  return;
 }
 const newTodo = {
  value: headerInput.value,
  completed: false
 };


 todoData.push(newTodo);
 render();
 headerInput.value = '';
});

if (localStorage.getItem('todoData') !== null) {
 todoData = todoData.concat(downloadStorage());
 render();
} else {
 render();
}
