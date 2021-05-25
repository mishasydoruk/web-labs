import React, { Component } from "react"
import "./UploadSong.css"

export default class UploadSong extends React.Component {
    
    constructor(props)
    {
        super(props);
        
        this.state = {
            name: "",
            author: ""
            
        };
        
    this.readName = this.readName.bind(this);
    this.readAuthor = this.readAuthor.bind(this);
        this.sendSongData = this.sendSongData.bind(this);
    }
    
    readName(inputName)
    {
        this.setState({name: inputName.target.value});
    }
    
    readAuthor(inputAuthor)
    {
        this.setState({author: inputAuthor.target.value});
    }
   
    sendSongData()
    {
        
     var song_to_create = {
        "name": this.state.name,
        "author": this.state.author
    }

  
    var xhr = new XMLHttpRequest();
    xhr.open('POST', "http://127.0.0.1:5000/song", true)
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer " + window.localStorage.getItem('jwt'));
    xhr.send(JSON.stringify(song_to_create));
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
    return (
    <div className="song-block">
        <h2>Enter song data</h2>
        <input type="text" placeholder="Enter name" onChange = {this.readName}></input>
        <input type="text" placeholder="Enter author" onChange = {this.readAuthor}></input>
        <button className="login-button" onClick={this.sendSongData}>Upload</button>
      </div>
    )
    }
}