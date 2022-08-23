import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { nav } from '../../../constants/navbar'
import { Nav } from './Nav-style'

const Navbar = (props) => {
    const navigate = useNavigate()
    console.log()
    return (
        <Nav width={props.width}>
            <p className='logo'>Agora Meet</p>
            <div style={{ display: "flex", gap: "30px" }}>
                {nav.map(item => {
                    const { id, title, path } = item;
                    return (
                        <NavLink className="link" key={id} to={path}>{title}</NavLink>
                    )
                })}
            </div>
            <div onClick={() => navigate(`/${props.path}`)} className='create-channel-btn'>{props.btntext}</div>
        </Nav>
    )
}

export default Navbar