import React, { useState, useEffect } from 'react'
import { Router, Link } from "wouter";
import PageRouter from "./components/Router"

import "./styles/styles.css"

function App() {
    return (
        <Router>
            <main role="main" className="wrapper">
                <div className="content">
                {/* Router specifies which component to insert here as the main content */}
                <PageRouter />
                </div>
            </main>
            {/* Footer links to Home and About, Link elements matched in router.jsx */}
            {/*<footer className="footer">
                <div className="links">
                <Link href="/">Home</Link>
                <span className="divider">|</span>
                <Link href="/about">About</Link>
                </div>
                <a
                className="btn--remix"
                target="_top"
                >
                </a>
            </footer>
            */}
        </Router>
    );
}

export default App;
