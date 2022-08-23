import React from 'react'
import AgoraRTC from "agora-rtc-sdk-ng"
import { } from "agora-rtc-sdk-ng"
function VoiceCall() {
    let rtc = {
        localAudioTrack: null,
        client: null
    };
    let options = {
        // Pass your App ID here.
        appId: "19807d72468c49418a7a7e18da4e5748",
        // Set the channel name.
        channel: "test",
        // Pass your temp token here.
        token: "007eJxTYJh1rS3GKKSy3+58Yez9gLuzM46Hcc09f3Eeg3+EBN+WRcsUGAwtLQzMU8yNTMwskk0sTQwtEs0TzVMNLVISTVJNzU0sdAuYk5cfZElOSOhlZGSAQBCfhaEktbiEgQEAMFsfpg==",
        // Set the user ID.
        uid: 123456789
    };

    async function startBasicCall() {
        // Create an AgoraRTCClient object.
        rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

        // Listen for the "user-published" event, from which you can get an AgoraRTCRemoteUser object.
        rtc.client.on("user-published", async (user, mediaType) => {
            // Subscribe to the remote user when the SDK triggers the "user-published" event
            await rtc.client.subscribe(user, mediaType);
            console.log("subscribe success");

            // If the remote user publishes an audio track.
            if (mediaType === "audio") {
                // Get the RemoteAudioTrack object in the AgoraRTCRemoteUser object.
                const remoteAudioTrack = user.audioTrack;
                // Play the remote audio track.
                remoteAudioTrack.play();
            }

            // Listen for the "user-unpublished" event
            rtc.client.on("user-unpublished", async (user) => {
                // Unsubscribe from the tracks of the remote user.
                await rtc.client.unsubscribe(user);
            });

        });
        window.onload = function () {




        }
    }
    const handleJoin = () => {
        document.getElementById("join").onclick = async function () {
            // Join an RTC channel.
            await rtc.client.join(options.appId, options.channel, options.token, options.uid);
            // Create a local audio track from the audio sampled by a microphone.
            rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
            // Publish the local audio tracks to the RTC channel.
            await rtc.client.publish([rtc.localAudioTrack]);

            console.log("publish success!");
        }
    }
    const handleLeave = () => {
        document.getElementById("leave").onclick = async function () {
            // Destroy the local audio track.
            rtc.localAudioTrack.close();

            // Leave the channel.
            await rtc.client.leave();
        }
    }
    startBasicCall()
    return (
        <div>
            <div className="row">
                <div>
                    <button type="button" id="join" onClick={handleJoin}>JOIN</button>
                    <button type="button" id="leave" onClick={handleLeave}>LEAVE</button>
                </div>
            </div>
        </div>
    )
}

export default VoiceCall