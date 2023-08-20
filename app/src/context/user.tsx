import { createContext, useReducer } from 'react'
import { userInitialState, userReducer } from '../reducers/userReducer'


export const UserContext = createContext(userInitialState)

export function useUserReducer(){

    const [state, dispatch] = useReducer(userReducer, userInitialState)

    const set = (user: User) => dispatch({ type: 'SET', payload: user });

    return { state, set }
}


export function UserProvider({ children } : { children: React.ReactNode }){

    const { state, set } = useUserReducer()

    return (
        <UserContext.Provider value={{
            user: state,
            set
        }}>
            {children}
        </UserContext.Provider>
    )
}

