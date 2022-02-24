import React from 'react'
import { useTexture } from '@react-three/drei'

const Planet = ({ rad = 3, color = 'white' }) => {
  const props = useTexture({
    map: '/textures/Rock041_1K_Color.jpg',
    displacementMap: '/textures/Rock041_1K_Displacement.jpg',
    normalMap: '/textures/Rock041_1K_NormalGL.jpg',
    roughnessMap: '/textures/Rock041_1K_Roughness.jpg',
    aoMap: '/textures/Rock041_1K_AmbientOcclusion.jpg',
  })

  return (
    <mesh>
      <sphereBufferGeometry args={[rad, 30, 30]} />
      <meshStandardMaterial displacementScale={0.2} {...props} />
    </mesh>
  )
}

export default Planet
