import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import UserPool from '../components/login/UserPool';
import { createUser } from '../slices/userSlice';

//Import Main Pages
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

  useEffect(() => {
    try {
      UserPool.getCurrentUser().getSession((_err, session) => {
        const email = session.idToken.payload.email
        if (email) {
          console.log(email);
          dispatch(createUser(email))
        } else {
          console.error(`Email not found in session`)
        }
      })
    } catch (error) {
      console.error(error);
    }
  }, [])

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
