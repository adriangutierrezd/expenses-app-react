const auxUserInitialState = window.localStorage.getItem('loggedUser');
export const userInitialState = auxUserInitialState === null ? null : JSON.parse(auxUserInitialState);

interface State {
  user: object | null; // Assuming 'user' is the correct property name in the state
}

interface Action {
  type: string;
  payload: object;
}

export const userReducer = (state: State, action: Action) => {
  const { type: actionType, payload } = action;

  switch (actionType) {
    case 'SET': {
      window.localStorage.setItem('loggedUser', JSON.stringify(payload));
      return { ...state, user: payload }; // Update the 'user' property in the state
    }
    default:
      return state;
  }
};
