const inputBox = document.getElementById("input");
const ListContainer = document.getElementById("listContainer");

function addTask(){
    if (inputBox.value === ''){
        alert("You must write something in the text box!!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        ListContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; // unicode for x symbol
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

ListContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    } else if(e.target.tagName === "SPAN" ){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", ListContainer.innerHTML);
}

function showTask() {
    ListContainer.innerHTML = localStorage.getItem("data");
}
showTask();