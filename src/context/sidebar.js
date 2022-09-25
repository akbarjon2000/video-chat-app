import React, { useState, createContext } from 'react'

export const Sidebar = createContext()


const SidebarProvider = ({ children }) => {
    const [open, setOpen] = useState(false)

    return (
        <Sidebar.Provider value={[open, setOpen]}>{children}</Sidebar.Provider>
    )
}

export default SidebarProvider