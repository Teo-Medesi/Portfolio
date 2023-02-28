import React, { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr, OrbitControls } from '@react-three/drei'
import Navbar from "../components/Navbar"
import "../assets/styles/home.scss"
import { Planet } from '../../public/Planet'


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

  useEffect(() => {
    if (isInit && typeText != null)
    {
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

      <section>
        <div className="section-panel">
            <h1>Services I offer</h1>
            <p>Reprehenderit laboris amet magna sit eiusmod adipisicing pariatur officia. Enim cillum officia in aliqua eiusmod. Esse minim officia mollit qui occaecat qui. </p>

            <ul>
              <div>
                <img src="" alt="HTML" />
                <h3>HTML</h3>
              </div>
              <div>
                <img src="" alt="CSS" />
                <h3>CSS</h3>
              </div>
              <div>
                <img src="" alt="TAILWINDCSS" />
                <h3>TAILWINDCSS</h3>
              </div>
              <div>
                <img src="" alt="BOOTSTRAP" />
                <h3>BOOTSTRAP</h3>
              </div>
              <div>
                <img src="" alt="SASS" />
                <h3>SASS</h3>
              </div>
              <div>
                <img src="" alt="JAVASCRIPT" />
                <h3>JAVASCRIPT</h3>
              </div>
              <div>
                <img src="" alt="REACT JS" />
                <h3>REACT JS</h3>
              </div>
              <div>
                <img src="" alt="REACT THREE FIBER" />
                <h3>REACT THREE FIBER</h3>
              </div>
              <div>
                <img src="" alt="GITHUB" />
                <h3>GITHUB</h3>
              </div>
              <div>
                <img src="" alt="FIREBASE" />
                <h3>FIREBASE</h3>
              </div>
            </ul>

        </div>
      </section>

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