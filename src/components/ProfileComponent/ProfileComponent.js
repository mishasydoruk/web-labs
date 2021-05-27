import React, { Component } from "react"
import "./ProfileComponent.css"

export default class ProfileComponent extends React.Component
{
    constructor(props)
    {
        super(props);
        
        this.state =
            {
            username: props.username == null ? window.localStorage.getItem('username') : props.username,
            email: props.email == null ? window.localStorage.getItem('email') : props.email,
        }
        
        this.logout = this.logout.bind(this);
        this.usernameChange = this.usernameChange.bind(this);
        this.emailChange = this.emailChange.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }
    
    logout()
    {
        window.localStorage.removeItem('jwt');
        window.localStorage.removeItem("id");
        window.localStorage.removeItem("username");
        window.localStorage.removeItem("email");
        window.sessionStorage.removeItem('playlists');
        window.sessionStorage.removeItem('hcomponent');
        window.sessionStorage.removeItem('songs');
        window.localStorage.setItem("component", "Home");
        window.location = window.location.href;
    }
    
    usernameChange(e)
    {
        this.setState(
        {
            username: e.target.value
        }
        )    
    }
    
    emailChange(e)
    {
        this.setState(
        {
            email: e.target.value
        }
        ) 
    }
    
    deleteUser()
    {
        
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', "http://127.0.0.1:5000/user", true)
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer " + window.localStorage.getItem('jwt'));
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status == 401) {
                //document.getElementById("password").value = "";
                //document.getElementById("password").placeholder = "Wrong password!";
                
            }

            if (xhr.status == 404) {
                console.log("hui");

            }

            if (xhr.status >= 400 && xhr.status < 500 && xhr.status != 401 && xhr.status != 404)
                //console.log("zalupa");
            if (xhr.status >= 500) {
                //location.href = "error.html?message=500"
            }
            if (xhr.status >= 200 && xhr.status < 300)
            { 
                window.localStorage.removeItem('jwt');
                window.localStorage.removeItem("id");
                window.localStorage.removeItem("username");
                window.localStorage.removeItem("email");
                window.localStorage.setItem("component", "Home");
                window.location = window.location.href;
            };
        }
    } 
       
}
    
updateUser()
    {
        var user_to_create = {
        "email": this.state.email,
        "username": this.state.username,
    }

  
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', "http://127.0.0.1:5000/user", true)
    xhr.setRequestHeader("Content-type", "application/json");
         xhr.setRequestHeader("Authorization", "Bearer " + window.localStorage.getItem('jwt'));
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
        <div className="pr-block">
            <label data-testid="usn" className="lbl1">Username: {this.props.usn} {window.localStorage.getItem('username')}</label>
            <input data-testid="usrin" type="text" defaultValue = {this.state.username} onChange={this.usernameChange} placeholder="Enter new username"/>
            <label data-testid="eml" className="lbl1">Email: {this.props.eml} {window.localStorage.getItem('email')}</label>
            <input type="text" defaultValue = {this.state.email} onChange={this.emailChange} placeholder="Enter new email"/>
            <button onClick={this.updateUser} className="btns">Update</button>
            <button className="btns" onClick={this.logout}>Logout</button>
            <button className="btns" onClick={this.deleteUser}>Delete account</button>   
        </div>
        )
}
}