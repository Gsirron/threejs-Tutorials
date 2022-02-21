import * as THREE from 'three'
import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useAsset } from 'use-asset'

const BasicCube = ({ x, y, z, ...props }) => {
  const ref = useRef()

  return (
    <instancedMesh {...props} ref={ref} args={[null, null, Math.pow(size, 3)]}>
      <boxBufferGeometry args={[x, y, z]} />
      <meshPhongMaterial ref={boxref} color='red' opacity={0.9} transparent />
      {/* <meshNormalMaterial wireframe /> */}
    </instancedMesh>
  )
}

export default BasicCube
