import React from 'react'
import AgoraRTC from "agora-rtc-sdk-ng"
import { } from "agora-rtc-sdk-ng"
function VideoCall() {
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
        token: "007eJxTYJh1rS3GKKSy3+58Yez9gLuzM46Hcc09f3Eeg3+EBN+WRcsUGAwtLQzMU8yNTMwskk0sTQwtEs0TzVMNLVISTVJNzU0sdAuYk5cfZElOSOhlZGSAQBCfhaEktbiEgQEAMFsfpg==",
        // Set the user ID.
        uid: "Akbarjon"
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

        window.onload = function () {



        };
    }
    const handleJoin = async () => {
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
        localPlayerContainer.textContent = "Local user " + options.uid;
        localPlayerContainer.style.width = "640px";
        localPlayerContainer.style.height = "480px";
        document.body.append(localPlayerContainer);

        // Play the local video track.
        // Pass the DIV container and the SDK dynamically creates a player in the container for playing the local video track.
        rtc.localVideoTrack.play(localPlayerContainer);
        console.log("publish success!");
    }
    const handleLeave = async () => {
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

    }
    startBasicCall();
    return (
        <div>
            <div className="row">
                <div>
                    <button type="button" id="join-video" onClick={handleJoin}>JOIN</button>
                    <button type="button" id="leave-video" onClick={handleLeave}>LEAVE</button>
                </div>
            </div>
        </div>
    )
}

export default VideoCall