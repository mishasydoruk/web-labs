import React, { Component } from "react"
import "./LoginComponent.css"
export default class LoginComponent extends React.Component {
    
    constructor(props)
    {
        super(props);
        this.state = {
            username: "",
            password: ""
            
        };
        
    this.readUsername = this.readUsername.bind(this);
    this.readPassword = this.readPassword.bind(this);
    this.sendLoginData = this.sendLoginData.bind(this);
    }
    
    readUsername(inputUsername)
    {
        this.setState({username: inputUsername.target.value});
    }
    
    readPassword(inputPassword)
    {
        this.setState({password: inputPassword.target.value});
    }
    
    sendLoginData()
    {
    
            var user_to_send = {
        "username": this.state.username,
        "password": this.state.password
        }

    var xhr = new XMLHttpRequest();
    xhr.open('POST', "http://127.0.0.1:5000/login", true)
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(user_to_send));
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status == 401) {
               
            }

            if (xhr.status == 404) {
            }

            if (xhr.status >= 400 && xhr.status < 500 && xhr.status != 401 && xhr.status != 404)
                
            if (xhr.status >= 500) {
            }
            if (xhr.status >= 200 && xhr.status < 300)
            { 
                var data = JSON.parse(xhr.response);
                window.localStorage.setItem('jwt', JSON.parse(xhr.response)["acces token"]);
                window.localStorage.setItem("id", JSON.parse(xhr.response)["id"]);
                window.localStorage.setItem("component", "Home");
                window.location = window.location.href;
            };
        }
    } 
     
       
       
    }
    
    
    render()
    {
    return (
    <div className="login-block">
        <h2>Enter your data</h2>
        <input type="text" placeholder="Enter username" onChange = {this.readUsername}></input>
        <input type="password" placeholder="Enter password" onChange = {this.readPassword}></input>
        <button className="login-button" onClick={this.sendLoginData}>Login</button>
      </div>
    )
    }
}

