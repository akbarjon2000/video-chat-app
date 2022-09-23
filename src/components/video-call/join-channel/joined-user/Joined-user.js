import React from 'react'
import AgoraRTC from 'agora-rtc-sdk-ng';
import axios from "axios"
import { nanoid } from "nanoid"
const JoinedUser = () => {
    var rtc = {
        // For the local audio and video tracks.
        localAudioTrack: null,
        localVideoTrack: null,
        client: null,
    };
    const uid = nanoid(16)
    var options = {
        // Passes your app ID here.
        appId: "19807d72468c49418a7a7e18da4e5748",
        // Sets the channel name.
        channel: "agora-chat",
        // Sets the user role in the channel.
        tokenRole: "audience"
    };

    // const uid = uid(16)
    // Fetches a token from the Golang server.
    function fetchToken(uid, channelName, tokenRole) {

        return new Promise(function (resolve) {
            axios.get(`https://rocky-citadel-25721.herokuapp.com/rtc/${channelName}/host/uid/1`, {
                uid: uid,
                channelName: channelName,
                role: tokenRole
            }, {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            })
                .then(function (response) {
                    const token = response.data.rtcToken;
                    resolve(token);
                })
                .catch(function (error) {
                    console.log(error);
                });
        })
    }

    async function startBasicCall() {

        const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
        client.setClientRole(options.role);
        rtc.client = client

        // Fetches a token before calling join to join a channel.
        // let token = await fetchToken(uid, options.channel, options.tokenRole);
        let token = "007eJxTYOB7lPya/YfZ+up1L6c7nd8wV/5ulvOpmpcNt37u69hc0r1YgcHQ0sLAPMXcyMTMItnE0sTQItE80TzV0CIl0STV1NzEItVRN/nRJL3k7AP/GRihEMRnYSjOLclgYAAAURwkdw=="

        await client.join(options.appId, options.channel, token, uid);
        rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
        await client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);
        const localPlayerContainer = document.createElement("div");
        localPlayerContainer.id = uid;
        localPlayerContainer.style.width = "640px";
        localPlayerContainer.style.height = "480px";
        document.body.append(localPlayerContainer);

        rtc.localVideoTrack.play(localPlayerContainer);

        console.log("publish success!");

        client.on("user-published", async (user, mediaType) => {
            await client.subscribe(user, mediaType);
            console.log("subscribe success");

            if (mediaType === "video") {
                const remoteVideoTrack = user.videoTrack;
                const remotePlayerContainer = document.createElement("div");
                remotePlayerContainer.textContent = "Remote user " + user.uid.toString();
                remotePlayerContainer.style.width = "640px";
                remotePlayerContainer.style.height = "480px";
                document.body.append(remotePlayerContainer);
                remoteVideoTrack.play(remotePlayerContainer);

            }

            if (mediaType === "audio") {
                const remoteAudioTrack = user.audioTrack;
                remoteAudioTrack.play();
            }

            client.on("user-unpublished", user => {
                const remotePlayerContainer = document.getElementById(user.uid);
                remotePlayerContainer.remove();
            });

        });

        // When token-privilege-will-expire occurs, fetches a new token from the server and call renewToken to renew the token.
        client.on("token-privilege-will-expire", async function () {
            // let token = await fetchToken(uid, options.channel, options.tokenRole);
            let token = "007eJxTYCjkECrf+/brwwfV7Ae19ms82LN9qpbuU/uQjTdUrk9Ym/ZWgcHQ0sLAPMXcyMTMItnE0sTQItE80TzV0CIl0STV1NzE4vx67WQ/Rt3kjZ/vMTBCIYjPxZCYnl+UqJuckVjCwAAAq5gkDA=="
            await client.renewToken(token);
        });

        // When token-privilege-did-expire occurs, fetches a new token from the server and call join to rejoin the channel.
        client.on("token-privilege-did-expire", async function () {
            console.log("Fetching the new Token")
            // let token = await fetchToken(uid, options.channel, options.tokenRole);
            let token = "007eJxTYCjkECrf+/brwwfV7Ae19ms82LN9qpbuU/uQjTdUrk9Ym/ZWgcHQ0sLAPMXcyMTMItnE0sTQItE80TzV0CIl0STV1NzE4vx67WQ/Rt3kjZ/vMTBCIYjPxZCYnl+UqJuckVjCwAAAq5gkDA=="
            console.log("Rejoining the channel with new Token")
            await rtc.client.join(options.appId, options.channel, token, uid);
        });

    }
    const handleLeave = () => {
        // Destroy the local audio and video tracks.
        rtc.localAudioTrack.close();
        rtc.localVideoTrack.close();

        // Traverse all remote users.
        rtc.client.remoteUsers.forEach(user => {
            // Destroy the dynamically created DIV containers.
            const playerContainer = document.getElementById(user.uid);
            playerContainer && playerContainer.remove();
        });
    }
    startBasicCall()

    return (
        <div>JoinedUser
            <div onClick={handleLeave}>Leave</div>
        </div>

    )
}

export default JoinedUser;