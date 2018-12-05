document.getElementById("login_form").addEventListener("submit", function(event){
    event.preventDefault();
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://us-central1-mercdev-academy.cloudfunctions.net/login", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("email=" + document.getElementById("email").value + "&password=" + document.getElementById("password").value);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const data = JSON.parse(this.responseText);
            document.getElementById("avatar").src = data.photoUrl;
            document.getElementById("name").innerHTML = data.name;
            showLogoutForm();
        } else if (this.readyState == 4 && this.status == 400) {
            const errorText = JSON.parse(this.responseText).error;
            showErrorMessage(errorText);
        } else {
            showErrorMessage('Something went wrong');
        }
    };
});

document.getElementById("logout_form").addEventListener("submit", function(event){
    showLoginForm();
});


function showErrorMessage(message) {
    document.getElementById("login_form__message").innerHTML = 'Something went wrong';
    document.getElementById("login_form__message_container").classList.remove('login_form__message_container_hidden');
    document.getElementById("login_form__message_container").classList.add('login_form__message_container');
}

function showLoginForm() {
    document.getElementById("login_form__message_container").classList.remove('login_form__message_container');
    document.getElementById("login_form__message_container").classList.add('login_form__message_container_hidden');
    document.getElementById("login_form").classList.remove('login_form_hidden');
    document.getElementById("logout_form").classList.add('logout_form_hidden');
}

function showLogoutForm() {
    document.getElementById("login_form").classList.add('login_form_hidden');
    document.getElementById("logout_form").classList.remove('logout_form_hidden');
}
