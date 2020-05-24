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
        taskList.forEach(element => {
            let box = document.createElement('div');
            box.classList.add('list-box');
            let check = document.createElement('img');
            check.src ="https://img.icons8.com/offices/100/000000/unchecked-checkbox.png"
            //check.setAttribute('type', 'checkbox');
            check.id = 'check';
            let li = document.createElement('input');
            li.value = element;
            li.id = 'todo';
            let img = document.createElement('img');
            img.classList.add('image');
            img.id = 'remove';
            img.dataset.id = element;
            box.appendChild(check);
            box.appendChild(li);
            listContainer.appendChild(box);
            img.src ="https://img.icons8.com/plasticine/100/000000/filled-trash.png";
            box.appendChild(img);  
        })
    }
    input.value = ''
}  

function addTask(){
    if (input.value !== ''){  
        let box = document.createElement('div');
        box.classList.add('list-box');
        let check = document.createElement('img');
        check.src ="https://img.icons8.com/offices/100/000000/unchecked-checkbox.png"
        //check.setAttribute('type', 'checkbox');
        check.id = 'check';
        let li = document.createElement('input');
        li.id = 'todo';
        li.value = input.value;
        let img = document.createElement('img');
        img.id = 'remove';
        img.dataset.id = input.value;
        img.classList.add('image');
        box.appendChild(check);
        box.appendChild(li);
        listContainer.appendChild(box);
        img.src= "https://img.icons8.com/plasticine/100/000000/filled-trash.png";
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
    // if (checkbox.target.checked === true){
    //     checkbox.target.nextElementSibling.classList.add('line-through')
    // }
    // if(checkbox.target.checked === false){
    //     checkbox.target.nextElementSibling.classList.remove('line-through')
    // }
    if(checkbox.target.id === 'check')
    checkbox.target.nextElementSibling.classList.toggle('line-through')
}

document.addEventListener('click', ()=>{
    [...listContainer.querySelectorAll('#todo')].forEach( (element, index) => {
        element.addEventListener('input', () =>{
            let taskList = JSON.parse(localStorage.getItem('tasks'));
            taskList[index] = element.value;
            element.nextElementSibling.dataset.id = element.value;
            localStorage.setItem('tasks', JSON.stringify(taskList))
        })
    })
})
