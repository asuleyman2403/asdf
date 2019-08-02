import React from 'react';

class RecordVideo extends React.Component {

    browser = () => {
        /* eslint-disable */
        /* workaround browser issues */

        var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        var isEdge = /Edge/.test(navigator.userAgent);
        var isOpera = !!window.opera || navigator.userAgent.indexOf('OPR/') !== -1;

        if (typeof MediaRecorder === 'undefined') {
        }

        function applyAudioWorkaround() {
            if (isSafari || isEdge) {
                if (isSafari && window.MediaRecorder !== undefined) {
                    // this version of Safari has MediaRecorder
                    return;
                }

                // support recording in safari 11/12
                // see https://github.com/collab-project/videojs-record/issues/295
                options.plugins.record.audioRecorderType = StereoAudioRecorder;
                options.plugins.record.audioSampleRate = 44100;
                options.plugins.record.audioBufferSize = 4096;
                options.plugins.record.audioChannels = 2;

                console.log('applied audio workarounds for this browser');
            }
        }

        function applyVideoWorkaround() {
            // use correct video mimetype for opera
            if (isOpera) {
                options.plugins.record.videoMimeType = 'video/webm\;codecs=vp8'; // or vp9
            }
        }

        function applyScreenWorkaround() {
            // Polyfill in Firefox.
            // See https://blog.mozilla.org/webrtc/getdisplaymedia-now-available-in-adapter-js/
            if (adapter.browserDetails.browser == 'firefox') {
                adapter.browserShim.shimGetDisplayMedia(window, 'screen');
            }
        }

    }
    videoFunction = () => {
        let constraintObj = { 
            audio: false, 
            video: { 
                facingMode: "user", 
                // width: { min: 640, ideal: 1280, max: 1920 },
                // height: { min: 480, ideal: 720, max: 1080 }
                width: 640,
                height: 480,
            },
        }; 
        if (navigator.mediaDevices === undefined) {
            navigator.mediaDevices = {};
            navigator.mediaDevices.getUserMedia = function(constraintObj) {
                let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia ||  navigator.getUserMedia;
                if (!getUserMedia) {
                    return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
                }
                return new Promise(function(resolve, reject) {
                    getUserMedia.call(navigator, constraintObj, resolve, reject);
                });
            }
        }else{
            navigator.mediaDevices.enumerateDevices()
            .then(devices => {
                devices.forEach(device=>{
                    console.log(device.kind.toUpperCase(), device.label);

                })
            })
            .catch(err=>{
                console.log(err.name, err.message);
            })
        }
        navigator.mediaDevices.getUserMedia(constraintObj)
            .then(function(mediaStreamObj) {
                let video = document.querySelector('video');
                if ("srcObject" in video) {
                    video.srcObject = mediaStreamObj;
                } else {
                    video.src = window.URL.createObjectURL(mediaStreamObj);
                }
                
                video.onloadedmetadata = function(ev) {
                    video.play();
                };
                
                let swt = document.getElementById('btnSwt');
                let vidSave = document.getElementById('vid2');
                let mediaRecorder = new MediaRecorder(mediaStreamObj);
                let chunks = [];
                let ok = false;

                swt.addEventListener('click', (ev) =>{
                    if(!ok)
                    {
                        mediaRecorder.start();
                        ok = true;
                        document.getElementById('btnSwt').innerHTML = "STOP RECORDING";
                    }
                    else {
                        mediaRecorder.stop();
                        ok = false;
                        document.getElementById('btnSwt').innerHTML = "START RECORDING";
                    }
                    console.log(mediaRecorder.state);
                })
                mediaRecorder.ondataavailable = function(ev) {
                    chunks.push(ev.data);
                    console.log(chunks);
                    
                }
                mediaRecorder.onstop = (ev)=>{
                    let blob = new Blob(chunks, { 'type' : 'video/mp4;' });
                    chunks = [];
                    let videoURL = window.URL.createObjectURL(blob);                    
                    vidSave.src = videoURL;
                }
            })
            .catch(function(err) { 
                console.log(err.name, err.message); 
            });
    }

    videoFunction2 = () => {
        var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        var cameraStream;

        getUserMedia.call(navigator, {
            video: true,
            audio: false
        }, function(mediaStreamObj){
            if(window.webkitURL){
                video.src = window.webkitURL.createObjectURL(mediaStreamObj);
            }else{
                video.src = mediaStreamObj;
            }
            cameraStream = mediaStreamObj;
            video.play();
        })
        let swt = document.getElementById('btnSwt');
        let vidSave = document.getElementById('vid2');
        let mediaRecorder = new MediaRecorder(mediaStreamObj);
        let chunks = [];
        let ok = false;

        swt.addEventListener('click', (ev) =>{
            if(!ok)
            {
                mediaRecorder.start();
                ok = true;
                document.getElementById('btnSwt').innerHTML = "STOP RECORDING";
            }
            else {
                mediaRecorder.stop();
                ok = false;
                document.getElementById('btnSwt').innerHTML = "START RECORDING";
            }
            console.log(mediaRecorder.state);
        })
        mediaRecorder.ondataavailable = function(ev) {
            chunks.push(ev.data);
            console.log(chunks);
        }


    }
    render() {
        this.browser()
        this.videoFunction();
        return (
            <div >
                 <div><button id="btnSwt">START RECORDING</button><br/></div>
                 <br/>
                 <video controls></video>
                 <br/>
                 <video id="vid2" controls></video>
            </div>
        )
    }
}
export default RecordVideo;