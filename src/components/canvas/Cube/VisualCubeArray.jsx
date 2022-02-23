import * as THREE from 'three'
import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useMemo,
  useState,
} from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useAsset } from 'use-asset'
import niceColors from 'nice-color-palettes'

const VisualCubeArray = ({ space = 0.5, size = 20 }) => {
  const ref = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const obj = new THREE.Object3D()
  const tempColor = new THREE.Color()
  const length = Math.pow(size, 3)
  const data = Array.from({ length }, () => ({
    color: niceColors[17][Math.floor(Math.random() * 5)],
    scale: 1,
  }))
  const colorArray = useMemo(
    () =>
      Float32Array.from(
        new Array(length)
          .fill()
          .flatMap((_, i) => tempColor.set(data[i].color).toArray())
      ),
    []
  )

  // const cubeField = useMemo(() => {
  //   let i = 0
  //   const temp = []
  //   for (let index = 0; index < Math.pow(size, 3); index++) {
  //     const x = (index % size) * space
  //     const y = (Math.floor(index / size) % size) * space
  //     if (index % Math.pow(size, 2) == 0 && index > 0) {
  //       i++
  //     }
  //     const z = i * space
  //     temp.push({ x, y, z })
  //   }
  //   return temp
  // }, [size, space])
  // useFrame(({ clock }) => {
  //   cubeField.forEach((cube, i) => {
  //     let { x, y, z } = cube
  //     const t = ((clock.elapsedTime + 3) % 5) * 0.3

  //     dummy.position.set(5 - x, 5 - y + t, 5 - z)
  //     dummy.updateMatrix()
  //     ref.current.setMatrixAt(i, dummy.matrix)
  //   })
  //   ref.current.instanceMatrix.needsUpdate = true
  // })
  useFrame(({ clock }) => {
    let i = 0
    for (let index = 0; index < Math.pow(size, 3); index++) {
      const x = (index % size) * space
      const y = (Math.floor(index / size) % size) * space

      if (index % Math.pow(size, 2) == 0 && index > 0) {
        i++
      }
      const t = ((clock.elapsedTime + 3) % 5) * 0.3
      const z = i * space
      obj.position.set(4 - x, 4.5 - y - t, 4 - z)
      obj.updateMatrix()
      ref.current.setMatrixAt(index, obj.matrix)
    }
    ref.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={ref} args={[null, null, Math.pow(size, 3)]}>
      <boxBufferGeometry args={[0.15, 0.15, 0.15]}>
        <instancedBufferAttribute
          attachObject={['attributes', 'color']}
          args={[colorArray, 3]}
        />
      </boxBufferGeometry>
      <meshPhongMaterial vertexColors={THREE.VertexColors} />
    </instancedMesh>
  )
}

export default VisualCubeArray
