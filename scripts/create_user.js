
var jwt = null;
var id = null;

function get_jwt() {
    id = window.localStorage.getItem('id');
    jwt = window.localStorage.getItem('jwt');
}

get_jwt()

function register() {
   
    user_to_create = {
        "email": document.getElementById("email").value,
        "first_name": document.getElementById("first_name").value,
        "last_name": document.getElementById("last_name").value,
        "username": document.getElementById("username").value,
        "password": document.getElementById("password").value,
    }

  
    var xhr = new XMLHttpRequest();
    xhr.open('POST', "http://127.0.0.1:5000/user", true)
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(user_to_create));
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status >= 400 && xhr.status < 500)
                location.href = "error.html?message=400 - " + xhr.response
            if (xhr.status >= 500) {
                location.href = "error.html?message=500"
            }
            if (xhr.status >= 200 && xhr.status < 300)
                location.href = "index.html" 
        }
    };

}

function login() {
    user_to_send = {
        "username": document.getElementById("username").value,
        "password": document.getElementById("password").value,
    }

    var xhr = new XMLHttpRequest();
    xhr.open('POST', "http://127.0.0.1:5000/login", true)
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(user_to_send));
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status == 401) {
                document.getElementById("password").value = "";
                document.getElementById("password").placeholder = "Wrong password!";
                
            }

            if (xhr.status == 404) {
                document.getElementById("username").value = "";
                document.getElementById("username").placeholder = "Wrong username!";

            }

            if (xhr.status >= 400 && xhr.status < 500 && xhr.status != 401 && xhr.status != 404)
                location.href = "error.html?message=400 - " + xhr.response
            if (xhr.status >= 500) {
                location.href = "error.html?message=500"
            }
            if (xhr.status >= 200 && xhr.status < 300)
            { 
                data = JSON.parse(xhr.response);
                window.localStorage.setItem("id", JSON.parse(xhr.response)["id"]);
                window.localStorage.setItem("jwt", JSON.parse(xhr.response)["acces token"]);
                
                location.href = "index.html"
            }
        }
    };

}

function get_user() {
    console.log(id);
    var xhr = new XMLHttpRequest();
    xhr.open('GET', "http://127.0.0.1:5000/user", true)
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer " + jwt);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status >= 400 && xhr.status < 500)
                location.href = "error.html?message=400 - " + xhr.response
            if (xhr.status >= 500) {
                location.href = "error.html?message=500"
            }
            if (xhr.status >= 200 && xhr.status < 300) {
                data = JSON.parse(xhr.response);
                console.log(data['last_name']);
                document.getElementById('name').innerHTML = data['first_name'] + " " + data['last_name'];
                document.getElementById('email').innerHTML = data['email'];
                document.getElementById('username').innerHTML = data['username'];
            }
        }
    };

}



function is_logged() {
    console.log(jwt);
    console.log(id);
    if (jwt == null)
    {
        document.getElementById("login_button").style.visibility = 'visible';
        document.getElementById("profile_button").disabled = true;
    }
    else {
        document.getElementById("login_button").style.visibility = "hidden";
        document.getElementById("profile_button").disabled = false;
    }
}

function logout() {

    window.localStorage.removeItem('jwt');
    window.localStorage.removeItem('id');
    window.localStorage.removeItem('data');
    location.href = "index.html"
}

function edit_onload() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', "http://127.0.0.1:5000/user", true)
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer " + jwt);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status >= 400 && xhr.status < 500)
                location.href = "error.html?message=400 - " + xhr.response
            if (xhr.status >= 500) {
                location.href = "error.html?message=500"
            }
            if (xhr.status >= 200 && xhr.status < 300) {
                data = JSON.parse(xhr.response);
                document.getElementById('first_name').value = data['first_name'];
                document.getElementById('last_name').value = data['last_name'];
                document.getElementById('email').value = data['email'];
                document.getElementById('username').value = data['username'];
            }
        }
    };

    
}

function edit_user() {

    user_to_create = {
        "email": document.getElementById("email").value,
        "first_name": document.getElementById("first_name").value,
        "last_name": document.getElementById("last_name").value,
        "username": document.getElementById("username").value,
    }


    var xhr = new XMLHttpRequest();
    xhr.open('PUT', "http://127.0.0.1:5000/user", true)
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer " + jwt);
    xhr.send(JSON.stringify(user_to_create));
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {

           
            if (xhr.status >= 400 && xhr.status < 500)
                location.href = "error.html?message=400 - " + xhr.response
            if (xhr.status >= 500) {
                location.href = "error.html?message=500"
            }
            if (xhr.status >= 200 && xhr.status < 300)
                location.href = "index.html"
        }
    };

}