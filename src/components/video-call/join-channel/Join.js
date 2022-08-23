import React from 'react'
import AgoraRTC from 'agora-rtc-sdk-ng';
import axios from "axios"
import { Container, JoinDiv } from './Join-style';
import Navbar from '../navbar/Nav';
const Join = () => {

    var rtc = {
        // For the local audio and video tracks.
        localAudioTrack: null,
        localVideoTrack: null,
    };

    var options = {
        // Passes your app ID here.
        appId: "19807d72468c49418a7a7e18da4e5748",
        // Sets the channel name.
        channel: "test",
        // Sets the user role in the channel.
        role: "host"
    };

    // Fetches a token from the Golang server.
    function fetchToken(uid, channelName, tokenRole) {

        return new Promise(function (resolve) {
            axios.post('http://<Your Host URL and port>/fetch_rtc_token', {
                uid: uid,
                channelName: channelName,
                role: tokenRole
            }, {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            })
                .then(function (response) {
                    const token = response.data.token;
                    resolve(token);
                })
                .catch(function (error) {
                    console.log(error);
                });
        })
    }

    async function startBasicCall() {

        const client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
        client.setClientRole(options.role);
        const uid = 123456;

        // Fetches a token before calling join to join a channel.
        let token = await fetchToken(uid, options.channel, 1);

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
            let token = await fetchToken(uid, options.channel, 1);
            await client.renewToken(token);
        });

        // When token-privilege-did-expire occurs, fetches a new token from the server and call join to rejoin the channel.
        client.on("token-privilege-did-expire", async function () {
            console.log("Fetching the new Token")
            let token = await fetchToken(uid, options.channel, 1);
            console.log("Rejoining the channel with new Token")
            await rtc.client.join(options.appId, options.channel, token, uid);
        });

    }

    // startBasicCall()
    return (
        <Container>
            <Navbar />
            <JoinDiv>
                <div>
                    <p className='hero-title'>Yes, You! Confidentially Work From Anywhere</p>
                    <p className='hero-subtitle'>Meetings made more Simpler, Ever Before!</p>
                    <div className='join-panel'>
                        <input className='id-input' placeholder='Enter Channel name or Id' />
                        <div className='join-btn'>Join Channel</div>
                    </div>
                </div>
                <img src='./join-page-img.png' />
            </JoinDiv>
            <div className='line'>
                <span className='learn-more'><a href='/'>Learn more</a> about Agora Meet</span>
            </div>
        </Container>
    )
}

export default Join

