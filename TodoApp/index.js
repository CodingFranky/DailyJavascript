console.log("todoApp");
let inputField ='';


document.querySelector(".input_field").addEventListener('change',(event)=>{
    inputField = event.target.value
    //console.log(document.querySelector(".input_field").value)
});



document.querySelector('.btn_add').addEventListener('click',addTaskFunction)

function addTaskFunction(){
    if(inputField !== ''){
    const task_list =  document.createElement('div');
    const newTask = document.createElement('div');
    const delete_btn = document.createElement('button');
    task_list.classList.add('task-list');
    newTask.classList.add('task-item');
    delete_btn.classList.add('btn','btn_delete');
    delete_btn.setAttribute('type','button')
    newTask.innerHTML= inputField;
    delete_btn.innerHTML= 'Delete';
    task_list.appendChild(newTask);
    task_list.appendChild(delete_btn);
    document.querySelector('.task_container').append(task_list);
    document.querySelector(".input_field").value =''
    inputField =''
    
}
}

const task_container = document.querySelector('.task_container');


task_container.addEventListener('click',(e)=>deleteTask(e))

function deleteTask(e){
    if(e.target.classList.contains("btn_delete")){
        task_container.removeChild(e.target.parentNode)
        
    }
}