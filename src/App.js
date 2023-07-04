import React from 'react'
import { Routes, Route, HashRouter } from 'react-router-dom'
import Home from "./routes/Home"
import About from './routes/About'
import Abilities from './routes/Abilities'
import "./styles/styles.css"
import Ability from './components/Ability'
import Header from './components/Header'
function App() {
    return (
        <HashRouter>
            <Header/>
           <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/abilities" element={<Abilities/>}/>
                <Route path="/abilities/:ability_name" element={<Ability/>}/>
           </Routes>
        </HashRouter>
    );
}

export default App;
