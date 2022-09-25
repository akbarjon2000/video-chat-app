import React, { useContext } from 'react'

import { Container, JoinDiv } from './Join-style';
import Navbar from '../navbar/Nav';
import { useNavigate } from 'react-router-dom';
import { CreateUser } from '../../../context/username';
import { Sidebar } from '../../../context/sidebar';
import { FiMenu } from "react-icons/fi"

const Join = () => {
    const [username, setUsername] = useContext(CreateUser);
    const [open, setOpen] = useContext(Sidebar)
    const navigate = useNavigate();
    const handleJoin = () => {
        navigate('/joined-user')
    }
    const handleChange = (e) => {
        setUsername(e.target.value)

    }
    const handleSidebar = () => {
        setOpen(true);
    }
    return (
        <Container>
            <div onClick={() => navigate(`/create-channel`)} className='create-channel'>Create A New channel?</div>
            <FiMenu className='menu' onClick={handleSidebar} open={open} />
            <Navbar width="301px" btntext="Create A New Channel" path="create-channel" />
            <JoinDiv>
                <div>
                    <p className='hero-title'>Yes, You! Confidentially Work From Anywhere</p>
                    <p className='hero-subtitle'>Meetings made more Simpler, Ever Before!</p>
                    <div className='join-panel'>
                        <input className='id-input' onChange={handleChange} placeholder='Enter Channel name or Id' />
                        <div className='join-btn' onClick={handleJoin}  >Join</div>
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

