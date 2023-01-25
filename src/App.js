import logo from './logo.svg';
import './App.css';

import SideBar from './components/sidebar/sidebar';
import LabelTag from './components/labeltag/labeltag';
import Timer from './components/timer/timer';

function App() {
  return (
    <div className="App">
      <SideBar />
      <LabelTag />
      <Timer /> 
    </div>
  );
}

export default App;
