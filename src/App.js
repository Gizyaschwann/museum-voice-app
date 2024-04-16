import logo from './parrish_logo.svg';
import './App.css';
import {Auth} from "./components/auth";
import React from 'react'
import { VoiceRecorder } from 'react-voice-recorder-player';
import AudioRecorder from "../src/AudioRecorder";
import {MenuItem, Select} from "@mui/material";


function App() {

    return (
        <div className="App">
            <header>
                <img src={logo} alt="parrish_logo" className="responsive"/>
            </header>
            <div>
                <h1>THE ART OF FOOD</h1>
                <h2>Please select one of the following questions from the dropdown menu and record your answer:</h2>
                <Select displayEmpty>
                    <MenuItem value="">
                        <em>Press here to select the question</em>
                    </MenuItem>
                    <MenuItem value={1}>What is the most delicious thing you have ever eaten? Describe it!
                    </MenuItem>
                    <MenuItem value={2}>What role does food play in your family's cultural or holiday
                        traditions?</MenuItem>
                    <MenuItem value={3}>Share a memorable food from your childhood.</MenuItem>
                </Select>
                <div>
                    <AudioRecorder/>
                </div>
            </div>
            {/*<div>*/}
            {/*    <h1>React Voice Recorder</h1>*/}
            {/*    <VoiceRecorder/>*/}
            {/*</div>*/}
            {/*<Auth/>*/}
        </div>
    );
}

export default App;
