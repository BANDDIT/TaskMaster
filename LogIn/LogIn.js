import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
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


//const auth = getAuth(app);
//const database = getDatabase(app);
const auth = getAuth();
const database = getDatabase();

let email = document.getElementById('email');
let password = document.getElementById('password');

let email_val;
let password_val;

let btn = document.querySelector('button');
let errorMsg = document.getElementById('errorMessage');



function reset(){
    email.value="";
    password.value="";
}
reset();

function initializeUserData(){
    email_val = email.value;
    password_val = password.value;
}

btn.addEventListener('click',function(){
    initializeUserData();
    signInWithEmailAndPassword(auth,email_val,password_val)
    .then(function(){
        sessionStorage.setItem('userId',getAuth().currentUser.uid);
        reset();
        location.replace('../Main/main.html');
    })
    .catch(function(error){
        errorMsg.innerText=error.message;
    });

});
