import React from 'react';
import './App.css';
import Navbar from "./components/Navbar";
import MainMint from './components/MainMint';
import About from './Pages/About';
import Team from './Pages/Team';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    const [accounts, setAccounts] = React.useState([]);

    return (
        <Router>
            <div className="App">
                <Navbar accounts={accounts} setAccounts={setAccounts} />
                <Routes>
                    <Route path="/" element={<MainMint accounts={accounts} setAccounts={setAccounts} />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/team" element={<Team />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
