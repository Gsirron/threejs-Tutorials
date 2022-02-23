import React, { useRef } from 'react'

const PlanetRings = ({ rad = 3, tube = 0.3, color = 'yellow', ...props }) => {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]} {...props}>
      <torusBufferGeometry args={[rad, tube, 3, 30]} />
      {/* <sphereBufferGeometry /> */}
      <meshBasicMaterial color={color} />
    </mesh>
  )
}

export default PlanetRings
