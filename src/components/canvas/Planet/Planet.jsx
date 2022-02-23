import React from 'react'

const Planet = ({ rad = 2, color = 'white' }) => {
  return (
    <mesh>
      <sphereBufferGeometry args={[rad, 20, 15]} />
      <meshBasicMaterial color={color} />
    </mesh>
  )
}

export default Planet
