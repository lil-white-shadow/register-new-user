import { type } from "@testing-library/user-event/dist/type";
import React, { useEffect, useState } from "react";
import styles from './UserForm.module.css';

function UserForm() {
  const endpointURL = "https://frontend-take-home.fetchrewards.com/form";
  
  // input fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [occupation, setOccupation] = useState([""]);
  const [state, setState] = useState([""]);

  // array of options for dropdown items
  const [occupationsArray, setOccupationsArray] = useState([]);
  const [statesArray, setStatesArray] = useState([]);

  // form status
  const [isFilled, setIsFilled] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  // error messages
  const [isValidName, setIsValidName] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidOccupation, setIsValidOccupation] = useState(true);
  const [isValidState, setIsValidState] = useState(true);

  // show password
  const [isHiddenPassword, setIsHiddenPassword] = useState(true);


  let formInputs = {
    "name": name,
    "email": email,
    "password": password,
    "occupation": occupation,
    "state": state
  }

  // GET occupations and states for dropdown
  useEffect(() => {
    fetch(endpointURL)
      .then(res => res.json()
      .then(data => {
      setOccupationsArray(data.occupations) 
      setStatesArray(data.states);
      }))
  }, []);


  // basic validation to check all inputs are submitted
  function validate(e, inputType) {
    setTimeout(() => {
      
      switch(inputType) {
        case 'name':
          if(e.target.value.length > 2) {
            setName(e.target.value);
            setIsValidName(true);
          } else {
            setIsValidName(false);
          }
          break;
        case 'email':
          let mailFormat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
          if(e.target.value.match(mailFormat)) {
            setEmail(e.target.value);
            setIsValidEmail(true);
          } else {
            setIsValidEmail(false);
          }
          break;
        case 'password':
          let passwordFormat = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
          if(e.target.value.match(passwordFormat)) {
            setPassword(e.target.value);
            setIsValidPassword(true);
          } else  {
            setIsValidPassword(false);
          }
          break;
        case 'occupation':
          if(e.target.value !== 'default') {
            setOccupation(e.target.value);
            setIsValidOccupation(true);
          } else {
            setIsValidOccupation(false);
          }
          break;
        case 'state':
          if(e.target.value !== 'default') {
            setState(e.target.value);
            setIsValidState(true);
          } else {
            setIsValidState(false);
          }
          break;
        default:
          console.log('default');
        }
      
      if(name && email && password && occupation[0] !== '' && state !== '') {
        setIsFilled(true);
        setIsValidated(true);
      }
    }, 1000);
  }
          
  // POST form inputs, log feedback
  function onSubmit(e) {
    e.preventDefault();
    setIsValidated(false);
    setIsSubmitted(true);
    fetch(endpointURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formInputs)
    });
    setTimeout(() => {
      setIsSubmitted(false);
      setIsRegistered(true);
      console.log(JSON.stringify(formInputs));
      e.target.reset();
    }, 2000);
  }
  return (
    <>
      <form className={styles.formContainer} onSubmit={onSubmit} noValidate>
        <p>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" placeholder='Enter your name' onChange={(e) => {validate(e, 'name')}} />
        </p>
        <p>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" placeholder='Enter your email' onChange={(e)=> {validate(e, 'email')}}/>
        </p>
        <p>
          <label htmlFor="password">Password</label>
          {
            isHiddenPassword ? <input type="password" name="password" id="password" placeholder="Enter a secure password" onChange={(e)=> {validate(e, 'password')}}/> 
            : <input type="text" name="password" id="password" placeholder="Enter a secure password" onChange={(e)=> {validate(e, 'password')}}/>
          }
          </p>
          <div className={styles.togglePassword} onClick={() => setIsHiddenPassword(!isHiddenPassword)}>Toggle visibility</div>
        <p>
          <label htmlFor="occupation">Occupation</label>
          <select name="occupation" id="occupation" onChange={(e)=> {validate(e, 'occupation')}}>
            <option value="default">Select</option>
            {occupationsArray.map(data => <option key={data}>{data}</option>)}
          </select>
        </p>
        <p>
          <label htmlFor="state">State</label>
          <select name="state" id="state" onChange={(e)=> {validate(e, 'state')}}>
            <option value="default">Select</option>
            {statesArray.map(data => <option key={data.name}>{data.name}</option>)}
          </select>
        </p>
        {/* Error message */}
        <div className={styles.errorMessage}> {
        !isValidName ? <h3>Name must contain at least 3 characters.</h3>
        : !isValidEmail ? <h3>Please enter a valid email.</h3>
        : !isValidPassword ? <h3>Password must contain a minimum of eight characters with at least one letter, one number, and one special character.</h3>
        : !isValidOccupation ? <h3>Please select an occupation.</h3>
        : !isValidState ? <h3>Please select a State.</h3>
        : null
      }
        </div>
        
        {/* Custom button behavior based on form status*/}
        <div>
        {
          !isFilled ? <button className={styles.inProgress} type="submit" disabled={!isFilled}>Create</button>
          : isValidated ? <button type="submit">Create</button>
          : isSubmitted ? <button className={styles.inProgress} type="submit">Creating ...</button>
          : <button>Created <span className={styles.successIcon}>&#128526;</span>
            </button> 
        }
        </div>
      </form>

      {/* Success message upon registration */}
      <div>
        {isRegistered ? <h3>Hi {name.slice(0, name.indexOf(' '))}, welcome to Fetch! Check your inbox and start earning rewards.</h3> : null }
      </div>
    </>
  )
}

export default UserForm;