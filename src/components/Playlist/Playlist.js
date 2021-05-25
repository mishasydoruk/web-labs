import React, { Component } from "react"
import './Playlist.css'

export default class Playlist extends React.Component
{
    constructor(props)
    {
        super(props);
        
        this.state = {
            playlists: JSON.parse(sessionStorage.getItem("playlists") || "[]"),
            button_name: window.sessionStorage.getItem('hcomponent')==="GPlaylists" ? "Join" : "Leave"
        }
        
        this.openPlaylist = this.openPlaylist.bind(this);
        this.inviteUser = this.inviteUser.bind(this);
        
    }
    
    openPlaylist(id)
    {
        if(window.sessionStorage.getItem('song_id')==null)
            {
        var xhr = new XMLHttpRequest();
    xhr.open('GET', "http://127.0.0.1:5000/playlist/"+id+"/songs", true)
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
                var data = xhr.response;
                window.sessionStorage.setItem('playlist_id', id);
                window.sessionStorage.setItem('songs', data);
                window.sessionStorage.setItem('hcomponent', "GSongs");
                window.location =  window.location.href
            }
        }
    }
      xhr.send();
            }
        else{
             var xhr = new XMLHttpRequest();
        xhr.open('POST', "http://127.0.0.1:5000/playlist/"+id+"/song/"+window.sessionStorage.getItem('song_id'), true)
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
                window.sessionStorage.removeItem('song_id')
                window.sessionStorage.setItem('hcomponent', "GSongs");
                window.location =  window.location.href
            }
        }
    }
      xhr.send();
        }
    }
    
    inviteUser(id)
    {
        
    var xhr = new XMLHttpRequest();
        if(window.sessionStorage.getItem('hcomponent')==="GPlaylists")
            {
                xhr.open('POST', "http://127.0.0.1:5000/user/playlist/"+id, true)
            }
        else{
             xhr.open('DELETE', "http://127.0.0.1:5000/user/playlist/"+id, true)
            
        }
   
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
                {
                    
                }
                 
            if (xhr.status >= 500) {
                
            }
            if (xhr.status >= 200 && xhr.status < 300) {
                var v = JSON.parse(sessionStorage.getItem("playlists") || "[]")
                var i = 0
                while (i < v.length)
                    {
                        if(v[i].id == id)
                            {
                                v.splice(i, 1);
                            }
                        else{
                            ++i;
                        }
                    }
                window.sessionStorage.setItem('playlists', JSON.stringify(v));
                window.location =  window.location.href;
            }
        }
    }
    xhr.send();
    }

    render()
    {
        
    
        return (
        <div>
            {this.state.playlists.length == 0 ? 
             (
                <h2>No playlists here..</h2>
             ) : 
             (
             <ul>
            {
                this.state.playlists.map(pl => (
            
                <div className="pl">
                <button className='pl-btn' onClick={() => {this.openPlaylist(pl.id)}} >{pl.name}</button>
                { window.sessionStorage.getItem('song_id') === null ?
                (
                    <button className="jn-btn" onClick={() => {this.inviteUser(pl.id)}} key = {pl.id}>{this.state.button_name}</button>
                ) : (null)  
                }
                </div>
                
                ))
            }
            </ul>
             )
            }
            
        </div>
        )
    }
}