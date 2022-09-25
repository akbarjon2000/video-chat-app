import React, { useContext } from 'react'
import AgoraRTC from "agora-rtc-sdk-ng"
import { } from "agora-rtc-sdk-ng"

import { Container, JoinDiv } from './Create-channel-style';
import Navbar from '../navbar/Nav';
import { CreateRoom } from '../../../context/create-room';
import { useNavigate } from 'react-router';
import { FiMenu } from "react-icons/fi"
import { Sidebar } from '../../../context/sidebar';

function VideoCall() {

    const [channelName, setChannelName] = useContext(CreateRoom)
    const [open, setOpen] = useContext(Sidebar)
    const navigate = useNavigate();


    const handleChage = e => {
        setChannelName(e.target.value)
        console.log(channelName)
    }
    const handleCreateChannel = () => {
        console.log(channelName)
        navigate('/conference-room')
    }
    const handleSidebar = () => {
        setOpen(true);
    }
    return (
        <Container>
            <FiMenu className='menu' onClick={handleSidebar} />
            <div onClick={() => navigate(`/join-channel`)} className='create-channel'>Join an existing channel?</div>
            <Navbar width="343px" btntext="Join an existing Channel?" path="join-channel" className="navbar" />
            <JoinDiv>
                <img src='./create-room.png' />
                <div className='col-center create-form' style={{ cursor: "pointer" }}>
                    <p className='hero-title'>Create A New Channel Here</p>
                    <form className='join-panel'>
                        <input value={channelName} className='id-input' placeholder='Enter Channel name' required minLength="3" onChange={handleChage} />
                        <button type="submit" className='create-btn' onClick={handleCreateChannel}>Create</button>
                    </form>
                    <p className='set-features'>Set Features for Channel?</p>
                </div>
            </JoinDiv>
            <div className='line'>
                <span className='learn-more'><a href='/'>Learn more</a> about Agora Meet</span>
            </div>

        </Container>




    )
}

export default VideoCall