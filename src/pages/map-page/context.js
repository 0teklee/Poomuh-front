import { createContext, useReducer } from 'react';

const initialRealEstate = {
  realEstate: [],
  mapBounds: {},
  selected: [],
  mapCenter: {},
};

export const RealEstateContext = createContext();
export const RealEstateContextDispatch = createContext();

function realEstateReducer(state, action) {
  switch (action.type) {
    case 'GET_REAL_ESTATE':
      return { ...state, realEstate: action.realEstate };
    case 'GET_BOUNDS':
      return { ...state, mapBounds: action.getBounds };
    case 'GET_SELECTED_ESTATE':
      return { ...state, selected: action.selected };
    default:
      throw new Error('UNKNOWN ACTION TYPE', action.type);
  }
}

export function GlobalContextProvider({ children }) {
  const [realEstate, markerDispatch] = useReducer(
    realEstateReducer,
    initialRealEstate
  );

  return (
    <RealEstateContext.Provider value={realEstate}>
      <RealEstateContextDispatch.Provider value={markerDispatch}>
        {children}
      </RealEstateContextDispatch.Provider>
    </RealEstateContext.Provider>
  );
}
