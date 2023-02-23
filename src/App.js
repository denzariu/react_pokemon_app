import React from 'react'
import { Routes, Route, HashRouter } from 'react-router-dom'
import Home from "./routes/Home"
import About from './routes/About'
import "./styles/styles.css"

function App() {
    return (
        <HashRouter>
           <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
           </Routes>
        </HashRouter>
    );
}

export default App;
