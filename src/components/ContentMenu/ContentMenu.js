import './ContentMenu.css'
import React, { Component } from "react"



export default class ContentMenu extends React.Component
{
    constructor(props)
    {
        super(props);
        this.getGlobalPlaylist = this.getGlobalPlaylist.bind(this);
        this.getGlobalSongs = this.getGlobalSongs.bind(this);
         this.getUserPlaylist = this.getUserPlaylist.bind(this);
    }
    
    getGlobalPlaylist()
    {
        var xhr = new XMLHttpRequest();
   
    xhr.open('GET', "http://127.0.0.1:5000/playlist", true);
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
                var data = JSON.parse(xhr.response)
                
                var i = 0
                while (i < data.length)
                    {
                        if(data[i].is_public === false)
                            {
                                data.splice(i, 1);
                            }
                        else{
                            ++i;
                        }
                    }
                
                
                window.sessionStorage.removeItem('song_id')
                window.sessionStorage.removeItem('playlist_id')
                window.sessionStorage.setItem('playlists', JSON.stringify(data));
                window.sessionStorage.setItem('hcomponent', "GPlaylists");
                window.location =  window.location.href
            }
        }
    }
      xhr.send();
    }
    
    getUserPlaylist()
    {
         var xhr = new XMLHttpRequest();
    xhr.open('GET', "http://127.0.0.1:5000/user/playlist", true)
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
                window.sessionStorage.removeItem('song_id')
                window.sessionStorage.removeItem('playlist_id')
                window.sessionStorage.setItem('playlists', data);
                window.sessionStorage.setItem('hcomponent', "UPlaylists");
                window.location =  window.location.href
            }
        }
    }
      xhr.send();
    }
   getGlobalSongs()
    {
        var xhr = new XMLHttpRequest();
    xhr.open('GET', "http://127.0.0.1:5000/song", true)
    xhr.setRequestHeader("Content-type", "application/json");
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
                window.sessionStorage.setItem('songs', data);
                window.sessionStorage.removeItem('playlist_id')
                window.sessionStorage.removeItem('song_id')
                window.sessionStorage.setItem('hcomponent', "GSongs");
                window.location =  window.location.href
            }
        }
    }
      xhr.send();
    }

    
    render()
    {
        return (
        <div className="cont-menu">
            {window.localStorage.getItem('jwt') == null ? (
            <div>
                <button className="butn" onClick={this.getGlobalPlaylist}>Global playlists</button>
                <button className="butn" onClick={this.getGlobalSongs}>Global songs</button>
            
            
            </div>
        )
    : ( <div>
            <button className="butn" onClick={this.getGlobalPlaylist}>Global playlists</button>
            <button className="butn" onClick={this.getUserPlaylist}>My playlists</button>
            <button className="butn" onClick={this.getGlobalSongs}>Global songs</button>
        </div>
    )
    }
            
              
        </div>
  )
    }
}