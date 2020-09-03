window.onload = function() {
    init();
};

let emailActive = false;
let emailInput;
let emailLabel;
let emailSubmit;
let validity;
let goUp;

function init(){
    emailInput = document.getElementById('email-input');
    emailLabel = document.getElementById('email-label');
    emailSubmit = document.getElementById('submit');
    validity = document.getElementById('validity');
    goUp = document.getElementById('go-up');

    goUp.addEventListener('click', goUpClicked);
    emailInput.addEventListener("click", emailInputClicked);
    emailSubmit.addEventListener("click", emailSubmitClicked);
    emailInput.addEventListener('blur', emailBlurHandler);
    emailInput.addEventListener("keypress", emailKeyPressed);
}

function goUpClicked(){
    TweenLite.to(window, 1, {scrollTo:{y:0}});
}

function emailSubmitClicked(){
    if(validateEmail(emailInput.value)){
        alert("DOING EMAIL REGISTER FOR:: " + emailInput.value);
    }
    TweenLite.to('.input-container',.5,{autoAlpha:0});
    TweenLite.set('.input-container',{display:"none", delay:.5});
    TweenLite.to('.email-success',.5,{autoAlpha:1, delay:.5})
}
function emailInputClicked(){
    emailActive = true;
    emailLabel.className = 'active';
}

function emailBlurHandler(){
    const emailValue = emailInput.value;
    if(!emailValue) {
        emailLabel.className = validity.className = validity.innerHTML = '';
    }
}

function emailKeyPressed(){
    const emailValue = emailInput.value;
    if(validateEmail(emailValue)){
        validity.innerHTML = ' - valid';
        validity.className = 'green';
    }else{
        validity.innerHTML = ' - not valid';
        validity.className = 'red';
    }
    console.log(validateEmail(emailValue))
}

function validateEmail(address) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(address))
  {
    return (true)
  }
    return (false)
}

console.log(window.apiData);