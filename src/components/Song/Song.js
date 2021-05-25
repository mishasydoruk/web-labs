import React, { Component } from "react"
import './Song.css'
export default class Song extends React.Component
{
    constructor(props)
    {
        super(props);
        
        this.state = {
            songs: JSON.parse(sessionStorage.getItem("songs") || "[]"),
            button_name: window.sessionStorage.getItem('playlist_id')===null ? "Add" : "Remove"
        }
        this.add=this.add.bind(this);
    }
    
    add(song_id)
    {
        if(window.sessionStorage.getItem('playlist_id')===null)
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
                window.sessionStorage.setItem('playlists', data);
                window.sessionStorage.setItem('song_id', song_id);
                window.sessionStorage.setItem('hcomponent', "GPlaylists");
                window.location =  window.location.href
            }
        }
    }
      xhr.send();
            }
        else{
             var xhr = new XMLHttpRequest();
        xhr.open('DELETE', "http://127.0.0.1:5000/playlist/"+window.sessionStorage.getItem('playlist_id')+"/song/"+song_id, true)
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
                var v = JSON.parse(sessionStorage.getItem("songs") || "[]")
                var i = 0
                while (i < v.length)
                    {
                        if(v[i].id == song_id)
                            {
                                v.splice(i, 1);
                            }
                        else{
                            ++i;
                        }
                    }
                window.sessionStorage.setItem('songs', JSON.stringify(v));
                window.location =  window.location.href
            }
        }
    }
      xhr.send();
        }
    }
    
    
    render()
    {
        
    
        return (
        <div>
            {this.state.songs.length == 0 ? 
             (
                <h2>No songs here..</h2>
             ) : 
             (
              <ul>
            {
                this.state.songs.map(pl => (
                <div className="pla">
                <label className='l' key={pl.id}>{pl.name} by {pl.author}</label>
                <button className="jn-btn" onClick={()=>{this.add(pl.id)}}>{this.state.button_name}</button>
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