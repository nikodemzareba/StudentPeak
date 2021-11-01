const initialiseState = {
    currentUser: null

}

export const user = (state = initialiseState, action) => {
    return {
        ...state,
        currentUser: action.currentUser
    }
}