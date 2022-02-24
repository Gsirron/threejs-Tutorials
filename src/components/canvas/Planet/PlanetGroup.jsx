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
  const obj = new THREE.Object3D()

  useFrame(({ clock }) => {
    const t = Math.sin(clock.getElapsedTime)
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <PlanetRings rad={3.2} position={[0, 1, 0]} />
      <PlanetRings rad={3.2} position={[0, -1, 0]} />
      <PlanetRings rad={3.7} />
      {/* <PlanetRings /> */}
      <Planet />
    </group>
  )
}

export default PlanetGroup
