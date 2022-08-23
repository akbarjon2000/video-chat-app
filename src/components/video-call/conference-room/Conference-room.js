import React, { useContext, useState } from 'react'
import AgoraRTC from "agora-rtc-sdk-ng"
import { CreateRoom } from '../../../context/create-room';
import ConferenceNav from './navbar/Conference-nav';
import { Container } from './conference-room-style';

const ConferenceRoom = () => {
    const [channelName, setChannelName] = useContext(CreateRoom);
    const [join, setJoin] = useState(false);
    var joinedDiv = document.getElementsByClassName("joined-div");
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
        channel: "test",
        // Pass your temp token here.
        token: "007eJxTYCirZb2vudH+s4Zz3Zpfcx+wRZycmNfFG3Sl6V2lzDzHJ60KDIaWFgbmKeZGJmYWySaWJoYWieaJ5qmGFimJJqmm5iYWfKdYknul2ZLdNx5gYmSAQBCfhaEktbiEgQEAQfofXA==",
        // Set the user ID.
        uid: "123456789465321"
    };

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
                remotePlayerContainer.style.width = "640px";
                remotePlayerContainer.style.height = "480px";
                document.body.append(remotePlayerContainer);

                // Play the remote video track.
                // Pass the DIV container and the SDK dynamically creates a player in the container for playing the remote video track.
                remoteVideoTrack.play(remotePlayerContainer);
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
        // Join an RTC channel.
        await rtc.client.join(options.appId, options.channel, options.token, options.uid);
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
        // localPlayerContainer.textContent = "Local user " + options.uid;
        localPlayerContainer.style.width = "1046px";
        localPlayerContainer.style.height = "471px";
        joinedDiv[0].append(localPlayerContainer);
        notJoinedDiv[0].style.display = "none"
        joinedDiv[0].style.display = "flex"
        // Play the local video track.
        // Pass the DIV container and the SDK dynamically creates a player in the container for playing the local video track.
        rtc.localVideoTrack.play(localPlayerContainer);
        console.log("publish success!");

    };
    const handleLeave = async function () {
        // Destroy the local audio and video tracks.
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
        joinedDiv[0].style.display = "none"
        notJoinedDiv[0].style.display = "flex"


    };
    startBasicCall();

    //     window.onload = function () {
    //     };


    return (
        <Container>
            <ConferenceNav />
            <div className='joined-div'></div> :
            <div className='center not-joined-div'>
                <button type="button" className='center join-video' onClick={handleJoin}>Start Meeting</button>
            </div>

            <button type="button" id="leave-video" onClick={handleLeave}>LEAVE</button>
        </Container>
    )
}

export default ConferenceRoom