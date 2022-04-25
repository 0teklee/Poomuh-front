import { createContext, useReducer } from 'react';

const initialRealEstate = {
  realEstate: [],
  mapBounds: {},
  selected: [],
  mapCenter: {},
  map: null,
  clusterer: null,
  clustererStyle: [
    {
      cursor: 'pointer',
      width: '60px',
      height: '60px',
      lineHeight: '60px',
      fontSize: '14px',
      background: 'rgba(50, 106, 249, 0.8)',
      color: '#fff',
      border: '1px solid rgb(50, 106, 249)',
      textAlign: 'center',
      fontWeight: 'bold',
      borderRadius: '50%',
    },
  ],
  filteredEstate: [],
  roomTypeFitler: {
    원룸: true,
    빌라: true,
    오피스텔: true,
    아파트: true,
  },
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
    case 'UPDATE_MAP':
      return { ...state, map: action.map };
    case 'UPDATE_CLUSTERER':
      return { ...state, clusterer: action.clusterer };
    case 'UPDATE_FILTERED_ESTATE':
      return { ...state, filteredEstate: action.filterdEstate };
    case 'UPDATE_ROOM_TYPE_FILTER':
      return { ...state, roomTypeFitler: action.roomTypeFitler };
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
