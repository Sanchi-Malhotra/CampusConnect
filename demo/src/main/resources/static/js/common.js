// Save User
// Save User

function saveUser(user){

    localStorage.setItem("user", JSON.stringify(user));

    localStorage.setItem("userId", user.id);
    localStorage.setItem("userName", user.name);
    localStorage.setItem("userEmail", user.email);
    localStorage.setItem("university", user.university);

}
function saveToken(token){
    localStorage.setItem("token", token);
}
function getToken(){
    return localStorage.getItem("token");
}

function getAuthHeaders(isJson = true) {

    const headers = {
        Authorization: "Bearer " + getToken()
    };

    if (isJson) {
        headers["Content-Type"] = "application/json";
    }

    return headers;
}
// Get User
function getUserId(){
    return localStorage.getItem("userId");
}

function getUserName(){
    return localStorage.getItem("userName");
}

function getUserEmail(){
    return localStorage.getItem("userEmail");
}

function createSpinner(){

    if(document.getElementById("spinner")){
        return;
    }

    const spinner = document.createElement("div");

    spinner.id = "spinner";

    spinner.innerHTML = `
        <div class="spinner-loader"></div>
    `;

    document.body.appendChild(spinner);

}

function showSpinner(){
    const el = document.getElementById("spinner");
    if(el) el.style.display = "flex";
}

function hideSpinner(){
    const el = document.getElementById("spinner");
    if(el) el.style.display = "none";
}

window.addEventListener("DOMContentLoaded", createSpinner);