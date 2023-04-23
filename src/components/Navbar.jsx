import React from 'react'
import { motion } from 'framer-motion'
import "../assets/styles/navbar.scss"

const Navbar = ({onContact}) => {
    return (
        <motion.nav initial={{opacity: 0}} animate={{opacity: 1, transition: {duration: 2}}}>
            <p className='logo'>Teo Međeši</p>
            <ul className='links'>
                <li>Home</li>
                <li>About</li>
                <li>Skills</li>
                <li>Blog</li>
            </ul>

            <motion.button onClick={onContact} whileTap={{scale: 0.8}}>Contact me</motion.button>
        </motion.nav>
    )
}

export default Navbar