import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { getDatabase, ref, set, onValue, remove } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBXmRjd-tVasRkAyo2Ae4dKqNJKqaIVsRw",
    authDomain: "taskmaster-73302.firebaseapp.com",
    projectId: "taskmaster-73302",
    storageBucket: "taskmaster-73302.appspot.com",
    messagingSenderId: "34122994646",
    appId: "1:34122994646:web:fe326319fc8451dd7c8a77",
    measurementId: "G-Z0Y6H1CGZ8"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const database = getDatabase();


let userID = sessionStorage.getItem('userId');
let log_out = document.querySelector('.default_log_out');
let btn = document.querySelector('button');
let task_name = document.getElementById('task_name');
let deadline = document.getElementById('deadline');
let desc = document.getElementById('desc');
let task_name_val, deadline_val, desc_val;
let errorMsg = document.getElementById('errorMessage');
let check = document.querySelectorAll('.check');
let back = document.querySelectorAll('.back');
let todo_list_bottom = document.querySelectorAll('.todo_list_bottom');
let todo_list = document.querySelector('.todo_list');
let todo_list_item;
let arrayKey=[];
let task_list;

function securityCheck(){
    if(userID=='0'||userID==null){
        location.replace("../LogIn/LogIn.html");
    }
}
securityCheck();


log_out.addEventListener('click',function(){
    sessionStorage.setItem('userId','0');
    location.replace("../LogIn/LogIn.html");
});


function blankValidation(){
    if(task_name_val==""){
        errorMsg.innerText="Task Name must be filled";
        return false;
    }
    else if(deadline_val==""){
        errorMsg.innerText="Deadline must be filled";
        return false;
    }
    else if(desc_val==""){
        errorMsg.innerText="Task Description must be filled";
        return false;
    }
    else{
        //alert("MASUK1");
        return true;
    }
}
function charValidation(){
    if(task_name_val.length>50){
        errorMsg.innerText="Task Name must be under 50 character";
        return false;
    }
    else if(desc_val.length>200){
        errorMsg.innerText="Task Description must be under 200 character";
        return false;
    }
    else{
        //alert("MASUK2");
        return true;
    }
}

function presentDataValidation(){
    /*
    let path = ref(database, userID+'/Task/'+task_name_val);
    onValue(path,(snapshot)=>{
        if(snapshot.val()==null){
            alert("ATAS");
            return true;
        }
        else{
            errorMsg.innerText="You have a same task name in your list"
            return false;
        }
    });*/

    let size_arrayKey = arrayKey.length;
    for(let i=0;i<size_arrayKey;i++){
        if(task_name_val==arrayKey[i]){
            //console.log(task_name_val);
            //console.log(arrayKey[i]);
            errorMsg.innerText="You cannot have a task with the same name";
            return false;
        }
    }
    return true;
}

function reset(){
    task_name.value="";
    deadline.value="";
    desc.value="";
    errorMsg.innerText="";
}
reset();
function sendTaskToDB(){
    let task = {
        judul : task_name_val,
        deadline : deadline_val,
        desc : desc_val
    }
    let path = ref(database, userID+'/Task/'+task_name_val);
    set(path,task);
    reset();
}
function validation(){
    if(blankValidation()&&charValidation()&&presentDataValidation()){
        //console.log("berhasil");
        return true;
    }
    else{
        //alert("SALAH");
        return false;
    }
}


/*
SEPERTINYA GARA2 Delete-nya belum didefinsiin apa2 aja gitu

*/

btn.addEventListener('click',function(){
    task_name_val = task_name.value;
    deadline_val = deadline.value;
    desc_val = desc.value;
    if(validation()){
        //arrayKey.push(task_name_val);
        clearAllChild();
        sendTaskToDB();
        //console.log(arrayKey);
        //licreateTask(task_name_val,deadline_val,desc_val);
    }
});


function initializeListener(){
    //KEKNYA GARA2 GAADA DOCUMENT.QUERYSELECTORALL
    check = querySelectorAll('.check');
    back = querySelectorAll('.back');
    //console.log("INITIALIZE LISTENER");
    for(let i=0;i<back.length;i++){
        back[i].addEventListener('click',function(e){
            //alert("MASUK");
            todo_list_bottom[i].classList.toggle('todo_list_bottom_show');
            back[i].classList.toggle('back_rotate');
        });
        
        check[i].addEventListener('click',function(e){
            alert("TESTER");
            /*
            let path = ref(database, userID+'/Task/'+arrayKey[i]);
            remove(path)
            .then(() => {
                console.log("Data berhasil dihapus dari database.");
            })
            .catch((error) => {
                console.log("Error saat menghapus data:", error);
            });
            arrayKey.pop(i);*/
        });
    
    }
}



/*
check[0].addEventListener('click',function(){
    alert("NAH");
});
check[1].addEventListener('click',function(){
    alert("NAH2");
});*/


function clearAllChild(){
    todo_list_item = document.querySelectorAll('.todo_list_item');
    let size = todo_list_item.length;
    for(let i=0;i<size;i++){
        todo_list.removeChild(todo_list_item[i]);
    }
}

function defaultInitialize(){
    const databaseRef = ref(database, userID+'/Task/');

    onValue(databaseRef,(snapshot)=>{
        //console.log("DEFAULT INITIALIZE");
        arrayKey=[];
        clearAllChild();
        task_list = snapshot.val();
        if(task_list){
            for (let taskId in task_list) {
                let task = task_list[taskId];
                //console.log(task);
            }
            
            Object.keys(task_list).forEach((taskId) => {
                let task = task_list[taskId];
                //console.log(task);
                arrayKey.push(task.judul);
                createTask(task.judul,task.deadline,task.desc);
            });
        }
    });
}
defaultInitialize();




/*
arrayKey.push("1111");
arrayKey.push("DUATIGA");
arrayKey.pop(2);
console.log(arrayKey);

Oke mantap ini bs jd hint dan petunjuk yang bagus banget
*/

function createTask(judul,deadline,description){
    //Buat container todo_list
    let container = document.createElement('div');
    container.classList.add('todo_list_item');

    //Buat container todo_list_top
    let todo_list_top = document.createElement('div');
    todo_list_top.classList.add('todo_list_top');

    //Buat container todo_list_bottom
    let todo_list_bottom = document.createElement('div');
    todo_list_bottom.classList.add('todo_list_bottom');
    let bottom_p = document.createElement('p');
    bottom_p.innerText=description;
    todo_list_bottom.appendChild(bottom_p);

    //Buat container todo_list_item_left
    let todo_list_item_left = document.createElement('div');
    todo_list_item_left.classList.add('todo_list_item_left');
    let h1 = document.createElement('h1');
    h1.innerText=judul;
    let p = document.createElement('p');
    p.innerText=deadline;
    todo_list_item_left.appendChild(h1);
    todo_list_item_left.appendChild(p);

    //Buat container todo_list_item_right
    let todo_list_item_right = document.createElement('div');
    todo_list_item_right.classList.add('todo_list_item_right');
    let first_span = document.createElement('span');
    first_span.classList.add('material-symbols-outlined');
    first_span.classList.add('check');
    first_span.innerHTML="check";

    let second_span = document.createElement('span');
    second_span.innerHTML="arrow_left";
    second_span.classList.add('material-symbols-outlined');
    second_span.classList.add('back');
    todo_list_item_right.appendChild(first_span);
    todo_list_item_right.appendChild(second_span);

    //Suntik todo_list_item_left dan right ke todo_list_top
    todo_list_top.appendChild(todo_list_item_left);
    todo_list_top.appendChild(todo_list_item_right);

    //Suntik top dan bottom ke container
    container.appendChild(todo_list_top);
    container.appendChild(todo_list_bottom);

    //Suntik container ke todo List
    todo_list.appendChild(container);


    //Memasukkan Add Event Listener ke Task
    let back = document.querySelectorAll('.back');
    let check = document.querySelectorAll('.check');
    todo_list_bottom = document.querySelectorAll('.todo_list_bottom');
    //console.log(back);
    let index = back.length-1;
    todo_list_item = document.querySelectorAll('.todo_list_item');
    //console.log(index);
    back[index].addEventListener('click',function(e){
        //alert("MASUK");
        todo_list_bottom[index].classList.toggle('todo_list_bottom_show');
        back[index].classList.toggle('back_rotate');
    });


            
    check[index].addEventListener('click',function(e){
        //alert("TESTER");
        let path = ref(database, userID+'/Task/'+arrayKey[index]);
        remove(path)
        .then(() => {
            //console.log(index);
            console.log("Data berhasil dihapus dari database.");
            //alert("Data berhasil dihapus dari database");
        })
        .catch((error) => {
            console.log("Error saat menghapus data:", error);
        });
        //todo_list.removeChild(todo_list_item[index]);
        //console.log("index "+index);
        //arrayKey.pop(index);
        //console.log(arrayKey);
    });

}



//console.log(check);
