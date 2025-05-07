import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Profile from './components/Profile';
import SignIn from './components/SignIn';
import SignUp from './components/signup';
import LiveStream from './components/LiveStream';
import Player from './components/player';

// Example user data
const user = {
  profilePicture: '/profile-pic.png',
  name: 'John Doe',
  email: 'john.doe@example.com',
};

function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex-1 p-4 bg-purple-400">
            <div className="mt-4">
              <Routes>
                <Route path="/profile" element={<Profile user={user} />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/live-stream" element={<LiveStream />} />
                <Route path="/live-stream/:id" element={<Player />} />
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
