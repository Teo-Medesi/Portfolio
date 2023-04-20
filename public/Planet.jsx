import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';

export function Planet(props) {
  const { nodes, materials } = useGLTF('/scene.gltf')
  const groupRef = useRef(null);

  useFrame(() => {
    if (groupRef != null)
    {
      groupRef.current.rotation.z += 0.001;
    }
  });
  
  return (
    <group {...props} dispose={null}>
      <group ref={groupRef} rotation={[-Math.PI / 2, 0, 0]} scale={0.01}>
        <points geometry={nodes.Object_2.geometry} material={materials['Scene_-_Root']} />
        <points geometry={nodes.Object_3.geometry} material={materials['Scene_-_Root']} />
        <points geometry={nodes.Object_4.geometry} material={materials['Scene_-_Root']} />
        <points geometry={nodes.Object_5.geometry} material={materials['Scene_-_Root']} />
      </group>
    </group>
  )
}

setTimeout(() => {
  useGLTF.preload('/scene.gltf')
}, 1000)  