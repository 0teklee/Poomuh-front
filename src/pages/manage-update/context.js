import { createContext, useReducer } from 'react';

const initialInfo = {
  address_main: '',
  longitude: '',
  latitude: '',
  jaddress: '',
  address_dong: '',
  address_ho: '',
  building_type: '',
  building_name: '',
  supply_size: 0,
  exclusive_size: 0,
  building_floor: '',
  current_floor: '',
  price_main: 0,
  price_deposit: 0,
  price_monthly: 0,
  heat_id: '',
  available_date: '',
  description_title: '',
  description_detail: '',
  trade_id: [],
};

export const InfoContext = createContext();
export const InfoDispatchContext = createContext();

function infoReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_DATA_IN':
      return { ...state, dataIn: action.dataIn };
    case 'UPDATE_CATEGORY':
      return { ...state, category_id: action.category_id };
    case 'UPDATE_BUILDING_TYPE':
      return { ...state, building_type: action.buildingType };
    case 'UPDATE_ADDRESS':
      return { ...state, address_main: action.address_main };
    case 'UPDATE_JADDRESS':
      return { ...state, jaddress: action.jaddress };
    case 'UPDATE_BUILDINGNAME':
      return { ...state, building_name: action.building_name };
    case 'UPDATE_DONG':
      return { ...state, address_dong: action.address_dong };
    case 'UPDATE_HO':
      return { ...state, address_ho: action.address_ho };
    case 'UPDATE_DETAIL_TITLE':
      return { ...state, description_title: action.detail_title };
    case 'UPDATE_DETAIL_CONTENT':
      return { ...state, description_detail: action.detail_content };
    case 'UPDATE_SUPPLY_SIZE':
      return { ...state, supply_size: action.supply_size };
    case 'UPDATE_EXCLUSIVE_SIZE':
      return { ...state, exclusive_size: action.exclusive_size };
    case 'UPDATE_BUILDING_FLOOR':
      return { ...state, building_floor: action.building_floor };
    case 'UPDATE_CURRENT_FLOOR':
      return { ...state, current_floor: action.current_floor };
    case 'UPDATE_HEAT':
      return { ...state, heat_id: action.heat_id };
    case 'UPDATE_AVAILABLE_DATE':
      return { ...state, available_date: action.available_date };
    case 'UPDATE_PRICE_MAIN':
      return { ...state, price_main: action.price_main };
    case 'UPDATE_PRICE_DEPOSIT':
      return { ...state, price_deposit: action.price_deposit };
    case 'UPDATE_PRICE_MONTHLY':
      return { ...state, price_monthly: action.price_monthly };
    case 'UPDATE_TRADE_ID':
      return { ...state, trade_id: action.trade_id };
    case 'UPDATE_LONGITUDE':
      return { ...state, longitude: action.longitude };
    case 'UPDATE_LATITUDE':
      return { ...state, latitude: action.latitude };
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
