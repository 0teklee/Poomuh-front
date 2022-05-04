import React from 'react';
import ManageUpdate from './ManageUpdate';
import { GlobalContextProvider } from './context';

function ManageUpdateWrapper() {
  return (
    <GlobalContextProvider>
      <ManageUpdate />
    </GlobalContextProvider>
  );
}

export default ManageUpdateWrapper;
