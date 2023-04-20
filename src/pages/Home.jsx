import "../assets/styles/home.scss"
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Planet } from '../../public/Planet'
import Navbar from "../components/Navbar"
import html from "../assets/images/skills/html.png"
import css from "../assets/images/skills/css.png"
import tailwind from "../assets/images/skills/tailwind.png"
import bootstrap from "../assets/images/skills/bootstrap.png"
import sass from "../assets/images/skills/sass.png"
import javascript from "../assets/images/skills/javascript.png"
import react from "../assets/images/skills/react.png"
import nextjs from "../assets/images/skills/next.png"
import firebase from "../assets/images/skills/firebase.png"
import github from "../assets/images/skills/github.svg"
import { motion, useAnimate, useInView } from "framer-motion"



const useTypeWriter = (text, delay) => {
  const [textPreview, setTextPreview] = useState("");
  const [isInit, setIsInit] = useState(false);
  const speed = 40;

  const typeText = async () => {
    setTimeout(() => {
      [...text].forEach((character, index) => {
        setTimeout(() => {
          setTextPreview(current => [...current, character]);
        }, speed * index)
      });
    }, delay)
  }

  useLayoutEffect(() => {
    if (isInit && typeText != null && textPreview !== text) {
      typeText().then(() => {
        setIsInit(false);
        clearTimeout();
      });

    }
  }, [isInit, typeText]);

  useEffect(() => {
    setIsInit(true)
  }, []);

  return textPreview;
}


const Home = () => {
  const headerText1 = useTypeWriter("Hello, I'm ", 1500);
  const headerText1Span = useTypeWriter("Teo", 2000);
  const headerText2 = useTypeWriter("I'm an aspiring ", 3000);
  const headerText2Span = useTypeWriter("web developer", 3800);
  const headerText3 = useTypeWriter(" looking for work.", 4500);
  const headerText4 = useTypeWriter("My name is Teo Medesi. I am a 17 year old student from Croatia working as a freelancer.", 5500);

  const [skillsScope, animateSkills] = useAnimate();
  const [aboutScope, animateAbout] = useAnimate();
  const [contactScope, animateContact] = useAnimate();

  const isSkillsInView = useInView(skillsScope);
  const isAboutInView = useInView(aboutScope);
  const isContactInView = useInView(contactScope);

  useEffect(() => {
    
  }, [isSkillsInView, isAboutInView, isContactInView])


  return (
    <div className='home'>
      <Navbar />
      <header>
        <div className='header-text'>
          <h3>{headerText1}<span>{headerText1Span}</span></h3>
          <h1>{headerText2}<span>{headerText2Span}</span>{headerText3}</h1>
          <p>{headerText4}</p>

        </div>

        <div className='header-image'>
          <div className="headerCanvas">
            <Canvas camera={{ position: [0, 0, 1.5] }}>
              <Scene />
            </Canvas>
          </div>
        </div>

      </header>

      <section ref={skillsScope} className="skills-section">
        <div class="shape-divider">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
          </svg>
        </div>
        <div class="shape-divider-2">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
          </svg>
        </div>
        <div class="shape-divider-3">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
          </svg>
        </div>

        <div className="section-panel">
          <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className='text'>
            <h1>Services I offer</h1>
            <p>Reprehenderit laboris amet magna sit eiusmod adipisicing pariatur officia. Enim cillum officia in aliqua eiusmod. Esse minim officia mollit qui occaecat qui. </p>
          </motion.div>


          <motion.ul initial={{opacity: 0}} animate={{opacity: 1}}>
            <div className='row'>
              <div>
                <img src={html} alt="HTML" />
                <h3>HTML</h3>
              </div>
              <div>
                <img src={css} alt="CSS" />
                <h3>CSS</h3>
              </div>
              <div>
                <img src={tailwind} alt="TAILWINDCSS" />
                <h3>TAILWIND</h3>
              </div>
              <div>
                <img src={sass} alt="SASS" />
                <h3>SASS</h3>
              </div>
              <div>
                <img src={bootstrap} alt="BOOTSTRAP" />
                <h3>BOOTSTRAP</h3>
              </div>
            </div>

            <div className='row'>
              <div>
                <img src={javascript} alt="JAVASCRIPT" />
                <h3>JAVASCRIPT</h3>
              </div>
              <div>
                <img src={react} alt="REACT JS" />
                <h3>REACT JS</h3>
              </div>
              <div>
                <img src={nextjs} alt="REACT THREE FIBER" />
                <h3>NEXT JS</h3>
              </div>
              <div>
                <img src={github} alt="GITHUB" />
                <h3>GITHUB</h3>
              </div>
              <div>
                <img src={firebase} alt="FIREBASE" />
                <h3>FIREBASE</h3>
              </div>
            </div>
          </motion.ul>
        </div>
      </section>
      <section ref={aboutScope} className="about-me-container">
        <article className="about-me">
          <div className="text-col">
            <h1>About me</h1>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui earum sit, laborum enim ullam ut quidem vel, eaque atque officiis accusamus velit rerum totam ipsa id inventore doloribus architecto unde, commodi excepturi maxime! Tempore sunt assumenda ipsum vel. Dignissimos, necessitatibus?</p>
          </div>
          <a href="https://github.com/Teo-Medesi" className="github-button"><img src={github} alt="github" /></a>
        </article>
      </section>

      <section ref={contactScope} className="contact-me-container">
        <article className="contact-me">
          <div className="text">
            <h1>Contact Me!</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam voluptatibus ipsam autem dolorem esse nobis aperiam nisi praesentium molestiae quasi.</p>
          </div>
          <div className="input-field">
            <label htmlFor="name">Name</label>
            <input placeholder="John Doe" type="text" />
          </div>
          <div className="input-field">
            <label htmlFor="email">Name</label>
            <input placeholder="example123@gmail.com" type="email" />
          </div>
          <div className="input-field">
            <label htmlFor="message">Message</label>
            <textarea placeholder="Enter your message here..." type="text" ></textarea>
          </div>

          <button>Submit</button>
        </article>
      </section>

      <footer>
        <p>Images by <a href="https://pixabay.com/users/amusic11-21978593/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=6806813">Andrea Music</a> from <a href="https://pixabay.com//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=6806813">Pixabay</a></p>
      </footer>

    </div>
  )
}

const Scene = () => {
  return (
    <>
      <pointLight intensity={0.1} />
      <Planet />
      <OrbitControls />
    </>
  )
}

export default Home