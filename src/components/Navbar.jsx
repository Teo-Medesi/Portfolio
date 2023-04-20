import React from 'react'
import { motion } from 'framer-motion'
import "../assets/styles/navbar.scss"

const Navbar = () => {
    return (
        <motion.nav initial={{opacity: 0}} animate={{opacity: 1, transition: {duration: 2}}}>
            <p className='logo'>Teo Međeši</p>
            <ul className='links'>
                <li>Home</li>
                <li>About</li>
                <li>Skills</li>
                <li>Blog</li>
            </ul>

            <button>Contact me</button>
        </motion.nav>
    )
}

export default Navbar