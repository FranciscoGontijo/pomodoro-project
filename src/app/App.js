import logo from '../logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import Signup from '../components/login/signup'
import Login from '../components/login/login'
import Logout from '../components/login/logout'
import SideBar from '../components/sidebar/sidebar';
import LabelTag from '../components/labeltag/labeltag';
import Timer from '../components/timer/timer';
import Settings from '../components/timersettings/settings';
import Footer from '../components/footer/footer';

//test
import TestServer from '../components/testServer';

function App() {

  return (
    <>
      <SideBar />
      <Routes>
        <Route path="/timer" element={
          <div>
            <LabelTag />
            <Timer />
            <Signup />
            <Login />
            <Logout />
            <TestServer />
          </div>
        } />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
