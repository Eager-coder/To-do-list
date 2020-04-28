// constants
const input = document.querySelector('input');
const listContainer = document.querySelector('.list-container');
const btn = document.querySelector('button');

// event listeners
input.addEventListener('keypress', function(e){
    if (e.key == "Enter"){
        addTask()
    }
})
btn.addEventListener('click', addTask);
listContainer.addEventListener('click', deleteTask);
listContainer.addEventListener('click', crossOut);
//functions
function addTask(){
    if (input.value == 0){
        
    }
    else{
        var box = document.createElement('div');
        box.classList.add('list-box');
        listContainer.appendChild(box);
        var check = document.createElement('input');
        check.setAttribute('type', 'checkbox');
        box.appendChild(check);
        var li = document.createElement('li');
        li.textContent = input.value;
        box.appendChild(li);
        var img = document.createElement('div');
        img.classList.add('image-cont');
        img.innerHTML = '<img src="https://img.icons8.com/plasticine/100/000000/filled-trash.png"/>';
        box.appendChild(img);
        input.value = "";
    }
}

function deleteTask(trash){
    if (trash.target.parentElement.classList.contains("image-cont")){
        trash.target.parentElement.parentElement.remove()
    }
}

function crossOut(checkbox){
    if (checkbox.target.tagName = 'input'){
        checkbox.target.nextElementSibling.classList.toggle('line-through')
    }
}
