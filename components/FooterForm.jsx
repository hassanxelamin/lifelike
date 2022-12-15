import React, { useState } from 'react'
import axios from "axios";
import ThankYouMarquee from "./ThankYou"

export default function FooterForm({ setClicked }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("IDLE");
  const [errorMessage, setErrorMessage] = useState(null);

  const subscribe = async () => {
    setState("LOADING");
    setErrorMessage(null);
    try {
      const response = await axios.post("/api/newsletter", { email });
      setState("SUCCESS");
    } catch (error) {
      setErrorMessage(error.response.data.error)
      setState("ERROR")
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
        <div className="w-full h-full flex items-center justify-center">
          <form onSubmit={subscribe}>
            <input className="text-white text-center w-[400px] h-[30px] bg-transparent border-b-[1px]" onKeyPress={keyDownHandler} type="text" placeholder="Enter Email..." value={email} onChange={(e) => setEmail(e.target.value)}/>
          </form>
        </div> 
        <div onClick={() => {setClicked(false)}} className="cursor-pointer text-[24px] mr-8">[<i>×</i>]</div>
      </>
      )} 
      {state === "ERROR" && (
        <p>{errorMessage}</p>
      )}    
      {state === "SUCCESS" && (
        <ThankYouMarquee />
      )}    
    </>
  )
}