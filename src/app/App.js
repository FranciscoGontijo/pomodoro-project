import logo from '../logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import Signup from '../components/login/signup'
import Login from '../components/login/login'
import Logout from '../components/login/logout'
import SideBar from '../components/sidebar/sidebar';
import LoginPage from '../components/login/loginpage';
import LabelTag from '../components/labeltag/labeltag';
import Timer from '../components/timer/timer';
import Stats from '../components/stats/stats';
import Settings from '../components/timersettings/settings';
import Footer from '../components/footer/footer';

//test
import TestServer from '../components/testServer';

function App() {

  return (
    <>
      <SideBar />
      <LoginPage />
      <Routes>
        <Route path="/timer" element={
          <div>
            <LabelTag />
            <Timer />
          </div>
        } />
        <Route path="/stats" element={<Stats />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
