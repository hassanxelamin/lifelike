import React from 'react';
import dynamic from "next/dynamic";
import { Suspense } from "react";

const LifeLikeHome = dynamic(() => import('./Models/lifelike-home'))

// const BurgerSuspense = dynamic(
//   () => import("./Models/lifelike"),
//   { suspense: true }
// );



function LogoHome() {

  return (
    <>

      <directionalLight position={ [ 1, 2, 3 ] }/>
      <directionalLight position={ [ -1, -2, -3 ] }/>

      <ambientLight intensity={ 0.5 }/>
      {/* <axesHelper args={[5]} /> */}

      {/* <Suspense> */}
      <LifeLikeHome />
      {/* </Suspense> */}

    </>
  )
}

export default LogoHome