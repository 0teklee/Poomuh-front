import React, { useState } from 'react';
import Verification from './Verification';
import CheckForSignUp from './checkForSignUp/CheckForSignUp';
import InputForm from './InputForm';
import Success from './Success';

function SignUp() {
  const [nextCheck, setNextCheck] = useState(false);
  const [nextInput, setNextInput] = useState(false);
  const [nextVerif, setNextVerif] = useState(false);
  return (
    <>
      <CheckForSignUp clickBtn={() => setNextCheck(true)} />
      <InputForm clickBtn={() => setNextInput(true)} />
      <Verification clickBtn={() => setNextVerif(true)} />
      <Success />
    </>
  );
}

export default SignUp;
