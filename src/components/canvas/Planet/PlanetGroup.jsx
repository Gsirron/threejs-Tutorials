import PlanetRings from './PlanetRings'
import Planet from './Planet'
import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useMemo,
  useState,
} from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const PlanetGroup = () => {
  const groupRef = useRef()
  const ringRef1 = useRef()
  const ringRef2 = useRef()
  const ring = new THREE.TorusBufferGeometry(3.5, 0.3, 3, 30)
  const ringColor = new THREE.MeshBasicMaterial({ color: 'orange' })
  const obj = new THREE.Object3D()

  useFrame(({ clock }) => {
    const t = Math.sin(clock.getElapsedTime())
    const t2 = Math.cos(clock.getElapsedTime())

    ringRef1.current.position.y = 1 + t + 1
    ringRef2.current.position.y = -1 + t - 1
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <mesh
        ref={ringRef1}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 1, 0]}
        geometry={ring}
        material={ringColor}
      />
      <mesh
        ref={ringRef2}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, -1, 0]}
        geometry={ring}
        material={ringColor}
      />
      <mesh
        rotation={[Math.PI / 2, 0, 0]}
        geometry={ring}
        material={ringColor}
      />
      {/* <PlanetRings rad={3.2} position={[0, 1, 0]} />
      <PlanetRings rad={3.2} position={[0, -1, 0]} />
      <PlanetRings rad={3.7} />
      <PlanetRings /> */}
      <Planet />
    </group>
  )
}

export default PlanetGroup
