"use client";
import React, { useState } from 'react'
import { motion, useAnimate } from 'framer-motion'
import menu from "@/public/assets/svgs/menu.svg"
import email from "@/public/assets/svgs/email.svg"
import "@/public/assets/styles/navbar.scss"
import Image from 'next/image';

const Navbar = ({ onContact }) => {
    const [scope, animate] = useAnimate();
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        if (isOpen) {
            animate(".logo-div", { backgroundColor: "#000000" });
            animate(".links, .contact-div", { y: "-100vh", display: "none" });
            setIsOpen(false);
        } else {
            setIsOpen(true);
            animate(".logo-div", { backgroundColor: "#0C0C0C" });
            animate(".links, .contact-div", { y: "-100vh" }, { duration: 0.01 }).then(() => {
                animate(".links, .contact-div", { y: 0, display: "flex" }, { duration: 0.5, type: "spring" });
            });
        }
    }


    return (
        <motion.nav ref={scope} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 2 } }}>
            <motion.div className='logo-div'>
                <p className='logo'>Teo Međeši</p>
                <Image onClick={toggleNavbar} src={menu} alt="menu icon" />
            </motion.div>

            <motion.ul className='links'>
                <li>Home</li>
                <li>About</li>
                <li>Skills</li>
                <li>Blog</li>
            </motion.ul>

            <motion.div onClick={onContact} className="btn btn-primary">
                <motion.button whileTap={{ scale: 0.8 }}>Contact me</motion.button>
                <Image src={email} alt="email icon" />
            </motion.div>
        </motion.nav>
    )
}

export default Navbar