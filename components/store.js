import {createContext, useReducer, useContext} from 'react'
import Reducer from './reducer'

const initialState = {
    selected: null
}

const Store = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initialState)
    const store = React.useMemo(() => ({ state, dispatch }), [state])
    return (
        <Context.Provider value={store}>
            {children}
        </Context.Provider>
    )
};

const Context = createContext(initialState)

export { Context, Store }