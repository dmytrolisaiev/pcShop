"use strict"

const form_register = document.querySelector(".form_register");
const register_Succes= document.querySelector('.register_Succes');
const register_Error=document.querySelector('.register_Error');


form_register.addEventListener('submit',function (e){
    e.preventDefault();
    let error=formValidate(form_register);
  
    if (error===0){

        register_Succes.innerHTML="Все ок";
        register_Error.innerHTML="";
        form_register.reset();
    }
    else{
         register_Succes.innerHTML="";
         register_Error.innerHTML="Заполните все поля";
    }
});
   



function formValidate(form){
let error=0;
let formRequire =document.querySelectorAll(".formRequire");
let passwordInput =document.querySelector(".password");
let  password2Input=document.querySelector(".password2");
for (let i = 0; i < formRequire.length; i++) {
    const input = formRequire[i];
    removeError(input);
    if (input.classList.contains('usermail')) {
        if (checkMail(input)!=true) {
            formAddError(input);
            error++; }
    }
    else if(input.getAttribute("type")==="checkbox" && input.checked===false){
        formAddError(input);
        error++;
    }
    else if (input.value.trim()===""){
        formAddError(input);
        error++;
    }
    
    else if(input.value===''){
            formAddError(input);
            error++;
        }
    else if(passwordInput.value!==password2Input.value){
            formAddError(password2Input);
            error++;
    }
    }
    return error;
    }
    
    


function formAddError(input){
input.parentElement.classList.add('_Error');
input.classList.add('_Error');
    }
function removeError(input){
    input.parentElement.classList.remove('_Error');
    input.classList.remove('_Error');
    }
function checkMail(input){
    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    return EMAIL_REGEXP.test(input.value);
    }


