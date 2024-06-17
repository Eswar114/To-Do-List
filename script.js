const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
function addTask() {
    if(inputBox.value ==='') {
        alert("You must write something!");
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        // for cancel button
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        // For edit button
        let editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "edit-btn";
        li.appendChild(editBtn);

        editBtn.addEventListener("click", function() {
            editTask(li);
        });
    }
    inputBox.value="";
    saveData();
}

listContainer.addEventListener("click", function (e) {
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function editTask(item) {
    let currentText = item.firstChild.textContent;
    let input = document.createElement("input");
    input.type = "text";
    input.value = currentText;
    item.firstChild.replaceWith(input);

    input.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            item.firstChild.replaceWith(document.createTextNode(input.value));
            saveData(); // Save the updated list
        }
    });
}

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem( "data" );
}
showTask();