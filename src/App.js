import {  BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Homepage from "./pages/Homepage";
import Coins from "./pages/Coins";
import Exchanges from "./pages/Exchanges";
import Coinsdetails from "./pages/Coinsdetails";
import Header from "./components/Header";


function App() {
  return (
    
    <div className="App">
      
      <Router>
        <Header/>
      <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/coins" element={<Coins/>}/>
      <Route path="/exchanges" element={<Exchanges/>}/>
      <Route path="/coins/ :id" element={<Coinsdetails/>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
