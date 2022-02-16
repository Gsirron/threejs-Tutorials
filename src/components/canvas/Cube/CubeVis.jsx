import * as THREE from 'three'
import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useAsset } from 'use-asset'

const CubeVis = ({ size = 3, boxsize = 0.5, space = 0.5 }) => {
  const ref = useRef()
  const boxref = useRef()
  const tempObject = new THREE.Object3D()

  //   useLayoutEffect(() => {
  //     const transform = new THREE.Matrix4()
  //     let i = 0
  //     for (let x = 0; x < size; ++x)
  //       for (let y = 0; y < size; ++y)
  //         for (let z = 0; z < size; ++z) {
  //           const id = i++
  //           const x2 = x * space
  //           const y2 = y * space
  //           const z2 = z * space
  //           transform.setPosition(x2 - 1, y2 + 1, z2)
  //           ref.current.setMatrixAt(id, transform)
  //         }
  //   }, [space, size])
  //   useLayoutEffect(() => {
  //     // const tempObject = new THREE.Matrix4()
  //     let i = 0
  //     // for (let z = 0; z < size; z++)
  //     for (let index = 0; index < Math.pow(size, 3); index++) {
  //       //   tempObject.setPosition(index * space, index * space + 0.5, 0)
  //       const x = index % size
  //       const y = Math.floor(index / size) % size

  //       if (index % Math.pow(size, 2) == 0 && index > 0) {
  //         i++
  //       }
  //       const z = i
  //       if (index === 13) continue
  //       tempObject.position.set(
  //         (index % size) * space,
  //         (Math.floor(index / size) % size) * space,
  //         z * space
  //       )
  //       tempObject.updateMatrix()
  //       ref.current.setMatrixAt(index, tempObject.matrix)
  //     }
  //   }, [size, space])

  useFrame(({ clock }) => {
    let i = 0
    for (let index = 0; index < Math.pow(size, 3); index++) {
      //   tempObject.setPosition(index * space, index * space + 0.5, 0)
      const t = (clock.elapsedTime % 5) * 0.3
      const x = index % size
      const y = Math.floor(index / size) % size

      if (index % Math.pow(size, 2) == 0 && index > 0) {
        i++
      }
      const space2 = 0 + t
      const z = i
      if (index === 13) continue
      tempObject.position.set(x * space2, y * space2, z * space2)
      tempObject.updateMatrix()
      ref.current.setMatrixAt(index, tempObject.matrix)
    }
    ref.current.instanceMatrix.needsUpdate = true
  })
  //   const positions = [...Array(Math.pow(size, 3))].map((_, i) => {
  //     // const position = new THREE.Vector3()

  //     tempObject.position.set(i * space, i * space, i * space)
  //   })

  return (
    <instancedMesh ref={ref} args={[null, null, Math.pow(size, 3)]}>
      <boxBufferGeometry args={[boxsize, boxsize, boxsize]} />
      <meshPhongMaterial ref={boxref} color='red' opacity={0.9} transparent />
      {/* <meshNormalMaterial wireframe /> */}
    </instancedMesh>
  )
}

export default CubeVis
