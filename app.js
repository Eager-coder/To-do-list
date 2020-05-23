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

// Setting to localStorage
if (localStorage.hasOwnProperty('tasks')){
    if (input.value != ''){
        let taskList = JSON.parse(localStorage.getItem('tasks'));
        taskList.push(input.value);
        localStorage.setItem('tasks', JSON.stringify(taskList));
    }
    
}
else{
    if (input.value != ''){
        let taskList = [input.value];
        localStorage.setItem('tasks', JSON.stringify(taskList));
    }
    else{
        
    }
    
}
let taskList = JSON.parse(localStorage.getItem('tasks'));
taskList.forEach(element => {
    let box = document.createElement('div');
    box.classList.add('list-box');
    let check = document.createElement('input');
    check.setAttribute('type', 'checkbox');
    let li = document.createElement('li');
    li.textContent = element;
    let img = document.createElement('div');
    img.classList.add('image-cont');
    box.appendChild(check);
    box.appendChild(li);
    listContainer.appendChild(box);
    img.innerHTML = '<img src="https://img.icons8.com/plasticine/100/000000/filled-trash.png"/>';
    box.appendChild(img);  
    console.log(element)
});
//functions
function addTask(){
    if (input.value != ''){
        
        let taskList = JSON.parse(localStorage.getItem('tasks'));
        taskList.push(input.value);
        localStorage.setItem('tasks', JSON.stringify(taskList))
        
        let box = document.createElement('div');
        box.classList.add('list-box');
        let check = document.createElement('input');
        check.setAttribute('type', 'checkbox');
        let li = document.createElement('li');
        li.textContent = input.value;
        let img = document.createElement('div');
        img.dataset.id = input.value;

        img.classList.add('image-cont');
        box.appendChild(check);
        box.appendChild(li);
        listContainer.appendChild(box);
        img.innerHTML = '<img src="https://img.icons8.com/plasticine/100/000000/filled-trash.png"/>';
        box.appendChild(img);  
    }
    input.value = '';
}

function deleteTask(trash){
    if (trash.target.parentElement.classList.contains("image-cont")){
        trash.target.parentElement.parentElement.remove();
        let taskList = JSON.parse(localStorage.getItem('tasks'));
        taskList = taskList.filter((e)=>{ e != trash.target.parentElement.dataset.id });
        localStorage.setItem('tasks', JSON.stringify(taskList))
    }
}

function crossOut(checkbox){
    if (checkbox.target.tagName = 'input'){
        checkbox.target.nextElementSibling.classList.toggle('line-through')
    }
}
