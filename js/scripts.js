//seleção elementos por id
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todolist = document.querySelector("#todo-list");
const localStorageName = "todosV2.1";

//funções

  // Local Storage
const getTodosLocalStorage = () => {
    const todos = JSON.parse(localStorage.getItem(localStorageName)) || [];
  
    return todos;
};

const loadTodos = () => {
    const todos = getTodosLocalStorage();
  
    todos.forEach((todo) => {
        updateTodo(todo.text,todo.status);
    });
  };

const addButton = (parent,icon) => {
    const btn = document.createElement("button");
    btn.classList.add("todo-item-btn-"+icon);
    
    btn.innerHTML = '<i class="fa-solid fa-'+icon+'"></i>';
    parent.appendChild(btn);    
}

const updateTodo =(text,status)=>{
    const todoItem = document.createElement("div");
    
    todoItem.classList.add("todo-item");
    if (status===true) {
        todoItem.classList.toggle("done");    
    }

    const titleTodoItem = document.createElement("h3");
    titleTodoItem.innerText = text;
    todoItem.appendChild(titleTodoItem);

    addButton(todoItem,'check');
    //addButton(todoItem,'pen');
    addButton(todoItem,'xmark');

    todolist.appendChild(todoItem);
}

const StatusLocalStorage = (todoText) => {
    const todos = getTodosLocalStorage();
  
    todos.map((todo) =>
      todo.text === todoText ? (todo.status = !todo.status) : null
    );
  
    localStorage.setItem(localStorageName, JSON.stringify(todos));
};

const removeTodoLocalStorage = (todoText) => {
    const todos = getTodosLocalStorage();
  
    const filteredTodos = todos.filter((todo) => todo.text != todoText);
  
    localStorage.setItem(localStorageName, JSON.stringify(filteredTodos));
};

const updateTodoStatusLocalStorage = (todoText) => {
    const todos = getTodosLocalStorage();
  
    todos.map((todo) =>
      todo.text === todoText ? (todo.status = !todo.status) : null
    );
  
    localStorage.setItem(localStorageName, JSON.stringify(todos));
};

//eventos
todoForm.addEventListener("submit", (e)=>{
    e.preventDefault();        
    if (todoInput.value != "") {
        updateTodo(todoInput.value), false;

        const todos = getTodosLocalStorage();
        todos.push({text:todoInput.value, status: false});
        localStorage.setItem(localStorageName, JSON.stringify(todos));
    }
    
    todoInput.value = "";
});

document.addEventListener("click", (e)=>{
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    let todoTitle;

    if (parentEl && parentEl.querySelector("h3")) {
        todoTitle = parentEl.querySelector("h3").innerText;
    }    
    
    if (targetEl.classList.contains("todo-item-btn-check")) {
        parentEl.classList.toggle("done");
        updateTodoStatusLocalStorage(todoTitle);
    }
    
    if (targetEl.classList.contains("todo-item-btn-xmark")) {
        parentEl.remove();
        removeTodoLocalStorage(todoTitle);
    }    
})

loadTodos();