import { Html } from '@react-three/drei'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
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

// dom components goes here
const DOM = () => {
  return (
    <div className='container mx-auto px-10 content-center'>
      <div className='flex justify-center items-center h-screen'>
        {/* <h1 className='text-5xl  font-bold text-white'>You Start Now!</h1> */}
      </div>
    </div>
  )
}

// canvas components goes here
const R3F = () => {
  return (
    <>
      {/* <Shader /> */}
      <directionalLight
        intensity={0.6}
        position={[1, 2, 2]}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        castShadow
      />
      <spotLight
        position={[-4, 4, -4]}
        angle={0.06}
        penumbra={1}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <Suspense fallback={null}>
        {/* <MusicBar url='/music/df-around.mp3' /> */}
        {/* <Dot /> */}
        <CubeArray url='/music/df-around.mp3' />
      </Suspense>
      <color attach='background' args={['white']}></color>
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
