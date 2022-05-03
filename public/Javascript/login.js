
const input_login = document.querySelector('.sign_in');
const sign_up = document.querySelector('.sign-up');
const btn_login = document.querySelector('#btn_login');
const btn_sign_up = document.querySelector('#btn-sign-up');
const container = document.querySelector('.containers');
const btn_register = document.querySelector("#btn_register");
const start = document.querySelector(".start");
const validation_email = document.querySelector(".form-text");
const validation_password = document.querySelector(".text");
const validation_incorrect = document.querySelector(".incorrect");

// const name_error = document.querySelector(".name_error").value;
// const email_error = document.querySelector(".email_error").value;
// const password_error = document.querySelector(".password_error").value;
// const incorrect_error = document.querySelector(".incorrect_error").value;


const input_username = document.querySelector('#username');
const input_password = document.querySelector("#password");
const input_re_password = document.querySelector("#re-password").value;
const input_email = document.querySelector("#email");

const show = (element) => {
    element.style.display = 'block';
}

// Fucntion hide elemet
const hide = (element) => {
    element.style.display = 'none';
}

hide(sign_up);
hide(start);
hide(validation_email);
hide(validation_password);
hide(validation_incorrect);



// hide(container);
const show_start = (e) =>{
    e.preventDefault()
    hide(sign_up);
    show(start)
}
const show_Login = (e) => {
    e.preventDefault()
    hide(sign_up);
    show(input_login);
    hide(start)
}
const show_SignUp = (e) => {
    e.preventDefault()
    hide(input_login);
    show(sign_up);
}

function get_data_sign_up (){
 
    let sign_up = {
        user_name: input_username.value,
        password : input_password.value,
        email  : input_email.value
    } 

    if (input_username.value =="" && input_password.value == "" && input_email.value == "" && input_re_password == ""){
        alert("Please fill all input")
        // show_SignUp();
    }else{
        axios.post("/log/register",sign_up);
    }
    
    // if (input_username.value =="" || input_password.value == "" || input_email.value == "" || input_re_password == ""){
    //     alert("Please fill up all input");

    // }


    
}

function login(e){
    e.preventDefault()
    let url = "http://localhost:3000";
    let input_password = document.querySelector("#passwords").value;
    let input_email = document.querySelector("#emails").value;

    let all_data = {email:input_email,password: input_password};
    axios.post(url + "/log/logins", all_data).then((result)=>{
        if(input_email == "") {
            show(validation_email)
            hide(validation_incorrect);
        } if (input_password == ""){
            show(validation_password)
            hide(validation_incorrect); 
        }
        else if (result.data) {
            show(start);
            hide(input_login);
        }else if (!result.data && input_email !="" && input_password !="") {
            show(validation_incorrect);
            hide(validation_password)
            hide(validation_email);

        }else{
            show(validation_incorrect);
        }
    })

};
// if(result.data) {
//     alert("login successful")
//     console.log(result);
// }else {
//     alert("invalid email")
// }



let sign = document.querySelector("#btn_register");
sign.addEventListener('click',()=>{
    get_data_sign_up()
});



// btn_login.addEventListener("click", show_SignUp);
btn_sign_up.addEventListener('click', show_SignUp);
btn_register .addEventListener('click',show_start);
btn_login.addEventListener('click',login);

