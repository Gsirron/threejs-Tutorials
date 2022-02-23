import { Html } from '@react-three/drei'
import dynamic from 'next/dynamic'
import { Suspense, useEffect, useState } from 'react'
import { DirectionalLight } from 'three'
// Step 5 - delete Instructions components
// import Shader from '@/components/canvas/Shader/Shader'

// Dynamic import is used to prevent a payload when the website start that will include threejs r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49
const Shader = dynamic(() => import('../components/canvas/Shader/Shader'), {
  ssr: false,
})
const CubVis = dynamic(() => import('@/components/canvas/Cube/CubeVis'), {
  ssr: false,
})
const Dot = dynamic(() => import('../components/canvas/Dot/Dot'), {
  ssr: true,
})
const MusicBar = dynamic(
  () => import('@/components/canvas/Musicbar/MusicBar'),
  {
    ssr: true,
  }
)
const CubeArray = dynamic(() => import('@/components/canvas/Cube/CubeArray'), {
  ssr: true,
})
const MultiCube = dynamic(() => import('@/components/canvas/Cube/MultiCube'), {
  ssr: true,
})
const VisualCubeArray = dynamic(
  () => import('@/components/canvas/Cube/VisualCubeArray'),
  {
    ssr: true,
  }
)
const PlanetGroup = dynamic(
  () => import('@/components/canvas/Planet/PlanetGroup'),
  {
    ssr: true,
  }
)
// dom components goes here
const DOM = () => {
  return (
    <div className='container content-center px-10 mx-auto'>
      <div className='flex items-center justify-center h-screen'>
        {/* <h1 className='text-5xl  font-bold  text-purple-300 text-outline'>
          You Start Now!
        </h1> */}
      </div>
    </div>
  )
}

// canvas components goes here
const R3F = () => {
  return (
    <>
      {/* <Shader /> */}
      <directionalLight intensity={0.6} position={[150, 150, 150]} />

      {/* <CubVis /> */}
      <ambientLight />
      <PlanetGroup />
      {/* <VisualCubeArray /> */}
      <Suspense fallback={null}>
        {/* <MusicBar url='/music/df-around.mp3' /> */}
        {/* <Dot /> */}
        {/* <CubeArray url='/music/df-around.mp3' /> */}
      </Suspense>
      <color attach='background' args={['white']}></color>
      <gridHelper />
    </>
  )
}

const Page = () => {
  return (
    <>
      <DOM />
      {/* @ts-ignore */}
      <R3F r3f />
    </>
  )
}

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'Index',
    },
  }
}
