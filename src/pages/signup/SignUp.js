import React, { useState } from 'react';
import Verification from './Verification';
import CheckForSignUp from './CheckForSignUp';
import InputForm from './InputForm';
import Success from './Success';
import { GlobalContextProvider } from './signupContext';
import Header from '../../components/header/Header';

function SignUp() {
  const [show, setShow] = useState('check');

  const choosePage = () => {
    switch (show) {
      case 'check':
        return <CheckForSignUp setShow={setShow} />;
      case 'input':
        return <InputForm setShow={setShow} />;
      case 'verif':
        return <Verification setShow={setShow} />;
      case 'success':
        return <Success />;
      default:
        return <CheckForSignUp />;
    }
  };
  return (
    <>
      <Header />
      <GlobalContextProvider>{choosePage()}</GlobalContextProvider>
    </>
  );
}

export default SignUp;
