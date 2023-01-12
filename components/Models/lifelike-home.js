import React from "react"
import { useGLTF, Float } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function LifeLikeHome({ scale }) {
  // const model = useLoader(GLTFLoader, '/hamburger.glb')
  const myMesh = React.useRef()
  const model = useGLTF('/lifelike.glb')

  useFrame(({ clock }) => {
    // myMesh.current.geometry.computeBoundingBox();
    // const boundingBox = myMesh.current.geometry.boundingBox;
    // const center = new THREE.Vector3();
    // boundingBox.getCenter(center);
    myMesh.current.rotation.y = clock.getElapsedTime()
  })

   return (
    // <Float roatationIntensity={8} speed={4}>
      <primitive ref={myMesh} object={model.scene} scale={0.035} position={ [ 0, 0, 0 ] }/>
    // </Float>
   );
}

useGLTF.preload('/lifelike.glb')