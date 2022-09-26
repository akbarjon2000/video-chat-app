import React, { useContext, useEffect } from 'react'
import AgoraRTC from 'agora-rtc-sdk-ng';
import axios from "axios"
import { CreateUser } from '../../../../context/username';
import { JoinedUserCon } from './Joined-user-style';
const JoinedUser = () => {
    const [userName, setuserName] = useContext(CreateUser);
    const main = document.getElementsByClassName("main");
    console.log(main)
    const secondary = document.getElementsByClassName("secondary");

    console.log(secondary)
    var rtc = {
        // For the local audio and video tracks.
        localAudioTrack: null,
        localVideoTrack: null,
        client: null,
    };

    var options = {
        // Passes your app ID here.
        appId: "19807d72468c49418a7a7e18da4e5748",
        // Sets the channel name.
        channel: "family-meet",
        // Sets the user role in the channel.
        tokenRole: "audience"
    };

    // Fetches a token from the Golang server.
    function fetchToken(uid, channelName, tokenRole) {

        return new Promise(function (resolve) {
            axios.get(`https://rocky-citadel-25721.herokuapp.com/rtc/${channelName}/audience/uid/${userName}`, {
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

        const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
        client.setClientRole(options.role);
        rtc.client = client

        // Fetches a token before calling join to join a channel.
        let token = await fetchToken(userName, options.channel, options.tokenRole);
        await client.join(options.appId, options.channel, token, userName);
        rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
        await client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);
        const localPlayerContainer = document.createElement("div");
        localPlayerContainer.id = userName;
        localPlayerContainer.style.width = "100%";
        localPlayerContainer.style.height = "100%";
        main[0].append(localPlayerContainer);

        rtc.localVideoTrack.play(localPlayerContainer);

        console.log("publish success!");

        client.on("user-published", async (user, mediaType) => {

            await client.subscribe(user, mediaType);
            console.log("subscribe success");

            if (mediaType === "video") {
                console.log(user)
                const remoteVideoTrack = user.videoTrack;
                const remotePlayerContainer = document.createElement("div");
                remotePlayerContainer.textContent = "Remote user " + user.uid.toString();
                remotePlayerContainer.style.width = "340px";
                remotePlayerContainer.style.height = "180px";
                remotePlayerContainer.style.borderRadius = "10px";
                remotePlayerContainer.style.overflow = "hidden";
                secondary[0].append(remotePlayerContainer);
                remoteVideoTrack.play(remotePlayerContainer);

            }

            if (mediaType === "audio") {
                const remoteAudioTrack = user.audioTrack;
                remoteAudioTrack.play();
            }

            client.on("user-unpublished", user => {
                const remotePlayerContainer = document.getElementById(user.userName);
                remotePlayerContainer.remove();
            });

        });

        // When token-privilege-will-expire occurs, fetches a new token from the server and call renewToken to renew the token.
        client.on("token-privilege-will-expire", async function () {
            let token = await fetchToken(userName, options.channel, options.tokenRole);
            await client.renewToken(token);
        });

        // When token-privilege-did-expire occurs, fetches a new token from the server and call join to rejoin the channel.
        client.on("token-privilege-did-expire", async function () {
            console.log("Fetching the new Token")
            let token = await fetchToken(userName, options.channel, options.tokenRole);
            // let token = "007eJxTYCjkECrf+/brwwfV7Ae19ms82LN9qpbuU/uQjTdUrk9Ym/ZWgcHQ0sLAPMXcyMTMItnE0sTQItE80TzV0CIl0STV1NzE4vx67WQ/Rt3kjZ/vMTBCIYjPxZCYnl+UqJuckVjCwAAAq5gkDA=="
            console.log("Rejoining the channel with new Token")
            await rtc.client.join(options.appId, options.channel, token, userName);
        });

    }
    const handleLeave = () => {
        // Destroy the local audio and video tracks.
        rtc.localAudioTrack.close();
        rtc.localVideoTrack.close();

        // Traverse all remote users.
        rtc.client.remoteUsers.forEach(user => {
            // Destroy the dynamically created DIV containers.
            main[0].remove()
            secondary[0].remove()
            const playerContainer = document.getElementById(user.userName);
            playerContainer && playerContainer.remove();
        });
    }
    startBasicCall()
    useEffect(() => {
        rtc.client.on("user-published", async (user, mediaType) => {
            await rtc.client.subscribe(user, mediaType);
            console.log("subscribe success");

            if (mediaType === "video") {
                console.log(user)
                const remoteVideoTrack = user.videoTrack;
                const remotePlayerContainer = document.createElement("div");
                remotePlayerContainer.textContent = "Remote user " + user.userName;
                remotePlayerContainer.style.width = "240px";
                remotePlayerContainer.style.height = "80px";
                secondary[0].append(remotePlayerContainer);
                remoteVideoTrack.play(remotePlayerContainer);

            }

            if (mediaType === "audio") {
                const remoteAudioTrack = user.audioTrack;
                remoteAudioTrack.play();
            }

            rtc.client.on("user-unpublished", user => {
                const remotePlayerContainer = document.getElementById(user.userName);
                remotePlayerContainer.remove();
            });

        });
    }, [rtc.client])
    return (
        <JoinedUserCon>
            <div className='main' ref={main}></div>
            <div className='secondary' ref={secondary}></div>
            <div className='leave' onClick={handleLeave}>Leave</div>
        </JoinedUserCon>

    )
}

export default JoinedUser;