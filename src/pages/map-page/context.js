import { createContext, useReducer } from 'react';

const initialMarker = { markers: [] };

export const MarkerContext = createContext();
export const MarkerDispatch = createContext();

function markerReducer(state, action) {
  switch (action.type) {
    case 'GET_MARKERS':
      return { markers: action.getMarkers };
  }
}

export function GlobalContextProvider({ children }) {
  const [marker, markerDispatch] = useReducer(markerReducer, initialMarker);

  return (
    <MarkerContext.Provider value={marker}>
      <MarkerDispatch.Provider value={markerDispatch}>
        {children}
      </MarkerDispatch.Provider>
    </MarkerContext.Provider>
  );
}
