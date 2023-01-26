import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import SideBar from './components/sidebar/sidebar';
import LabelTag from './components/labeltag/labeltag';
import Timer from './components/timer/timer';
import Settings from './components/timersettings/setttings';

function App() {
  
  return (
    <>
      <SideBar/>
      <Routes>
        <Route path="/timer" element={
          <div>
            <LabelTag />
            <Timer />
          </div>
        } />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  );
}

export default App;
