import logo from '../logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import Signup from '../components/login/signup'
import SideBar from '../components/sidebar/sidebar';
import LabelTag from '../components/labeltag/labeltag';
import Timer from '../components/timer/timer';
import Settings from '../components/timersettings/settings';

function App() {
  
  return (
    <>
      <SideBar/>
      <Routes>
        <Route path="/timer" element={
          <div>
            <LabelTag />
            <Timer />
            <Signup />
          </div>
        } />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  );
}

export default App;
