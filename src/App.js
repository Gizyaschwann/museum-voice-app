import logo from './parrish_logo.svg';
import './App.css';
import {Auth} from "./components/auth";
import React from 'react'
import { VoiceRecorder } from 'react-voice-recorder-player';
import AudioVoiceRecorder from "./AudioVoiceRecorder";
import {MenuItem, Select} from "@mui/material";
import { AudioRecorder } from 'react-audio-voice-recorder';
import ExampleComponent from "./ExampleComponent";
import './languages/i18n';
import {useTranslation} from "react-i18next";
import LanguageSelector from './languages/LanguageSelector';

function App() {

    const {t, i18n} = useTranslation();

    return (
        <div className="App">
            <header>
                <img src={logo} alt="parrish_logo" className="responsive"/>
            </header>
            <div>
                <LanguageSelector/>
                <h1>{t("titleMain")}</h1>
                <h2>{t("instructions")}</h2>
                <Select displayEmpty>
                    <MenuItem value="">
                        <em>Press here to select the question</em>
                    </MenuItem>
                    <MenuItem value={1}>{t("q1")}</MenuItem>
                    <MenuItem value={2}>{t("q2")}</MenuItem>
                    <MenuItem value={3}>{t("q3")}</MenuItem>
                </Select>
                <div>
                    <AudioVoiceRecorder/>
                </div>
            </div>
            {/*<div>*/}
            {/*    <h1>React Voice Recorder</h1>*/}
            {/*    <VoiceRecorder/>*/}
            {/*</div>*/}
            {/*<Auth/>*/}
            <div>
                <h1>React Audio Voice Recorder</h1>
                <ExampleComponent/>
            </div>
        </div>
    );
}

export default App;
