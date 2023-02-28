import React, { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import "../assets/styles/dev.scss"


// alright, my goals for three.js are as follow
/* 
    - loading GLTF models
    - loading textures
    - loading animations
    - making the models flow 
*/

const Dev = () => {
  return (
    <div className='dev'>
      <Canvas camera={{position: [0, 0, 1]}}>
        <Scene />
      </Canvas>
    </div>
  )
}

const Scene = () => {
  return (
    <>
      <ambientLight />
      <pointLight intensity={0.5} position={[10, 10, 10]} />


      <OrbitControls enableDamping={false}/>
    </>
  )
}

const Box = (props) => {
  const meshRef = useRef();

  const [isHover, setIsHover] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isMegaActive, setIsMegaActive] = useState(false);

  useFrame(() => {
    meshRef.current.rotation.y += 0.01;
  })

  return (
    <mesh
      {...props}
      ref={meshRef}
      onClick={() => setIsActive(current => !current)}
      onPointerOver={() => setIsHover(true)}
      onPointerOut={() => setIsHover(false)}
      onDoubleClick={() => setIsMegaActive(current => !current)}
      scale={isMegaActive ? 2 : isActive ? 1.5 : 1}
    >
      <boxGeometry args={[1,1,1]} />
      <meshStandardMaterial wireframe={true} color={isActive ? "blue" : isMegaActive ? "red" : isHover ? "green" : "orange"} />
    </mesh>
  )
}



export default Dev