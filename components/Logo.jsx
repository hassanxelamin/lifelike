import React from 'react';
import dynamic from "next/dynamic";
import { Suspense } from "react";
import LifeLike from './Models/lifelike';

// const BurgerSuspense = dynamic(
//   () => import("./Models/lifelike"),
//   { suspense: true }
// );



function Logo() {

  return (
    <>

      <directionalLight position={ [ 1, 2, 3 ] }/>
      <directionalLight position={ [ -1, -2, -3 ] }/>

      <ambientLight intensity={ 0.5 }/>

      {/* <Suspense> */}
      <LifeLike />
      {/* </Suspense> */}

    </>
  )
}

export default Logo