const todosContainer = document.querySelector("#todos")
const todoInput = document.querySelector("#todo-input")
const form = document.querySelector("form")

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
    todoInput.value = ""; 

});

todosContainer.addEventListener("click", (e) =>{
    if(e.target.getAttribute("id") === "delete-btn"){
        todosContainer.removeChild(e.target.parentNode)
        const todoID = Number(e.target.parentNode.getAttribute("id"))
        const newTodos = todosArr.filter((todo) => todo.id !== todoID)
        localStorage.setItem("todosDB", JSON.stringify(newTodos))
    }else if(e.target.getAttribute("id") === "edit-btn"){
        editTodo(e)
    }
})

function editTodo(event){
    const p = event.target.parentNode.children[0]
    p.classList.add("dnon")
    const inputEl = document.createElement("input")
    inputEl.value = p.innerText;
    event.target.parentNode.prepend(inputEl)
}