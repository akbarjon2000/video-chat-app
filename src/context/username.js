import React, { useState, createContext } from 'react'

export const CreateUser = createContext()


const CreateUserProvider = ({ children }) => {
    const [username, setUsername] = useState("")

    return (
        <CreateUser.Provider value={[username, setUsername]}>{children}</CreateUser.Provider>
    )
}

export default CreateUserProvider