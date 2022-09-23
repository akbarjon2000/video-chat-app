import React from 'react'

import { Container, JoinDiv } from './Join-style';
import Navbar from '../navbar/Nav';
import { useNavigate } from 'react-router-dom';
const Join = () => {

    const navigate = useNavigate();
    const handleJoin = () => {
        navigate('/joined-user')
    }

    return (
        <Container>
            <Navbar width="301px" btntext="Create A New Channel" path="create-channel" />
            <JoinDiv>
                <div>
                    <p className='hero-title'>Yes, You! Confidentially Work From Anywhere</p>
                    <p className='hero-subtitle'>Meetings made more Simpler, Ever Before!</p>
                    <div className='join-panel'>
                        <input className='id-input' placeholder='Enter Channel name or Id' />
                        <div className='join-btn' onClick={handleJoin} >Join Channel</div>
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

