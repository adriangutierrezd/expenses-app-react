
const auxUserInitialState = window.localStorage.getItem('loggedUser')
export const userInitialState = auxUserInitialState === null ? null : JSON.parse(auxUserInitialState)

export const userReducer = (state, action) => {

    const {type: actionType, payload } = action

    switch(actionType){
        case 'SET': {
            window.localStorage.setItem('loggedUser', JSON.stringify(payload))
            return payload
        }


    }

    return state
}