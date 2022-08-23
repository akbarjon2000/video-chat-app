import React, { useContext } from 'react'
import { Container } from './Conference-nav-style'
import { ReactComponent as Icon } from "../../../../assets/images/video.png"
import { CreateRoom } from '../../../../context/create-room'
import { BsThreeDotsVertical } from "react-icons/bs";


const ConferenceNav = () => {
    const [channelName, setChannelName] = useContext(CreateRoom);
    return (
        <Container>
            <img src='./video.png' />
            <div>
                <p>[Internal] Weekly Report Marketing + Sales  </p>
                <p>{new Date().toDateString().slice(3)} | {new Date().getHours()} : {new Date().getUTCMinutes() < 9 ? "0" + new Date().getUTCMinutes() : new Date().getUTCMinutes()} {new Date().getHours > 11 ? "AM" : "PM"}</p>
            </div>
            <div className='center channel-name'><img src='./link.png' /> | <p>{channelName}</p></div>
            <div className=' user'>
                <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                    <img src='./user.png' className='user-img' />
                    <div>
                        <p className='user-name'>Adam Joseph</p>
                        <p className='user-role'>Moderator</p>
                    </div>
                </div>
                <BsThreeDotsVertical style={{ color: "#A2A7B4", width: "40px", height: "30px" }} />
            </div>
        </Container>
    )
}

export default ConferenceNav