import React from 'react';
import { Route, Routes } from "react-router-dom"
import "./index.css"
import VoiceCall from './components/voice-call/Voice-call';
import VideoCall from './components/video-call/Video-call';
import Join from './components/video-call/join-channel/Join';
import { nav } from './constants/navbar';

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

        <Routes>
          <Route path="create-video" element={<VideoCall />} />
          <Route path='/' element={<Join />} />
          <Route path="voice" element={<VoiceCall />} />
          {nav.map(item => {
            const { path, Element } = item;
            return (
              <Route path={path} element={<Element />} />
            )
          })}
        </Routes>

      </div>


    )
  }
}

export default App;

