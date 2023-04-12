import React, { useState } from 'react';
import './style.css';
import Header from './Header';
import Welcome from './Welcome';
import GettingStarted from './GettingStarted';
import TryoutUI from './TryoutUI';

function App() {
  const [activeTab, setActiveTab] = useState('welcome');

  function handleTabClick(event, newValue) {
    setActiveTab(newValue);
  }

  return (
    <div>
      <Header activeTab={activeTab} handleTabClick={handleTabClick} />
      {activeTab === 'welcome' && <Welcome />}
      {activeTab === 'getting-started' && <GettingStarted />}
      {activeTab === 'tryoutui' && <TryoutUI />}
    </div>
  );
}

export default App;
