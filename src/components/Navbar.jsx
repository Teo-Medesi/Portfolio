import React from 'react'
import { motion } from 'framer-motion'
import "../assets/styles/navbar.scss"
import menu from "../assets/svgs/menu.svg"
import email from "../assets/svgs/email.svg"


const Navbar = ({onContact}) => {
    return (
        <motion.nav initial={{opacity: 0}} animate={{opacity: 1, transition: {duration: 2}}}>
            <div className='logo-div'>
                <p className='logo'>Teo Međeši</p>
                <img src={menu} alt="menu icon"/>
            </div>
            <ul className='links'>
                <li>Home</li>
                <li>About</li>
                <li>Skills</li>
                <li>Blog</li>
            </ul>

            <div className="contact-div">
                <motion.button onClick={onContact} whileTap={{scale: 0.8}}>Contact me</motion.button>
                <img src={email} alt="email icon" />
            </div>
        </motion.nav>
    )
}

export default Navbar