import { createContext, useReducer } from 'react';

const initialInfo = {
  address: '',
  jaddress: '',
  address_dong: '',
  address_ho: '',
  room_type: '',
  building_type: '',
  supply_size: 0,
  exclusive_size: 0,
  building_floor: '',
  current_floor: '',
  price_main: 0,
  price_monthly: 0,
  heat_id: '',
  available_date: '',
  description_title: '',
  description_detail: '',
};

export const InfoContext = createContext();
export const InfoDispatchContext = createContext();

function infoReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_ROOM_TYPE':
      return { ...state, room_type: action.roomType };
    case 'UPDATE_BUILDING_TYPE':
      return { ...state, building_type: action.buildingType };
    case 'UPDATE_ADDRESS':
      return { ...state, address: action.address };
    case 'UPDATE_JADDRESS':
      return { ...state, jaddress: action.jaddress };
    case 'UPDATE_DONG':
      return { ...state, address_dong: action.dong };
    case 'UPDATE_HO':
      return { ...state, address_ho: action.ho };
    default:
      throw new Error(`Unknown action type : ${action.type}`);
  }
}

export function GlobalContextProvider({ children }) {
  const [info, infoDispatch] = useReducer(infoReducer, initialInfo);
  return (
    <InfoContext.Provider value={info}>
      <InfoDispatchContext.Provider value={infoDispatch}>
        {children}
      </InfoDispatchContext.Provider>
    </InfoContext.Provider>
  );
}
