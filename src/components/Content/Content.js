import './Content.css'
import React, { Component } from "react"
import Song from "../Song/Song.js"
import Playlist from "../Playlist/Playlist.js"


export default class Content extends React.Component
{
    constructor(props)
    {
        super(props);
    }
    
    
    
    
    render()
    {
        return (
        <div>
        { 
        window.sessionStorage.getItem('hcomponent')==='GSongs' ?
        (<Song/>) : 
            window.sessionStorage.getItem('hcomponent')==='GPlaylists' ||  window.sessionStorage.getItem('hcomponent')==='UPlaylists' ? (<Playlist/>) :
            null
        }
        </div>
        )
    }
}