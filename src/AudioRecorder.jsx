import {useState, useRef, useEffect} from "react";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject, getBlob, list, listAll } from "firebase/storage";
import { format } from 'date-fns';
import firebase from "firebase/compat/app";


const AudioRecorder = () => {
    const [permission, setPermission] = useState(false);
    const mediaRecorder = useRef(null);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [stream, setStream] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);
    const [audio, setAudio] = useState(null);

    const storage = getStorage();
    const storageRef = useRef(null);
    // const [audioUrls, setAudioUrls] = useState([]);

    // Create file metadata including the content type
    /** @type {any} */
    const metadata = {
        name: 'test',
        contentType: 'audio/wav'
    };
    const downloadAudio = async () => {
        const uri = await firebase
            .storage()
            .ref("audio.wav")
            .getDownloadURL();

        console.log("uri:", uri);

        // The rest of this plays the audio
        const soundObject = new Audio.Sound();
        try {
            await soundObject.loadAsync({ uri });
            await soundObject.playAsync();
        } catch (error) {
            console.log("error:", error);
        }
    };
    const listAllAudio = async () => {
        // Create a reference under which you want to list
        const listRef = ref(storage, '/');

        // Find all the prefixes and items.
        listAll(listRef)
            .then((res) => {
                res.prefixes.forEach((folderRef) => {
                    // All the prefixes under listRef.
                    // You may call listAll() recursively on them.
                });
                res.items.forEach((itemRef) => {
                    console.log(itemRef.name)
                    // console.log(typeof (itemRef.storage))
                    // setAudioUrls(itemRef.name)

                    // itemRef.getDownloadURL().then((url) => {
                    //     console.log('download url', url);
                    // })
                    // All the items under listRef.
                });
            }).catch((error) => {
            // Uh-oh, an error occurred!
        });
    }

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
    const startRecording = async () => {
        setRecordingStatus("recording");
        //create new Media recorder instance using the stream
        const media = new MediaRecorder(stream);
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
        //stops the recording instance
        mediaRecorder.current.stop();
        mediaRecorder.current.onstop = () => {
            const clipName = prompt(
                "Enter a name for your recording: ",
                "Default recording"
            );
            // const audioRef = ref(`/${clipName}`)
            //creates a blob file from the audiochunks data
            const audioBlob = new Blob(audioChunks);
            //creates a playable URL from the blob file.
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudio(audioUrl);
            setAudioChunks([]);
            // 'file' comes from the Blob or File API
            let timeStamp = format(new Date(), 'MM-dd-yyyy-h:mm:ssa');
            const audioRef = ref(storage, clipName + ' ' + timeStamp);
            uploadBytes(audioRef, audioBlob, metadata).then((snapshot) => {
                console.log('Uploaded a blob or file! ' + timeStamp);
                getDownloadURL(snapshot.ref).then((url) => {
                    setAudioList((prev) => [...prev, url])
                });
            });
        };
    };
    const removeAudio = () => {
        // deleteObject(audioRef).then(() => {
        //     // File deleted successfully
        // }).catch((error) => {
        //     // Uh-oh, an error occurred!
        // });
        // setAudio(null);
    }

    const [audioList, setAudioList] = useState([])
    const audioListRef = ref(storage, '/');

    try {
        useEffect(() => {
            listAll(audioListRef).then((response) => {
                response.items.forEach((item) => {
                    getDownloadURL(item).then((url) => {
                        setAudioList((prev) => [...prev, url])
                    })
                })
            }).catch((error) => {
                console.log(error);
            })
        }, [])
    } catch (e) {
        console.log(e)
    }

    return (
        <div>
            <h2>Audio Recorder</h2>
            <main>
                <div className="audio-controls">
                    {!permission ? (
                        <button onClick={getMicrophonePermission} type="button">
                            Get Microphone
                        </button>
                    ) : null}
                    {permission && recordingStatus === "inactive" ? (
                        <button onClick={startRecording} type="button">
                            Start Recording
                        </button>
                    ) : null}
                    {recordingStatus === "recording" ? (
                        <button onClick={stopRecording} type="button">
                            Stop Recording
                        </button>
                    ) : null}
                </div>
                {audio ? (
                        <div className="audio-container">
                            <audio src={audio} controls></audio>
                            <button onClick={removeAudio} type="button">
                                Retry
                            </button>
                        </div>
                ) : null}
            </main>
            <ul>
            {audioList.map((url) => {
                return <li key={url.name}>{url}
                    <audio src={url} controls></audio></li>
            })}
            </ul>
        </div>
    );
};
export default AudioRecorder;