import * as THREE from 'three'
import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useAsset } from 'use-asset'

const BasicCube = ({ a = 1, b = 1, c = 1, ...props }) => {
  return (
    <mesh {...props}>
      <boxBufferGeometry args={[a, b, c]} />
      <meshPhongMaterial color='red' opacity={0.9} transparent />
      {/* <meshNormalMaterial wireframe /> */}
    </mesh>
  )
}

export default BasicCube
