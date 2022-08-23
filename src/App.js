import React from 'react';
import { Route, Routes } from "react-router-dom"
import "./index.css"
import VoiceCall from './components/voice-call/Voice-call';
import VideoCall from './components/video-call/create-channel/Create-channel';
import Join from './components/video-call/join-channel/Join-video-call';
import { nav } from './constants/navbar';
import CreateRoomProvider from './context/create-room';
import ConferenceRoom from './components/video-call/conference-room/Conference-room';

// const routes = (
//   <Route component={App}>
//     <Route path="video" component={VideoCall} />
//     <Route path="voice" component={VoiceCall} />
//   </Route>
// )

class App extends React.Component {
  render() {
    return (
      <div style={{ overflow: "hidden" }}>
        <CreateRoomProvider>
          <Routes>
            <Route path="/create-channel" element={<VideoCall />} />
            <Route path='/' element={<Join />} />
            <Route path='/join-channel' element={<Join />} />
            <Route path="/voice" element={<VoiceCall />} />
            <Route path="/conference-room" element={<ConferenceRoom />} />
            {nav.map(item => {
              const { path, Element } = item;
              return (
                <Route path={path} element={<Element />} />
              )
            })}
          </Routes>
        </CreateRoomProvider>

      </div>


    )
  }
}

export default App;

