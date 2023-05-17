import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";

//Import Util functions
import UserPool from '../util/UserPool';
import useWindowSize from '../util/useWindowSize';

//Import slices
import { createUser } from '../slices/userSlice';
import { fulfilLabelList } from '../slices/labeltagslice'
import { fulfilDateStats, fulfilLabelStats } from '../slices/statsslice';

//Import Main Components
import SideBar from '../components/sidebar/sidebar';
import TopNavBar from '../components/sidebar/topnavbar';
import LoginPage from '../components/login/loginpage';
import Timer from '../pages/timerpage/timer';
import Stats from '../pages/statspage/stats';
import Settings from '../pages/timersettings/settings';
import Footer from '../components/footer/footer';

//Import StyleSheet
import './App.css';

import axios from "axios";
axios.defaults.baseURL = "https://franciscogontijo-pomodoroapp-server.onrender.com/";

function App() {
  const [display, setDisplay] = useState('sidebar');
  const dispatch = useDispatch();
  const screenSize = useWindowSize();

  useEffect(() => {
    try {
      UserPool.getCurrentUser().getSession((_err, session) => {
        const email = session.idToken.payload.email;
        if (email) {
          dispatch(createUser(email));
          axios.get(`/labellist/${email}`)
            .then((response) => {
              dispatch(fulfilLabelList(response.data));
            })
            .catch((error) => {
              console.error(error);
            });
          axios.get(`/userstats/${email}`)
            .then((response) => {
              dispatch(fulfilDateStats(response.data.dateStats));
              dispatch(fulfilLabelStats(response.data.labelStats));
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          console.error(`Email not found in session`);
        }
      })
    } catch (error) {
      console.error("Email not found or user not logged in");
    };
  }, []);

  useEffect(() => {
    if (screenSize.width > 750) {
      setDisplay('sidebar');
    }
    if (screenSize.width <= 750) {
      setDisplay('topbar');
    }
  }, [screenSize])

  const openNavBar = (e) => {
    e.preventDefault();

    setDisplay('sidebar');
  };

  const closeNavBar = () => {
    if (screenSize.width <= 750) {
      setDisplay('topbar');
    };
  };

  return (
    <>
      {display === 'topbar' && <TopNavBar openNavBar={openNavBar} />}
      {display === 'sidebar' && <SideBar closeNavBar={closeNavBar} />}
      {display === 'sidebar' && <LoginPage />}
      <Routes>
        <Route path="/" element={<Timer />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
