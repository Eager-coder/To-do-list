const input = document.querySelector('input');
const listContainer = document.querySelector('.list-container');
const addBtn = document.querySelector('button');

input.addEventListener('keypress', function(e){
    if (e.key == "Enter"){
        addTask()
    }
})
addBtn.addEventListener('click', addTask);
listContainer.addEventListener('click', deleteTask);
listContainer.addEventListener('click', crossOut);
window.onload = retrieve();

function retrieve(){
    if (localStorage.length){
        let taskList = JSON.parse(localStorage.getItem('tasks'));
        tasklist = taskList.filter(element => element.length > 0);
        taskList.forEach(element => {
            let box = document.createElement('div');
            box.classList.add('list-box');
            let check = document.createElement('i');

            check.className = 'fas fa-check-square'
            check.id = 'check';
            let li = document.createElement('input');
            li.value = element;
            li.id = 'todo';
            let img = document.createElement('i');
            img.className ="fas fa-trash-alt";
            img.id = 'remove';
            img.dataset.id = element;
            box.appendChild(check);
            box.appendChild(li);
            listContainer.appendChild(box);
            box.appendChild(img);
        })
    }
    input.value = ''
}  

function addTask(){
    if (input.value !== ''){  
        let box = document.createElement('div');
        box.classList.add('list-box');
        let check = document.createElement('i');

        check.className = 'fas fa-check-square'
        check.id = 'check';
        let li = document.createElement('input');

        li.id = 'todo';
        li.value = input.value;
        let img = document.createElement('i');
        img.className ="fas fa-trash-alt";
        img.id = 'remove';
        img.dataset.id = input.value;
        box.appendChild(check);
        box.appendChild(li);
        listContainer.appendChild(box);
        img.src= "trash.svg";
        box.appendChild(img);  
        if (localStorage.hasOwnProperty('tasks')){
            let taskList = JSON.parse(localStorage.getItem('tasks'));
            taskList.push(input.value);
            localStorage.setItem('tasks', JSON.stringify(taskList));  
        }
        else{
            let taskList = [input.value];
            localStorage.setItem('tasks', JSON.stringify(taskList));
        }
    }
    input.value = '';
}

function deleteTask(trash){
    if (trash.target.id === 'remove'){
        let taskList = JSON.parse(localStorage.getItem('tasks'));
        taskList = taskList.filter( e =>  e != trash.target.dataset.id );
        localStorage.setItem('tasks', JSON.stringify(taskList))
        trash.target.parentElement.remove();
    }
}

function crossOut(checkbox){
    if(checkbox.target.id === 'check')
    checkbox.target.nextElementSibling.classList.toggle('line-through')
    checkbox.target.classList.toggle('i-active')
}

document.addEventListener('click', ()=>{
    [...listContainer.querySelectorAll('#todo')].forEach( (element, index) => {
        element.addEventListener('input', () =>{
            let taskList = JSON.parse(localStorage.getItem('tasks'));
            taskList[index] = element.value;
            element.nextElementSibling.dataset.id = element.value;
            localStorage.setItem('tasks', JSON.stringify(taskList));
        })
    })
})
