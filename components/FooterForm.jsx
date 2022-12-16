import React, { useState } from 'react'
import axios from "axios";
import { emailValidator } from '../utils/validator';
import dynamic from 'next/dynamic'

const ThankYouMarquee = dynamic(() => import('./ThankYou'))

export default function FooterForm({ setClicked }) {
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
    <>
      {state === "IDLE" && (
      <>
        <div className="w-screen flex items-center justify-center">
          <form onSubmit={subscribe}>
            <input className={`text-white text-center w-[300px] h-[30px] bg-transparent border-b-[1px] ${state === 'ERROR' ? 'border-red-200' : ''}`} onKeyPress={keyDownHandler} type="text" placeholder="Enter Email..." value={email} onChange={(e) => setEmail(e.target.value)}/>
          </form>
        </div> 
        <div onClick={() => {setClicked(false)}} className="cursor-pointer text-[24px] pr-3">[<i>×</i>]</div>
      </>
      )} 
      {state === "ERROR" && (
      <>
        <div className="w-screen flex items-center justify-center">
          <form onSubmit={subscribe}>
            <input className="text-white text-center w-[300px] h-[30px] bg-transparent border-b-[1px] border-red-200" onKeyPress={keyDownHandler} type="text" placeholder="Email Invalid, Please Reenter..." value={email} onChange={(e) => setEmail(e.target.value)}/>
          </form>
        </div> 
        <div onClick={() => {setClicked(false)}} className="cursor-pointer text-[24px] pr-3">[<i>×</i>]</div>
      </>
      )}    
      {state === "SUCCESS" && (
        <ThankYouMarquee />
      )}    
    </>
  )
}