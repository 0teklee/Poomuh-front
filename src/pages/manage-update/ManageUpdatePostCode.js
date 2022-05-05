import React, { useEffect, useContext } from 'react';
import DaumPostcode from 'react-daum-postcode';
import styled from 'styled-components';
import { InfoDispatchContext } from './context';

function ManageFormPostCode({ handle, val }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const infoDispatch = useContext(InfoDispatchContext);
  const handleAddress = data => {
    infoDispatch({ type: 'UPDATE_ADDRESS', address_main: data.address });
    infoDispatch({ type: 'UPDATE_JADDRESS', jaddress: data.jibunAddress });
    infoDispatch({
      type: 'UPDATE_BUILDINGNAME',
      building_name: data.buildingName,
    });
    val.value = data.address;
  };

  return (
    <Outer onClick={handle}>
      <Inner>
        <DaumPostcode onComplete={handleAddress} onClose={handle} />
      </Inner>
    </Outer>
  );
}

const Outer = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(87, 87, 87, 0.468);
  position: fixed;
  z-index: 1000;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const Inner = styled.div`
  position: fixed;
  width: 30%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default ManageFormPostCode;
