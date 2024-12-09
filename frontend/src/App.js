import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage';
import LiveTestPage from './components/LiveTestPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/live-test" element={<LiveTestPage />} />
            </Routes>
        </Router>
    );
}

export default App;
