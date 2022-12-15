import { useGLTF, Float } from '@react-three/drei'

export default function LifeLike({ scale }) {
  // const model = useLoader(GLTFLoader, '/hamburger.glb')
  const model = useGLTF('/lifelike.glb')

   return (
    <Float roatationIntensity={8} speed={4}>
      <primitive object={model.scene} scale={0.1} position={ [ 0, 0, 0 ] }/>
    </Float>
   );
}

useGLTF.preload('/lifelike.glb')