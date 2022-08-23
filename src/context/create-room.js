import React, { createContext, useState } from 'react'

export const CreateRoom = createContext()


const CreateRoomProvider = ({ children }) => {
    const [channelName, setChannelName] = useState("")

    return (
        <CreateRoom.Provider value={[channelName, setChannelName]}>{children}</CreateRoom.Provider>
    )
}

export default CreateRoomProvider