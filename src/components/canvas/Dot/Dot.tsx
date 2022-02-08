import React, {
  useRef,
  useLayoutEffect,
  useMemo,
  useEffect,
  useState,
} from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

const roundedSquareWave = (t, delta, a, f) => {
  return ((2 * a) / Math.PI) * Math.atan(Math.sin(2 * Math.PI * t * f) / delta)
}
const Dot = () => {
  const ref: any = useRef()
  const { vec, transform, positions } = useMemo(() => {
    const vec = new THREE.Vector3()
    const transform = new THREE.Matrix4()
    const positions = [...Array(10000)].map((_, i) => {
      const position = new THREE.Vector3()
      // Place in a grid
      position.x = (i % 100) - 50
      position.y = Math.floor(i / 100) - 50

      // Offset every other column (hexagonal pattern)
      position.y += (i % 2) * 0.5

      // Add some noise
      position.x += Math.random() * 0.3
      position.y += Math.random() * 0.3
      return position
    })
    return { vec, transform, positions }
  }, [])
  useFrame(({ clock }) => {
    const wave = roundedSquareWave(clock.elapsedTime, 0.1, 1, 1 / 3)
    const scale = 1 + wave * 0.3
    for (let i = 0; i < 10000; ++i) {
      vec.copy(positions[i]).multiplyScalar(scale)
      transform.setPosition(vec)
      ref.current.setMatrixAt(i, transform)
    }
    ref.current.instanceMatrix.needsUpdate = true
  })
  return (
    <instancedMesh ref={ref} args={[null, null, 10000]}>
      <circleBufferGeometry args={[0.15]} />
      <meshBasicMaterial />
    </instancedMesh>
  )
}

export default Dot
