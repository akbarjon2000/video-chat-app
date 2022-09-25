import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { nav } from '../../../constants/navbar'
import { Nav } from './Nav-style'
import { FiMenu } from "react-icons/fi"
import { Sidebar } from '../../../context/sidebar'
const Navbar = (props) => {
    const [open, setOpen] = useContext(Sidebar)

    const navigate = useNavigate()
    const handleSidebar = () => {
        setOpen(false);
    }
    return (
        <Nav width={props.width} open={open} >
            <FiMenu className='menu' onClick={handleSidebar} />
            <p className='logo'>Agora Meet</p>
            <div style={{ display: "flex", gap: "30px" }} className="links">
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