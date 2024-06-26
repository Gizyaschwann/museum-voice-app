import React, {useState, useRef, useEffect} from "react";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject, getBlob, list, listAll } from "firebase/storage";
import { format } from 'date-fns';
import firebase from "firebase/compat/app";
import DropdownComponent, {chooseQuestion} from "./DropdownComponent";
import {
    MenuItem,
    Select,
    Button,
    InputLabel,
    FormControl,
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemText
} from "@mui/material";
import LinearProgress from '@mui/joy/LinearProgress';
import Form from 'react-bootstrap/Form';
import {useTranslation} from "react-i18next";


const AudioVoiceRecorder = () => {
    const [permission, setPermission] = useState(false);
    const mediaRecorder = useRef(null);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [stream, setStream] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);
    const [audio, setAudio] = useState(null);
    const[blob, setBlob] = useState(null)


    const storage = getStorage();
    const storageRef = useRef(null);
    // const [audioUrls, setAudioUrls] = useState([]);

    const [audioList, setAudioList] = useState([{}])
    const [audios, setAudios] = useState([{}])
    const audioListRef = ref(storage, '/');

    const {t, i18n} = useTranslation();
    const [valueQ, setValueQ] = React.useState();

    const [submitted, setSubmitted] = useState(false);

    function chooseQuestion(event) {
        console.log(event.target.value);
        setValueQ(event.target.value);
        // v = event.target.value;
    }

    // Create file metadata including the content type
    /** @type {any} */
    const metadata = {
        name: 'test',
        contentType: 'audio/x-m4a'
    };

    const getMicrophonePermission = async () => {
        if ("MediaRecorder" in window) {
            try {
                const streamData = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: false,
                });
                setPermission(true);
                setStream(streamData);
            } catch (err) {
                alert(err.message);
            }
        } else {
            alert("The MediaRecorder API is not supported in your browser.");
        }
    };

    const mimeType = "audio/x-m4a";

    const startRecording = async () => {
        setRecordingStatus("recording");
        setSubmitted("false");
        //create new Media recorder instance using the stream
        const media = new MediaRecorder(stream, {type: mimeType});
        //set the MediaRecorder instance to the mediaRecorder ref
        mediaRecorder.current = media;
        //invokes the start method to start the recording process
        mediaRecorder.current.start();
        let localAudioChunks = [];
        mediaRecorder.current.ondataavailable = (event) => {
            if (typeof event.data === "undefined") return;
            if (event.data.size === 0) return;
            localAudioChunks.push(event.data);
        };
        setAudioChunks(localAudioChunks);
    };

    const stopRecording = () => {
        setRecordingStatus("inactive");
        // setSubmitted("false")
        //stops the recording instance
        mediaRecorder.current.stop();
        mediaRecorder.current.onstop = () => {
            // const audioRef = ref(`/${clipName}`)
            //creates a blob file from the audiochunks data
            const audioBlob = new Blob(audioChunks, {type: 'audio/x-m4a'});
            //creates a playable URL from the blob file.
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudio(audioUrl);
            setAudioChunks([]);
            setBlob(audioBlob);
            // 'file' comes from the Blob or File API
            // let timeStamp = format(new Date(), 'MM-dd-yyyy-h:mm:ssa');

        };
    };

    const submitAudio = () => {
        setSubmitted("true")
        const clipName = prompt(
            "Enter a question number and a title for your recording:",
            ""
        );
        let fileName = clipName + '.m4a';
        const audioRef = ref(storage, fileName);
        uploadBytes(audioRef, blob, metadata).then((snapshot) => {
            console.log('Uploaded a blob or file! ' + fileName);
            getDownloadURL(snapshot.ref).then((url) => {
                setAudios((prev) => [...prev, {urlPath: url, fileTitle: fileName}])
            });
        });

        // setAudio(null)
        // setBlob([])
    }

    try {
        useEffect(() => {
            listAll(audioListRef).then((response) => {
                console.log(response);
                response.items.forEach((item) => {
                    // console.log(item)
                    console.log(item.name)
                    getDownloadURL(item).then((url) => {
                        console.log(url)
                        setAudios((prev) => [...prev, {urlPath: url, fileTitle: item.name}])
                    })
                })
            }).catch((error) => {
                console.log(error);
            })

        }, [])
    } catch (e) {
        console.log(e)
    }
    const[show, submitShow] = useState(true)

    return (
        <div>
            <Form.Select size="lg">
                <option key={t("taste")}>{t("q1")}</option>
                <option key={t("culture")}>{t("q2")}</option>
                <option key={t("memories")}>{t("q3")}</option>
            </Form.Select>
            {/*<FormControl fullWidth>*/}
            {/*    <Select*/}
            {/*        value="Taste"*/}
            {/*        name="selectedOption"*/}
            {/*        onChange={chooseQuestion}>*/}
            {/*        <MenuItem value={t("taste")}>{t("q1")}</MenuItem>*/}
            {/*        <MenuItem value={t("culture")}>{t("q2")}</MenuItem>*/}
            {/*        <MenuItem value={t("memories")}>{t("q3")}</MenuItem>*/}
            {/*    </Select>*/}
            {/*</FormControl>*/}
                {/*<h2>Your chose a question #1. Your answer tag is: {valueQ}</h2>*/}
            <h3>Audio Recorder</h3>
            <main>
                <div className="audio-controls">
                    <Box textAlign="center">
                    {!permission ? (
                        <Button variant="contained" onClick={getMicrophonePermission} type="button">
                            Get Microphone
                        </Button>
                    ) : null}
                    {permission && recordingStatus === "inactive" ? (
                        <Button variant="contained" onClick={startRecording} type="button">
                            Start Recording
                        </Button>
                    ) : null}
                    {recordingStatus === "recording" ? (
                        <LinearProgress size="lg" value={50}/>
                    ) : null}
                        {recordingStatus === "recording" ? (
                            <Button variant="contained" color="warning" onClick={stopRecording} type="button">
                                Stop Recording
                            </Button>
                        ) : null}

                    </Box>
                </div>
                {audio && recordingStatus === "inactive" ? (
                    <div className="audio-container">
                        <audio src={audio} controls></audio>
                        <Button variant="contained" color="secondary" onClick={submitAudio} type="button">
                            Submit
                        </Button>
                        <Button variant="contained" color="warning" onClick={startRecording} type="button">
                            Re-record
                        </Button>
                    </div>
                ) : null}
            </main>
            <h3>All Recordings: </h3>
            <List>
                {audios.map((audioItem) => {
                    // if (audioItem.urlPath != null) {
                        return <ListItem key={audioItem.fileTitle}><ListItemText
                            disableTypography={true}>{audioItem.fileTitle}
                            <audio src={audioItem.urlPath} controls></audio>
                        </ListItemText>
                        </ListItem>
                    // }
                })}
            </List>
        </div>
    );
};

export default AudioVoiceRecorder;