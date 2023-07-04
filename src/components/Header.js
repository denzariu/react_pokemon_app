import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();
    return (
        <a className="" onClick={() => navigate('/')}>
            <div className="home-container text-ui">Pokedenz</div>
        </a>
    )

}