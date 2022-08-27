import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes} from "react-router-dom";
import LandingScreen from './screens/LandingScreen';

import RepoListScreen from './screens/RepoListScreen';
import RepoScreen from './screens/RepoScreen';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<LandingScreen />}/>
          <Route path="/repo/:id" element={<RepoScreen />}></Route>
          <Route path="/home" element={<RepoListScreen />}></Route>
        </Routes>
      </Router>
  );
}

export default App;
