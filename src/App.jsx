import React from 'react';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-4">
          <div className="mt-4">
            {/* Your main content goes here */}
            Main Content
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
