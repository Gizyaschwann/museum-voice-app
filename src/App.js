import logo from './parrish_logo.svg';
import './App.css';
import {Auth} from "./components/auth";
import React from 'react'
import { VoiceRecorder } from 'react-voice-recorder-player';
import AudioVoiceRecorder from "./AudioVoiceRecorder";
import {Menu, MenuItem, Select} from "@mui/material";
import { AudioRecorder } from 'react-audio-voice-recorder';
import ExampleComponent from "./ExampleComponent";
import './languages/i18n';
import {useTranslation} from "react-i18next";
import LanguageSelector from './languages/LanguageSelector';
import DropdownComponent from "./DropdownComponent";

function App() {

    const {t, i18n} = useTranslation();
    const [element, setElement] = React.useState(null)

    // const handleClose = event => {
    //     setElement(null)
    //
    //     // grab the value of the "value" attribute here
    //     console.log('HEEEEEEHEHEHEHE' + event.target.getAttribute("value"))
    // }
    //
    // const handleClick = event => {
    //     setElement(event.currentTarget)
    // }
    //
    // const [selectedElement, setSelectedElement] = React.useState(null);
    // const [open, setOpen] = React.useState(false);
    // function handleOpenMenu() {
    //     setOpen(true);
    // }
    // function handleCloseMenu(event) {
    //     setOpen(false);
    //     setselectedElement(event.target);
    // }
    // const [lang, setLang] = useState("en");


    return (
        <div className="App">
            <header>
                <img src={logo} alt="parrish_logo" className="responsive"/>
            </header>
            <div>
                <LanguageSelector/>
                <h1>{t("titleMain")}</h1>
                <h2>{t("instructions")}</h2>
                {/*<DropdownComponent/>*/}
                <div>
                    <AudioVoiceRecorder/>
                </div>
            </div>
            {/*<div>*/}
            {/*    <h1>React Voice Recorder</h1>*/}
            {/*    <VoiceRecorder/>*/}
            {/*</div>*/}
            {/*<Auth/>*/}
            {/*<div>*/}
            {/*    <h1>React Audio Voice Recorder</h1>*/}
            {/*    <ExampleComponent/>*/}
            {/*</div>*/}
        </div>
    );
}

export default App;
