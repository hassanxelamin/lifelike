import React, { useState, useContext } from 'react'
import axios from "axios";
import EmailContext from '../context/EmailContext'
import { motion } from "framer-motion"

const EmailPopup = ({ open, setOpen }) => {

  const { keyDownHandler, email, state, subscribe, setEmail, setStateIdle, errorMessage } = useContext(EmailContext)


  return (
    <div className='absolute z-50'>
      { open ? 
        <motion.div className='coverpage flex items-center justify-center text-white'
          initial={{
            opacity: 0,
            scale: 0.50,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: {
              ease: "easeOut",
              duration: 0.5,
            },
          }}
          exit={{
            opacity: 0,
            scale: 0.75,
            transition: {
              ease: "easeIn",
              duration: 0.5,
            },
          }}
        >
          <div className='w-[400px] sm:w-[566px] h-[135px] bg-[#000] rounded-3xl relative z-50'>
          { state === "IDLE"
            ? 
            <>
              <div>
                <h1 className='absolute w-[300px] sm:w-[480px] h-[24px] text-white text-[12px] md:text-[14px] top-[13px] left-[13px]'>Sign up to the LifeLike newsletter to recieve updates on announcements, releases, and exclusive content </h1>
                <div className="absolute top-[13px] right-[0px] cursor-pointer text-[18px] mr-8 color-white" onClick={() => {setOpen(false)}}>[<i>×</i>]</div>
              </div>
              <form onSubmit={subscribe} className="absolute top-[70px] left-[13px] text-white text-center w-[504px] flex">
                <input className="text-white text-[16px] w-[265px] md:w-[400px] h-[30px] bg-transparent border-b-[1px] mr-5" onKeyPress={keyDownHandler} type="text" placeholder="Enter Email..." value={email} onChange={(e) => setEmail(e.target.value)}/>
                <button className="bg-white w-[90px] h-[30px] text-black border-[2px] font-bold rounded" type="submit" disabled={state === "LOADING"}>{state === "LOADING" ? 'Loading...' : 'Submit'}</button>
              </form>
            </>
            : 
            <>
              { errorMessage === "INVALID" ? 
                <>
                  <div> Email Invalid</div>
                  <h1 className='absolute w-[480px] h-[24px] text-white text-[25px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>Thank you for signing up! </h1>
                  <div className="absolute top-[13px] right-[0px] cursor-pointer text-[18px] mr-8 color-white" onClick={() => {setOpen(false), setStateIdle()}}>[<i>×</i>]</div>
                </>
                :
                <>
                  <h1 className='absolute w-[480px] h-[24px] text-white text-[25px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>Thank you for signing up! </h1>
                  <div className="absolute top-[13px] right-[0px] cursor-pointer text-[18px] mr-8 color-white" onClick={() => {setOpen(false), setStateIdle()}}>[<i>×</i>]</div>
                </>
              }
            </>
          } 
          </div>
        </motion.div>
        :  
        null
      }
    </div>
  )
}


export default EmailPopup