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
import GITHUB from "../assets/images/skills2/github2.svg"
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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false)

  const skills1 = [{name: "HTML", src: HTML}, {name: "CSS", src: CSS}, {name: "TAILWIND", src: TAILWIND}, {name: "SASS", src: SASS},  {name: "BOOTSTRAP", src: BOOTSTRAP}];
  const skills2 = [{name: "JAVASCRIPT", src: JAVASCRIPT}, {name: "NEXTJS", src: NEXTJS}, {name: "REACT", src: REACT},{name: "FIREBASE", src: FIREBASE}, {name: "GITHUB", src: GITHUB2}];

  const handleContactClick = () => {
    contactScope.current.scrollIntoView({behavior: "smooth"});
  }

  useEffect(() => {
    // animate skills section
    if (isSkillsInView) animateSkills(".text, .row, .row-2", {opacity: 1}, {duration: 1, delay: stagger(0.5)});
    else animateSkills(".text, .row, .row-2", {opacity: 0});

    // animate about section
    if (isAboutInView && !isSkillsInView) animateAbout(".about-header, .about-paragraph, a", {opacity: 1}, {duration: 1, delay: stagger(0.5)});
    else animateAbout(".about-paragraph, .about-header, a", {opacity: 0});

    // animate contact section
    if (isContactInView && !isAboutInView) animateContact(".text, .input-field, .submit-button", {opacity: 1}, {duration: 1, delay: stagger(0.45)}).then(() => {
      if (isSubmitted) animateContact(".input-field", {opacity: 0.2});
    });

    else animateContact(".text, .input-field, .submit-button", {opacity: 0});
  }, [isSkillsInView, isAboutInView, isContactInView])

  useEffect(() => {
    if (isSubmitted) {
      animateContact(".submit-button", {backgroundColor: "green", color: "white", borderRadius: "1rem"}, {duration: 1});
      animateContact(".input-field", {opacity: 0.2}, {duration: 1});
    }

  }, [isSubmitted])

  const handleSubmit = () => {
    if (!name || !email || !message) return;

    const subject = `[PORTFOLIO WEBSITE] - new message from ${name}`;
    const body = `sender: ${email}\n message: ${message}`;

    fetch("https://formspree.io/f/mayzadbr", {
      method: "POST",
      body: JSON.stringify({subject: subject, body: body}),
      headers: {
        "Content-Type": "application/json"
      },
      mode:  "cors"
    }).then(response => {
      if (response.status === 200) setIsSubmitted(true);
    }); 
  }

  return (
      <>
        <Navbar onContact={handleContactClick} />
        <div className='home'>
        <header>
          <div className='header-text'>
            <h5>{headerText1}<span className="h5-span">{headerText1Span}</span></h5>
            <h1>{headerText2}<span className="h1-span">{headerText2Span}</span>{headerText3}</h1>
            <p>{headerText4}</p>
          </div>
        
        
        </header>
        <section className="skills-section">
          <div className="shape-divider">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
            </svg>
          </div>
          <div className="shape-divider-2">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
            </svg>
          </div>
          <div className="shape-divider-3">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
            </svg>
          </div>
          <div ref={skillsScope} className="section-panel">
            <motion.div initial={{opacity: 0}} className='text'>
              <h3>Services I offer</h3>
              <p className="sm">Are you ready to make your website a game-changer? Let's build a website that's not only visually stunning, but also highly functional and optimized for success. </p>
            </motion.div>
            <ul>
              <motion.div initial={{opacity: 0}} className='row'>
                {skills1.map((skill, index) => <Skill skill={skill.name} src={skill.src} key={index} />)}
              </motion.div>
              <motion.div initial={{opacity: 0}} className='row row-2'>
                {skills2.map((skill, index) => <Skill skill={skill.name} src={skill.src} key={index} />)}
              </motion.div>
            </ul>
          </div>
        </section>
        <section className="about-me-container">
          <motion.article ref={aboutScope} className="about-me">
            <div className="text-col">
              <motion.h3 initial={{opacity: 0}} className="about-header">About me</motion.h3>
              <motion.p initial={{opacity: 0}} className="about-paragraph">
                I have always been a <span>problem solver</span> and had a keen interest in <span>building things</span>. The satisfaction I feel after a long and intense project is immeasurable. My love for <span>programming</span> and all things <span>IT</span> runs deep, and I am always eager to expand my knowledge and skills. I take great pride in <span>staying up-to-date</span> with the latest trends and techniques.
                <br />
                <br />
                <span>Integrity is paramount</span>. When working with clients or future employers, I prioritize <span>listening</span> to their needs and tailoring my approach accordingly. My goal is to deliver a product that <span>exceeds their expectations</span> and provides them with tangible value.
              </motion.p>
            </div>
            <motion.a initial={{opacity: 0}} href="https://github.com/Teo-Medesi" className="github-button"><img src={GITHUB} alt="github" /></motion.a>
          </motion.article>
        </section>
        <section ref={contactScope} className="contact-me-container">
          <article className="contact-me">
          <motion.div initial={{opacity: 0}} className="text">
              <h6>Contact Me!</h6>
              <p className="xsm">The first step towards success is just a message away. Contact me using the form below, and let's start building something great together!</p>
            </motion.div>
            <motion.div initial={{opacity: 0}} className="input-field">
              <label htmlFor="name">Name</label>
              <input onChange={event => setName(event.target.value)} placeholder="John Doe" type="text" />
            </motion.div>
            <motion.div initial={{opacity: 0}} className="input-field">
              <label htmlFor="email">Email</label>
              <input onChange={event => setEmail(event.target.value)} placeholder="example123@gmail.com" type="email" />
            </motion.div>
            <motion.div initial={{opacity: 0}} className="input-field">
              <label htmlFor="message">Message</label>
              <textarea onChange={event => setMessage(event.target.value)} placeholder="Enter your message here..." type="text" ></textarea>
            </motion.div>
            <motion.button onClick={handleSubmit} initial={{opacity: 0}} className="submit-button">{isSubmitted ? "Thank you for your feedback!" : "Submit"}</motion.button>
          </article>
        </section>
        <footer>
          <p className="xsm">Images by <a href="https://pixabay.com/users/amusic11-21978593/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=6806813">Andrea Music</a> from <a href="https://pixabay.com//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=6806813">Pixabay</a></p>
        </footer>
        
            </div>
      </>
  )
}

const Skill = ({skill, src}) => {
  return (
    <div className="skill">
      <img loading="lazy" src={src} alt={skill} />
      <p>{skill}</p>
    </div>
  )
}

export default Home