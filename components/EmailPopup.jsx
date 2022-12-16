import React, { useState, useContext } from 'react'
import axios from "axios";
import EmailContext from '../context/EmailContext'
import { emailValidator } from '../utils/validator';
import { motion } from "framer-motion"

const EmailPopup = ({ open, setOpen }) => {

  // const { keyDownHandler, email, state, subscribe, setEmail, setStateIdle, errorMessage } = useContext(EmailContext)
  const [email, setEmail] = useState("");
  const [state, setState] = useState("IDLE");
  const [errorMessage, setErrorMessage] = useState(null);

  const subscribe = async () => {
    setState("LOADING");
    setErrorMessage(null);

    const validator = emailValidator(email)

    try {
      if (validator) {
        const response = await axios.post("/api/newsletter", { email });
        setState("SUCCESS");
        setEmail('')
      } else {
        setState("ERROR")
        setEmail('')
      }
    } catch (error) {
      setErrorMessage(error.response.data.error)
      setState("ERROR")
      setEmail('')
    }
  }

  const keyDownHandler = event => {

    if (event.key === 'Enter') {
      event.preventDefault();
      subscribe();
    }
  };


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
          <div className='w-[330px] sm:w-[566px] h-[135px] bg-[#000] rounded-3xl relative z-50'>
            {state === "IDLE" && (
              <>
                <div>
                  <h1 className='absolute top-[13px] left-[13px]
                                 w-[250px] h-[24px] 
                                 sm:w-[480px] 
                                 text-white text-[11px] sm:text-[14px] md:text-[14px]'
                  >
                    Sign up to the LifeLike newsletter for announcements, releases, and exclusive content.
                  </h1>
                  <div className="absolute top-[13px] right-[0px] cursor-pointer text-[18px] mr-8 color-white" onClick={() => {setOpen(false)}}>[<i>×</i>]</div>
                </div>
                <form onSubmit={subscribe} className="absolute top-[70px] left-[13px] text-white text-center w-full flex items-center justify-between">
                <input className="w-full h-[30px] 
                                  text-white text-[16px] 
                                  bg-transparent border-b-[1px]" 
                                  onKeyPress={keyDownHandler} type="text" placeholder="Enter Email..." value={email} onChange={(e) => setEmail(e.target.value)}
                />
                  <button className="bg-white w-[90px] h-[30px] text-black border-[2px] font-bold rounded ml-6 mr-[30px]" type="submit" disabled={state === "LOADING"}>{state === "LOADING" ? 'Loading...' : 'Submit'}</button>
                </form>
              </>
            )}  
            {state === "ERROR" && (
              <>
                <div>
                  <h1 className='absolute top-[13px] left-[13px]
                                 w-[250px] h-[24px] 
                                 sm:w-[480px] 
                                 text-white text-[13px] sm:text-[14px] md:text-[14px]'
                  >
                    Email invalid! Please try again 
                  </h1>
                  <div className="absolute top-[13px] right-[0px] cursor-pointer text-[18px] mr-8 color-white" onClick={() => {setOpen(false)}}>[<i>×</i>]</div>
                </div>
                <form onSubmit={subscribe} className="absolute top-[70px] left-[13px] 
                                                      text-white text-center w-full pr-[30px] 
                                                      flex items-center justify-between">
                  <input className="w-[265px] md:w-[400px] h-[30px] 
                                    text-white text-[16px] 
                                    bg-transparent border-b-[1px] border-red-200" onKeyPress={keyDownHandler} type="text" placeholder="Email Invalid, Try Again..." value={email} onChange={(e) => setEmail(e.target.value)}/>
                  <button className="bg-white w-[90px] h-[30px] text-black border-[2px] font-bold rounded" type="submit" disabled={state === "LOADING"}>{state === "LOADING" ? 'Loading...' : 'Submit'}</button>
                </form>
              </>
            )}
            {state === "SUCCESS" && (
              <>
                <div>
                  <h1 className='absolute w-[300px] sm:w-[480px] h-[24px] text-white text-[12px] md:text-[14px] top-[13px] left-[13px]'>Thank you for signing up! </h1>
                  <div className="absolute top-[13px] right-[0px] cursor-pointer text-[18px] mr-8 color-white" onClick={() => {setOpen(false)}}>[<i>×</i>]</div>
                </div>
              </>
            )}
          </div>
        </motion.div>
        :  
        null
      }
    </div>
  )
}


export default EmailPopup