import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Profile from './components/Profile';
import SignIn from './components/SignIn';
import LiveStream from './components/LiveStream';

// Example user data
const user = {
  profilePicture: '/profile-pic.png',
  name: 'John Doe',
  email: 'john.doe@example.com',
};

// Example stream URL (replace with actual stream URL)
const streamUrl = 'https://example.com/live-stream.m3u8';

function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex-1 p-4">
            <div className="mt-4">
              <Routes>
                <Route path="/profile" element={<Profile user={user} />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/live-stream" element={<LiveStream streamUrl={streamUrl} />} />
                {/* Add other routes here */}
              </Routes>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
