const addTaskBtn = document.getElementById("add-task-btn"); //нашёл кнопку добавить
const deskTaskInput = document.getElementById("description-task"); //нашел поле ввода
const todosWraper = document.querySelector(".todos-wrapper"); //нашел поле вывода

let tasks; //массив ввода

//проверка и вывод из localStorage
!localStorage.tasks
  ? (tasks = [])
  : (tasks = JSON.parse(localStorage.getItem("tasks")));
let todoItemElems = [];
//функция конструкция ввода
function Task(description) {
  this.description = description; //key
  this.complited = false; //параметр
}
//функция(форма) создаваемая для html ,,,,,,
const createTemplate = (task, index) => {
  return `
  <div  class="todo-item${task.complited ? "checked" : ""}">
    <spen class="description">${task.description}<spen>
   
      <input onclick="completeTask(${index})" class="btn-complete" type="checkbox" ${
    task.complited ? "checked" : ""
  }/>
      <button onclick="deleteTask(${index})"class="btn-delete">delete</button>
    
  </div>
  `;
};
//фильтр элем.в
const filterTasks = () => {
  const activeTacks =
    tasks.length && tasks.filter((item) => item.complited == false);
  const completedTacks =
    tasks.length && tasks.filter((item) => item.complited == true);
  tasks = [...activeTacks, ...completedTacks];
};
//функция вывода списка на страницу
const fillHTMLlist = () => {
  todosWraper.innerHTML = "";
  if (tasks.length > 0) {
    filterTasks();
    tasks.forEach((item, index) => {
      todosWraper.innerHTML += createTemplate(item, index);
    });
    todoItemElems = document.querySelectorAll(".todo-item");
  }
};
fillHTMLlist(); //инициализация стр
//описание функции отправки в localStorage
const updateLocal = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

//фун-я какой имеено task completed
const completeTask = (index) => {
  tasks[index].complited = !tasks[index].complited;
  if (tasks[index].complited) {
    todoItemElems[index].classList.add("checked");
  } else {
    todoItemElems[index].classList.remove("checked");
  }
  updateLocal();
  fillHTMLlist();
};
//функция добавить в массив
addTaskBtn.addEventListener("click", () => {
  tasks.push(new Task(deskTaskInput.value));
  updateLocal(); //вызов фун-ии отправки в localStorage
  fillHTMLlist(); //функция вывода списка на страницу
  deskTaskInput.value = ""; //после ввода пустая строка
});

const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateLocal();
  fillHTMLlist();
};
