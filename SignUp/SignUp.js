import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBXmRjd-tVasRkAyo2Ae4dKqNJKqaIVsRw",
    authDomain: "taskmaster-73302.firebaseapp.com",
    projectId: "taskmaster-73302",
    storageBucket: "taskmaster-73302.appspot.com",
    messagingSenderId: "34122994646",
    appId: "1:34122994646:web:fe326319fc8451dd7c8a77",
    measurementId: "G-Z0Y6H1CGZ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const database = getDatabase();

let username = document.getElementById('username');
let email = document.getElementById('email');
let password = document.getElementById('password');
let confirm_password = document.getElementById('confirm_password');


let username_val;
let email_val;
let password_val;
let confirm_password_val;
/*
let username_val = username.value;
let email_val = email.value;
let password_val = password.value;
let confirm_password_val = confirm_password.value;

let user_pass = document.querySelector('.password').value;
let confirm_password = document.querySelector('.confirm_password').value;
*/
let btn = document.querySelector('button');
let errorMsg = document.getElementById('errorMessage');


function blankCheck(){
    if(username_val===""){
        errorMsg.innerText="Username must be filled";
        return false;
    }
    else if(email_val===""){
        errorMsg.innerText="Email must be filled";
        return false;
    }
    else if(password_val===""){
        //console.log(password);
        errorMsg.innerText="Password must be filled";
        return false;
    }
    else if(confirm_password_val===""){
        errorMsg.innerText="Confirm Password must be filled";
        return false;
    }
    else{
        return true;
    }
}

function passwordCheck(){
    if(password_val===confirm_password_val)return true;
    else{
        errorMsg.innerText="Password and Confirm Password must be same";
        return false;
    }
}

function emailCheck(){
    const re = /\S+@\S+\.\S+/;
    if(re.test(email_val)==false){
        errorMsg.innerText="Email must be in a good format";
    }
    else{
        return true;
    }
}


function validation(){
    if(blankCheck() && passwordCheck() && emailCheck()){
        return true;
    }
    else{
        return false;
    }
}

function initializeUserData(){
    username_val = username.value;
    email_val = email.value;
    password_val = password.value;
    confirm_password_val = confirm_password.value;
}

function reset(){
    username.value="";
    email.value="";
    password.value="";
    confirm_password.value="";
}
reset();

btn.addEventListener('click',function(){
    initializeUserData();
    if(validation()){
        createUserWithEmailAndPassword(auth,email_val,password_val)
        .then(function(){
            let userID= getAuth().currentUser.uid;
            let path = ref(database, userID);
            let user = {
                email:email_val,
                password:password_val,
                username:username_val
            };
            set(path,user);
            //alert("BERHASIL");
            reset();
        })
        .catch(function(error){
            errorMsg.innerText=error.message;
        });
    }
});