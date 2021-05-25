import React, { Component } from "react"

import "./RegisterComponent.css"

export default class RegisterComponent extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: ""
            
        };
        
    this.readUsername = this.readUsername.bind(this);
    this.readPassword = this.readPassword.bind(this);
    this.readEmail = this.readEmail.bind(this);
    this.sendRegisterData =  this.sendRegisterData.bind(this);
    }
    
    readUsername(inputUsername)
    {
        this.setState({username: inputUsername.target.value});
    }
    readEmail(inputEmail)
    {
        this.setState({email: inputEmail.target.value});
    }
    
    readPassword(inputPassword)
    {
        this.setState({password: inputPassword.target.value});
    }
    
    sendRegisterData()
    {
        
    var user_to_create = {
        "email": this.state.email,
        "username": this.state.username,
        "password": this.state.password
    }

  
    var xhr = new XMLHttpRequest();
    xhr.open('POST', "http://127.0.0.1:5000/user", true)
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(user_to_create));
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status >= 400 && xhr.status < 500)
                //location.href = "error.html?message=400 - " + xhr.response
            if (xhr.status >= 500) {
                //location.href = "error.html?message=500"
            }
            if (xhr.status >= 200 && xhr.status < 300)
                {
                    
                }
                  
        }
    };
    window.localStorage.setItem("component", "Home");
       window.location = window.location.href;
    }
    
    render()
    {
        return(
        <div className="reg-block">
            <h2>Enter your data</h2>
        <input type="text" placeholder="Enter username" onChange = {this.readUsername}></input>
            <input type="text" placeholder="Enter email" onChange = {this.readEmail}></input>
        <input type="password" placeholder="Enter password" onChange = {this.readPassword}></input>
        <button className="reg-btn" onClick={this.sendRegisterData}>Register</button>
      </div>
        )
}
}