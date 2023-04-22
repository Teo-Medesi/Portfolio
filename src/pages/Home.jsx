import "../assets/styles/home.scss"
import React, { useEffect, useLayoutEffect, useState } from 'react'
import Navbar from "../components/Navbar"
import HTML from "../assets/images/skills2/html.svg"
import CSS from "../assets/images/skills2/css.svg"
import TAILWIND from "../assets/images/skills2/tailwind.svg"
import BOOTSTRAP from "../assets/images/skills2/bootstrap.svg"
import SASS from "../assets/images/skills2/sass.svg"
import JAVASCRIPT from "../assets/images/skills2/javascript.svg"
import REACT from "../assets/images/skills2/react.svg"
import NEXTJS from "../assets/images/skills2/next.svg"
import FIREBASE from "../assets/images/skills2/firebase.svg"
import GITHUB from "../assets/images/skills/github.svg"
import GITHUB2 from "../assets/images/skills2/github.svg"
import { stagger, motion, useAnimate, useInView } from "framer-motion"



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

  const skills1 = [{name: "HTML", src: HTML}, {name: "CSS", src: CSS}, {name: "TAILWIND", src: TAILWIND}, {name: "SASS", src: SASS},  {name: "BOOTSTRAP", src: BOOTSTRAP}];
  const skills2 = [{name: "JAVASCRIPT", src: JAVASCRIPT}, {name: "NEXTJS", src: NEXTJS}, {name: "REACT", src: REACT},{name: "FIREBASE", src: FIREBASE}, {name: "GITHUB", src: GITHUB2}];

  useEffect(() => {
    // animate skills section
    if (isSkillsInView) animateSkills(".text, .row, .row-2", {opacity: 1}, {duration: 1, delay: stagger(0.5)});
    else animateSkills(".text, .row, .row-2", {opacity: 0});

    // animate about section
    if (isAboutInView && !isSkillsInView) animateAbout(".about-header, .about-paragraph, a", {opacity: 1}, {duration: 1, delay: stagger(0.5)});
    else animateAbout(".about-paragraph, .about-header, a", {opacity: 0});

    // animate contact section
    if (isContactInView && !isAboutInView) animateContact(".text, .input-field, .submit-button", {opacity: 1}, {duration: 1, delay: stagger(0.5)});
    else animateContact(".text, .input-field, .submit-button", {opacity: 0});
  }, [isSkillsInView, isAboutInView, isContactInView])


  return (
    <div className='home'>
      <Navbar />
      <header>
        <div className='header-text'>
          <h5>{headerText1}<span className="h5-span">{headerText1Span}</span></h5>
          <h1>{headerText2}<span className="h1-span">{headerText2Span}</span>{headerText3}</h1>
          <p>{headerText4}</p>
        </div>

        
        
      </header>

      <section className="skills-section">
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

        <div ref={skillsScope} className="section-panel">
          <motion.div initial={{opacity: 0}} className='text'>
            <h3>Services I offer</h3>
            <p className="sm">Reprehenderit laboris amet magna sit eiusmod adipisicing pariatur officia. Enim cillum officia in aliqua eiusmod. Esse minim officia mollit qui occaecat qui. </p>
          </motion.div>


          <ul>
            <motion.div initial={{opacity: 0}} className='row'>
              {skills1.map((skill, index) => <Skill skill={skill.name} src={skill.src} index={index} />)}
            </motion.div>

            <motion.div initial={{opacity: 0}} className='row row-2'>
              {skills2.map((skill, index) => <Skill skill={skill.name} src={skill.src} index={index} />)}
            </motion.div>
          </ul>
        </div>
      </section>
      <section className="about-me-container">
        <motion.article ref={aboutScope} className="about-me">
          <div className="text-col">
            <motion.h3 initial={{opacity: 0}} className="about-header">About me</motion.h3>
            <motion.p initial={{opacity: 0}} className="about-paragraph">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui earum sit, laborum enim ullam ut quidem vel, eaque atque officiis accusamus velit rerum totam ipsa id inventore doloribus architecto unde, commodi excepturi maxime! Tempore sunt assumenda ipsum vel. Dignissimos, necessitatibus?</motion.p>
          </div>
          <motion.a initial={{opacity: 0}} href="https://github.com/Teo-Medesi" className="github-button"><img src={GITHUB} alt="github" /></motion.a>
        </motion.article>
      </section>

      <section className="contact-me-container">
        <article ref={contactScope} className="contact-me">
        <motion.div initial={{opacity: 0}} className="text">
            <h6>Contact Me!</h6>
            <p className="xsm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam voluptatibus ipsam autem dolorem esse nobis aperiam nisi praesentium molestiae quasi.</p>
          </motion.div>
          <motion.div initial={{opacity: 0}} className="input-field">
            <label htmlFor="name">Name</label>
            <input placeholder="John Doe" type="text" />
          </motion.div>
          <motion.div initial={{opacity: 0}} className="input-field">
            <label htmlFor="email">Email</label>
            <input placeholder="example123@gmail.com" type="email" />
          </motion.div>
          <motion.div initial={{opacity: 0}} className="input-field">
            <label htmlFor="message">Message</label>
            <textarea placeholder="Enter your message here..." type="text" ></textarea>
          </motion.div>

          <motion.button whileTap={{scale: 0.975}} initial={{opacity: 0}} className="submit-button">Submit</motion.button>
        </article>
      </section>

      <footer>
        <p className="xsm">Images by <a href="https://pixabay.com/users/amusic11-21978593/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=6806813">Andrea Music</a> from <a href="https://pixabay.com//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=6806813">Pixabay</a></p>
      </footer>

    </div>
  )
}

const Skill = ({skill, src, index}) => {
  return (
    <div className="skill" key={index}>
      <img loading="lazy" src={src} alt={skill} />
      <p>{skill}</p>
    </div>
  )
}

export default Home