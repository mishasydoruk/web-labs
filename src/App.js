import './App.css';
import React, { Component } from "react";
import UpperMenu from "./components/UpperMenu/UpperMenu.js";
import HomeComponent from "./components/HomeComponent/HomeComponent.js";
import LoginComponent from "./components/LoginComponent/LoginComponent.js";
import ProfileComponent from "./components/ProfileComponent/ProfileComponent.js";
import RegisterComponent from "./components/RegisterComponent/RegisterComponent.js";
import UploadSong from "./components/UploadSong/UploadSong.js";
import CreatePlaylist from "./components/CreatePlaylist/CreatePlaylist.js";

export default class App extends React.Component
{
    constructor(props)
    {
        super(props);
        
        this.state = {
            active: window.localStorage.getItem('component')===null ? "Home" : window.localStorage.getItem('component'),
            token: window.localStorage.getItem('jwt')
        }
        this.handleClick = this.handleClick.bind(this);
    }
        
    handleClick = (_active) =>
        {
            this.setState(
            {
                active: _active
            }
            );
        }
    
    render()
    {
        return <div>
            <UpperMenu handleClick={this.handleClick}/>
               {this.state.active === "Home" ? (
                <HomeComponent/>
                ): this.state.active === "Login" ? (
                <LoginComponent/>
                ): this.state.active === "Register" ? (
                <RegisterComponent/>
                ): this.state.active === "Profile" ? (
                <ProfileComponent/>
                ): this.state.active === "Upload" ?(
                <UploadSong/>
                ): this.state.active === "Create" ?(
                <CreatePlaylist/>
                ):
                null
               }
            </div>
    }
}


