// import logo from './logo.svg';
import './App.css';
import HomeComponentClass from './pages/HomeComponentClass'
import HomeComponentFunction from './pages/HomeComponentFunction';


function App() {
  return (
    <div className="App">
      {/* Two ways to diplay this application, one via REACT class components and the other via REACT functional components */}
      <HomeComponentFunction/>
      {/* <HomeComponentClass/> */}
    
    </div>
  );
}

export default App;
