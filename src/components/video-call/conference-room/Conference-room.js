import React, { createRef } from 'react'
import AgoraRTC from "agora-rtc-sdk-ng"
import { Container } from './conference-room-style';
import axios from 'axios';

const ConferenceRoom = () => {
    var joinedDiv = document.getElementsByClassName("publisher");
    var audiance = document.getElementsByClassName("audience");
    var controlls = createRef();
    console.log("controlls:", controlls)
    console.log(joinedDiv[0])
    var notJoinedDiv = document.getElementsByClassName("not-joined-div");
    let rtc = {
        localAudioTrack: null,
        localVideoTrack: null,
        client: null,
    };
    let options = {
        // Pass your App ID here.
        appId: "19807d72468c49418a7a7e18da4e5748",
        // Set the channel name.
        channel: "family-meet",
        // Pass your temp token here.
        tokenRole: "publisher",
        // Set the user ID.
        uid: "Akbarjon",

    };

    function fetchToken(uid, channelName, tokenRole) {

        return new Promise(function (resolve) {
            axios.get(`https://rocky-citadel-25721.herokuapp.com/rtc/${channelName}/publisher/uid/${uid}`, {
                uid: uid,
                channelName: channelName,
                role: tokenRole
            }, {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            })
                .then(function (response) {
                    // setToken(response.data.rtcToken)
                    resolve(response.data.rtcToken);
                })
                .catch(function (error) {
                    console.log(error);
                });
        })
    }



    async function startBasicCall() {
        // Create an AgoraRTCClient object.
        rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

        // Listen for the "user-published" event, from which you can get an AgoraRTCRemoteUser object.
        rtc.client.on("user-published", async (user, mediaType) => {
            // Subscribe to the remote user when the SDK triggers the "user-published" event
            await rtc.client.subscribe(user, mediaType);
            console.log("subscribe success");

            // If the remote user publishes a video track.
            if (mediaType === "video") {
                // Get the RemoteVideoTrack object in the AgoraRTCRemoteUser object.
                const remoteVideoTrack = user.videoTrack;
                // Dynamically create a container in the form of a DIV element for playing the remote video track.
                const remotePlayerContainer = document.createElement("div");
                // Specify the ID of the DIV container. You can use the uid of the remote user.
                remotePlayerContainer.id = user.uid.toString();
                remotePlayerContainer.textContent = "Remote user " + user.uid.toString();
                remotePlayerContainer.style.width = "256px";
                remotePlayerContainer.style.height = "150px";
                remotePlayerContainer.style.borderRadius = "10px";
                // remotePlayerContainer.style.overflow = "hidden";
                audiance[0].append(remotePlayerContainer)
                remoteVideoTrack.play(remotePlayerContainer);
                audiance[0].style.display = "flex"

                // Play the remote video track.
                // Pass the DIV container and the SDK dynamically creates a player in the container for playing the remote video track.
            }

            // If the remote user publishes an audio track.
            if (mediaType === "audio") {
                // Get the RemoteAudioTrack object in the AgoraRTCRemoteUser object.
                const remoteAudioTrack = user.audioTrack;
                // Play the remote audio track. No need to pass any DOM element.
                remoteAudioTrack.play();
            }

            // Listen for the "user-unpublished" event
            rtc.client.on("user-unpublished", user => {
                // Get the dynamically created DIV container.
                const remotePlayerContainer = document.getElementById(user.uid);
                // Destroy the container.
                remotePlayerContainer.remove();
            });
        });
    };



    const handleJoin = async function () {
        //generate token:
        const token = await fetchToken(options.uid, options.channel, options.tokenRole)
        console.log(token)
        // Join an RTC channel.
        await rtc.client.join(options.appId, options.channel, token, options.uid);
        // Create a local audio track from the audio sampled by a microphone.
        rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        // Create a local video track from the video captured by a camera.
        rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
        // Publish the local audio and video tracks to the RTC channel.
        await rtc.client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);
        // Dynamically create a container in the form of a DIV element for playing the local video track.
        const localPlayerContainer = document.createElement("div");
        // Specify the ID of the DIV container. You can use the uid of the local user.
        localPlayerContainer.id = options.uid;
        localPlayerContainer.class = "local-div";
        // localPlayerContainer.textContent = "Local user " + options.uid;
        localPlayerContainer.style.width = "100%";
        localPlayerContainer.style.height = "100%";
        localPlayerContainer.style.boxSizing = "border-box";
        localPlayerContainer.style.borderRadius = "15px";
        // localPlayerContainer.style.border = "8px solid blue";
        joinedDiv[0].append(localPlayerContainer);
        notJoinedDiv[0].style.display = "none"
        joinedDiv[0].style.display = "flex"
        controlls.current.style.display = "flex"
        // Play the local video track.
        // Pass the DIV container and the SDK dynamically creates a player in the container for playing the local video track.
        rtc.localVideoTrack.play(localPlayerContainer);
        console.log("publish success!");
        console.log(rtc.client.localUser)

    };
    const handleLeave = async function () {
        // Destroy the local audio and video tracks.
        const localUser = document.getElementById(rtc.client._uid)
        localUser.remove()
        console.log(localUser)
        rtc.localAudioTrack.close();
        rtc.localVideoTrack.close();
        // Traverse all remote users.
        rtc.client.remoteUsers.forEach(user => {
            // Destroy the dynamically created DIV containers.
            const playerContainer = document.getElementById(user.uid);
            playerContainer && playerContainer.remove();
        });

        // Leave the channel.
        await rtc.client.leave();
        controlls.current.style.display = "none"
        notJoinedDiv[0].style.display = "flex"
        joinedDiv[0].style.display = "none"
        joinedDiv[0].removeChild(document.getElementsByClassName('local-div'))

    };


    startBasicCall();

    return (
        <Container>
            <div className='conference-body'>
                <div className='center not-joined-div'>
                    <button type="button" className='center join-video' onClick={handleJoin}>Start Meeting</button>
                </div>
                <div className='videos-body' ref={controlls} >
                    <div className='videoframes'>

                        <div className='publisher'></div>
                        <div className='audience'></div>
                    </div>
                    <div className='controlls'>
                        <div id="ctrl-btn" >Video</div>
                        <div id="ctrl-btn" >Mute</div>
                        <div id="ctrl-btn" onClick={handleLeave}>Leave</div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ConferenceRoom