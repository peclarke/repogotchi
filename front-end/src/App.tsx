import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes} from "react-router-dom";

import RepoListScreen from './screens/RepoListScreen';
import RepoScreen from './screens/RepoScreen';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/repo/:id" element={<RepoScreen />}></Route>
          <Route path="/" element={<RepoListScreen />}></Route>
        </Routes>
      </Router>
  );
}

export default App;
