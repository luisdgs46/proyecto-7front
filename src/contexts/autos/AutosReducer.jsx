const reducer = (globalState, action) => {
    switch(action.type) {
        case "OBTENER-AUTOS":
            return {
                ...globalState,
                cars: action.payload
            }
        default:
            return globalState
    }
}

export default reducer