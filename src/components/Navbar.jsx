import React from 'react'
import "../assets/styles/navbar.scss"

const Navbar = () => {
    return (
        <nav>
            <p className='logo'>Teo Međeši</p>
            <ul className='links'>
                <li>Home</li>
                <li>About</li>
                <li>Skills</li>
                <li>Blog</li>
            </ul>

            <button>Contact me</button>
        </nav>
    )
}

export default Navbar