import './App.scss';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Videos from './components/Videos/Videos';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Trending from './pages/Trending';
import Home from './pages/Home';
import Watch from './pages/Watch';
import React, { useState } from 'react';
import YoutubeContext from './YoutubeContext';

function App() {
  const [input, setInput] = useState('javascript');
  const userSearchHandler = (userInput) => {
    setInput(userInput);
  };

  return (
    <YoutubeContext.Provider value={{ keyword: input }}>
      <div className="app">
        <Router>
          <Header userSearchHandler={userSearchHandler} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/trending" component={Trending} />
            <Route exact path="/watch/:id" component={Watch} />

            <Sidebar />
            <Videos />
          </Switch>
        </Router>
      </div>
    </YoutubeContext.Provider>
  );
}

export default App;
