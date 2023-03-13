import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";

import UserPool from '../util/UserPool';
import axios from 'axios';

import { createUser } from '../slices/userSlice';
import { fulfilLabelList } from '../slices/labeltagslice'
import { fulfilDateStats, fulfilLabelStats } from '../slices/statsslice';

//Import Main Components
import SideBar from '../components/sidebar/sidebar';
import LoginPage from '../components/login/loginpage';
import Timer from '../components/timer/timer';
import Stats from '../components/stats/stats';
import Settings from '../components/timersettings/settings';
import Footer from '../components/footer/footer';

//Import StyleSheet
import './App.css';

function App() {
  const dispatch = useDispatch();

  let email = ''

  useEffect(() => {
    try {
      UserPool.getCurrentUser().getSession((_err, session) => {
        email = session.idToken.payload.email;
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

  return (
    <>
      <SideBar />
      <LoginPage />
      <Routes>
        <Route path="/timer" element={
          <div>
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
