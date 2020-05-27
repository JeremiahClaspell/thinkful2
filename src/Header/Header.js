import React from 'react'; 
import './Header.css'; 
import { Link } from 'react-router-dom'; 

export default function Header (props){
    return (
        <header>
            <Link to="/"><h1>Noteful</h1></Link>
        </header>
    )
}