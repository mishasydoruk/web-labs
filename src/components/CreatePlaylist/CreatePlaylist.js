import React, { Component } from "react"
import "./CreatePlaylist.css"
export default class CreatePlaylist extends React.Component {
    
    constructor(props)
    {
        super(props);
        this.state = {
            "name": "",
            "author_id": window.localStorage.getItem('id'),
            "public": true
        };
        
    this.readName = this.readName.bind(this);
    this.readPublic = this.readPublic.bind(this);
    this.sendPlaylistData = this.sendPlaylistData.bind(this);
    }
    
    readName(inputName)
    {
        this.setState({name: inputName.target.value});
    }
    
    readPublic(Public)
    {
        this.setState({public: Public.target.checked});
    }
    
    
    sendPlaylistData()
    {
        var playlist_to_create = {
        "name": this.state.name,
        "is_public": this.state.public
    }

  
    var xhr = new XMLHttpRequest();
    xhr.open('POST', "http://127.0.0.1:5000/playlist", true)
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer " + window.localStorage.getItem('jwt'));
    xhr.send(JSON.stringify(playlist_to_create));
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
    <div className="playlist-block">
        <h2>Enter playlist data</h2>
        <input type="text" placeholder="Enter name" onChange = {this.readName}></input>
        <div>
            <input onChange = {this.readPublic}type="checkbox" defaultChecked={true} />
            <label className="l">Public</label>
        </div>
        <button className="login-button" onClick={this.sendPlaylistData}>Create</button>
      </div>
    )
    }
}