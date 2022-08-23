import React from 'react'
import { NavLink } from 'react-router-dom'
import { nav } from '../../../constants/navbar'
import { Nav } from './Nav-style'

const Navbar = () => {
    return (
        <Nav>
            <p className='logo'>Agora Meet</p>
            <div style={{ display: "flex", gap: "30px" }}>
                {nav.map(item => {
                    const { id, title, path } = item;
                    return (
                        <NavLink className="link" key={id} to={path}>{title}</NavLink>
                    )
                })}
            </div>
            <div className='create-channel-btn'>Create A New Channel</div>
        </Nav>
    )
}

export default Navbar