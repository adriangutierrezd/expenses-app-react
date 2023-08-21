
const auxUserInitialState = window.localStorage.getItem('loggedUser')
export const userInitialState = auxUserInitialState === null ? null : JSON.parse(auxUserInitialState)

interface State{
    state: object,
}

interface Action{
    type: string,
    payload: object
}

export const userReducer = (state: State, action: Action) => {

    const {type: actionType, payload } = action

    switch(actionType){
        case 'SET': {
            window.localStorage.setItem('loggedUser', JSON.stringify(payload))
            return payload
        }


    }

    return state
}