import PlanetRings from './PlanetRings'
import Planet from './Planet'
import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useMemo,
  useState,
} from 'react'

const PlanetGroup = () => {
  const groupRef = useRef()

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <PlanetRings rad={2.1} position={[0, 1, 0]} />
      <PlanetRings rad={2.1} position={[0, -1, 0]} />
      <PlanetRings rad={2.7} />
      {/* <PlanetRings /> */}
      <Planet />
    </group>
  )
}

export default PlanetGroup
