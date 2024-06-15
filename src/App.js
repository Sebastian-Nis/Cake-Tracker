import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import NewMember from './Components/newmember';
import MemberList from './Components/memberlist';
import Layout from './Components/layout';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/new-member">New Member</Link>
                  <Link to="/memberlist">Member List</Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="new-member" element={<NewMember />} />
            <Route path="memberlist" element={<MemberList />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
