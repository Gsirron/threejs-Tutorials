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

const MultiCube = ({
  url,
  y = 1000,
  space = 0.1,
  width = 0.02,
  height = 0.05,
  obj = new THREE.Object3D(),
  ...props
}) => {
  const ref = useRef()
  const { gain, context, update, data } = useAsset(() => createAudio(url), url)
  useEffect(() => {
    // Connect the gain node, which plays the audio
    gain.connect(context.destination)
    // Disconnect it on unmount
    return () => gain.disconnect()
  }, [gain, context])

  useFrame((state) => {
    let avg = update()
    // Distribute the instanced planes according to the frequency daza
    const transform = new THREE.Matrix4()
    let i = 0
    for (let x = 0; x < data.length; ++x)
      for (let y = 0; y < 2; ++y)
        for (let z = 0; z < data.length; ++z) {
          let space2 = Math.sin(data[z] / 100)
          const id = i++
          const x2 = x * space
          const y2 = (data[x] / 50) * space
          const z2 = z * space
          transform.setPosition(x2, y2, z2)
          ref.current.setMatrixAt(id, transform)
        }
    // Set the hue according to the frequency average
    ref.current.material.color.setHSL(avg / 500, 0.75, 0.75)
    ref.current.instanceMatrix.needsUpdate = true
  })
  return (
    <instancedMesh ref={ref} args={[null, null, Math.pow(data.length, 3)]}>
      <boxBufferGeometry args={[0.15, 0.15, 0.15]} />
      <meshPhongMaterial color='red' opacity={0.9} transparent />
    </instancedMesh>
  )
}

export default CubeArray
