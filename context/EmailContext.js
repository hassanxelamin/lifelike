import { createContext, useState } from "react";
import axios from "axios";

const EmailContext = createContext();

export function EmailProvider({children}) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("IDLE");
  const [errorMessage, setErrorMessage] = useState(null);

  const validate = (email) => {
    const errors = {}
  
    if (!email) {
      errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.email = 'Invalid email address'
    }
  
    return errors
  }

  const subscribe = async () => {
    setState("LOADING");
    setErrorMessage(null);
    try {
      if (!validate( email )) { 
        const response = await axios.post("/api/newsletter", { email });
      } else {
        setErrorMessage("INVALID EMAIL");
      }
      setState("SUCCESS");
    } catch (error) {
      setErrorMessage(error.response.data.error);
      setState("ERROR");
    }
  }

  const keyDownHandler = event => {

    if (event.key === 'Enter') {
      event.preventDefault();

      // 👇️ call submit function here
      subscribe();
    }
  };

  const setStateIdle = () => {
    setState("IDLE")
  }

  return(
    <EmailContext.Provider 
      value={{
        keyDownHandler, 
        subscribe, 
        email, 
        state, 
        errorMessage,
        setEmail,
        setStateIdle,
        validate,
        setErrorMessage}}
      >
      {children}
    </EmailContext.Provider>
  )
}

export default EmailContext;