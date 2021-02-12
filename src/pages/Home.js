import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Videos from '../components/Videos/Videos';

const Home = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <Videos />
    </div>
  );
};

export default Home;
