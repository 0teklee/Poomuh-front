import { createContext, useReducer } from 'react';

const initialUserInfo = {
  isAgent: false,
  email: '',
  nickname: '',
  password: '',
  username: '',
  phoneNumber: '',
};

export const UserInfoContext = createContext();
export const UserInfoDispatchContext = createContext();

//userInfo 수정하는 Reducer
function userInfoReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_ISAGENT':
      return { ...state, isAgent: action.isAgent };
    case 'UPDATE_EMAIL':
      return { ...state, email: action.email };
    case 'UPDATE_NICKNAME':
      return { ...state, nickname: action.nickname };
    case 'UPDATE_PASSWORD':
      return { ...state, password: action.password };
    case 'UPDATE_USERNAME':
      return { ...state, username: action.username };
    case 'UPDATE_PHONENUM':
      return { ...state, phone_number: action.phoneNum };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

export function GlobalContextProvider({ children }) {
  const [userInfo, userInfoDispatch] = useReducer(
    userInfoReducer,
    initialUserInfo
  );

  return (
    <UserInfoContext.Provider value={userInfo}>
      <UserInfoDispatchContext.Provider value={userInfoDispatch}>
        {children}
      </UserInfoDispatchContext.Provider>
    </UserInfoContext.Provider>
  );
}
