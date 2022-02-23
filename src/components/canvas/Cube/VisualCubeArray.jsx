import * as THREE from 'three'
import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useAsset } from 'use-asset'

async function createAudio(url) {
  // Fetch audio data and create a buffer source
  const res = await fetch(url)
  const buffer = await res.arrayBuffer()
  const context = new (window.AudioContext || window.webkitAudioContext)()
  const source = context.createBufferSource()
  source.buffer = await new Promise((res) =>
    context.decodeAudioData(buffer, res)
  )
  source.loop = true
  // This is why it doesn't run in Safari 🍏🐛. Start has to be called in an onClick event
  // which makes it too awkward for a little demo since you need to load the async data first
  source.start(0)
  // Create gain node and an analyser
  const gain = context.createGain()
  const analyser = context.createAnalyser()
  analyser.fftSize = 64
  source.connect(analyser)
  analyser.connect(gain)
  // The data array receive the audio frequencies
  const data = new Uint8Array(analyser.frequencyBinCount)
  return {
    context,
    source,
    gain,
    data,
    // This function gets called every frame per audio source
    update: () => {
      analyser.getByteFrequencyData(data)
      // Calculate a frequency average
      return (data.avg = data.reduce(
        (prev, cur) => prev + cur / data.length,
        0
      ))
    },
  }
}

const VisualCubeArray = ({
  space = 0.5,
  size = 30,
  obj = new THREE.Object3D(),
  ...props
}) => {
  const ref = useRef()

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
    <instancedMesh ref={ref} args={[null, null, Math.pow(50, 3)]}>
      <boxBufferGeometry args={[0.15, 0.15, 0.15]} />
      <meshPhongMaterial color='red' opacity={0.9} transparent />
    </instancedMesh>
  )
}

export default VisualCubeArray
