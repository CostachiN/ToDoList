const todosContainer = document.querySelector("#todos")
const todoInput = document.querySelector("#todo-input")
const form = document.querySelector("form")
const todosArr = JSON.parse(localStorage.getItem("todosDB")) ?? []

loadInitialData(todosArr)

function loadInitialData(todos){
    for (const todo of todos){
        const div = document.createElement("div");
        const todoId = Date.now()
        div.setAttribute("id", todo.id)
        div.style.textAlign = "center";
        div.style.marginTop = "10px";
        div.style.padding = "10px";
        div.style.border = "1px solid darkblue";
        div.style.width = "200px";

        const p = document.createElement("p");
        p.textContent = todo.todoText;
        p.style.margin = "3px";
        p.style.marginRight = "20px";
        
        const editButton = document.createElement("button");
        editButton.innerText = "Edit"
        editButton.setAttribute("id", "edit-btn")
        editButton.style.backgroundColor = "bisque"
        editButton.style.width = "80px"
        editButton.style.margin = "5px";
        editButton.style.padding = "2px";

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete"
        deleteButton.setAttribute("id", "delete-btn")
        deleteButton.style.backgroundColor = "pink"
        deleteButton.style.width = "80px"
        deleteButton.style.margin = "5px";
        deleteButton.style.padding = "2px";

        div.appendChild(p);
        div.appendChild(editButton);
        div.appendChild(deleteButton);

        todosContainer.appendChild(div);
    }
}

form.addEventListener("submit", (e) =>{
    e.preventDefault();

    const div = document.createElement("div");
    const todoId = Date.now()
    div.setAttribute("id", todoId)
    div.style.textAlign = "center";
    div.style.marginTop = "10px";
    div.style.padding = "10px";
    div.style.border = "1px solid darkblue";
    div.style.width = "200px";

    const p = document.createElement("p");
    p.textContent = todoInput.value;
    p.style.margin = "3px";
    p.style.marginRight = "20px";
    
    const editButton = document.createElement("button");
    editButton.innerText = "Edit"
    editButton.setAttribute("id", "edit-btn")
    editButton.style.backgroundColor = "bisque"
    editButton.style.width = "80px"
    editButton.style.margin = "5px";
    editButton.style.padding = "2px";

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete"
    deleteButton.setAttribute("id", "delete-btn")
    deleteButton.style.backgroundColor = "pink"
    deleteButton.style.width = "80px"
    deleteButton.style.margin = "5px";
    deleteButton.style.padding = "2px";
    
    div.appendChild(p);
    div.appendChild(editButton);
    div.appendChild(deleteButton);

    todosContainer.appendChild(div);

    todosArr.push({
        id: todoId,
        todoText: p.textContent
    })

    localStorage.setItem("todosDB", JSON.stringify(todosArr))

    todoInput.value = "";  

});

todosContainer.addEventListener("click", (e) =>{
    if(e.target.id === "delete-btn"){
        todosContainer.removeChild(e.target.parentNode)
        const todoID = Number(e.target.parentNode.id)
        const newTodos = todosArr.filter((todo) => todo.id !== todoID)
        localStorage.setItem("todosDB", JSON.stringify(newTodos))

    } else if(e.target.id === "edit-btn"){
        editTodo(e)

    } else if(e.target.id === "save-btn"){
        saveTodo(e)

    } else if(e.target.id === "cancel-btn"){
        cancelTodo(e)
    }
})

function editTodo(event){
    const parent = event.target.parentNode;
    const p = parent.querySelector("p");
    const editBtn = parent.querySelector("#edit-btn");
    const deleteBtn = parent.querySelector("#delete-btn");

    editBtn.style.display = "none";
    deleteBtn.style.display = "none";
    p.style.display = "none";

    const input = document.createElement("input");
    input.value = p.textContent;
    input.id = "edit-input";

    const saveBtn = document.createElement("button");
    saveBtn.id = "save-btn";
    saveBtn.textContent = "Save";

    const cancelBtn = document.createElement("button");
    cancelBtn.id = "cancel-btn";
    cancelBtn.textContent = "Cancel";

    parent.appendChild(input);
    parent.appendChild(saveBtn);
    parent.appendChild(cancelBtn);
}

function saveTodo(event){
    const parent = event.target.parentNode;
    const input = parent.querySelector("#edit-input");
    const newValue = input.value;

    const p = parent.querySelector("p");
    const editBtn = parent.querySelector("#edit-btn");
    const deleteBtn = parent.querySelector("#delete-btn");

    p.textContent = newValue;

    const todoId = Number(parent.id);
    const todoObj = todosArr.find(t => t.id === todoId);
    if (todoObj) todoObj.todoText = newValue;
    localStorage.setItem("todosDB", JSON.stringify(todosArr));

    input.remove();
    event.target.remove(); 
    parent.querySelector("#cancel-btn").remove();

    p.style.display = "block";
    editBtn.style.display = "inline-block";
    deleteBtn.style.display = "inline-block";
}

function cancelTodo(event){
    const parent = event.target.parentNode;
    const input = parent.querySelector("#edit-input");

    const p = parent.querySelector("p");
    const editBtn = parent.querySelector("#edit-btn");
    const deleteBtn = parent.querySelector("#delete-btn");

    input.remove();
    parent.querySelector("#save-btn").remove();
    event.target.remove();

    p.style.display = "block";
    editBtn.style.display = "inline-block";
    deleteBtn.style.display = "inline-block";
}