import './UpperMenu.css'
import LoginComponent from "../LoginComponent/LoginComponent.js"
import HomeComponent from "../HomeComponent/HomeComponent.js"
import React, { Component } from "react"



export default class UpperMenu extends React.Component
{
    constructor(props)
    {
        super(props);
        this.profileClick = this.profileClick.bind(this);
    }
    
    profileClick()
    {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', "http://127.0.0.1:5000/user", true)
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer " + window.localStorage.getItem('jwt'));
    xhr.onload = function () {
        if (xhr.readyState === 4) {
            if (xhr.status===401)
                {
                window.localStorage.setItem('component', "Login");
                 window.location =  window.location.href
                }
            if (xhr.status >= 400 && xhr.status < 500)
                //location.href = "error.html?message=400 - " + xhr.response
            if (xhr.status >= 500) {
                //location.href = "error.html?message=500"
            }
            if (xhr.status >= 200 && xhr.status < 300) {
                var data = JSON.parse(xhr.response);
                window.localStorage.setItem('username', data["username"]);
                window.localStorage.setItem('email', data["email"]);
                window.localStorage.setItem('component', "Profile");
                 window.location =  window.location.href
            }
        }
    }
      xhr.send();
}
    
    
    render()
    {
        return (
        <div className="upper-menu">
            
            {window.localStorage.getItem('jwt') == null ? (
                <div>
             <label className="lbl">OnlyMusicFans</label>
            <button className="butt" onClick={() => {window.localStorage.setItem('component', "Register"); window.location =  window.location.href}}>Register</button>
        <button className="butt" onClick={() => {window.localStorage.setItem('component', "Login"); window.location =  window.location.href}}>Login</button>
            <button className="butt" onClick={() => {window.localStorage.setItem('component', "Home"); window.location =  window.location.href}}>Home</button>
            
            
            </div>
        )
    : ( <div>
        <label className="lbl">OnlyMusicFans</label>
        <button className="butt" onClick={this.profileClick}>Profile</button>
       <button className="butt" onClick={() => {window.localStorage.setItem('component', "Upload"); window.location =  window.location.href}}>Upload songs</button>
       <button className="butt" onClick={() => {window.localStorage.setItem('component', "Create"); window.location =  window.location.href}}>Create playlist</button>
        <button className="butt" onClick={() => {window.localStorage.setItem('component', "Home"); window.location =  window.location.href}}>Home</button>
        
        
       
        </div>
    )
    }
            
              
        </div>
  )
    }
}