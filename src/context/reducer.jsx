export const actionType = {
    SET_USER : 'SET_USER',
    SET_TRANSACTION_ITEMS: 'SET_TRANSACTION_ITEMS',
    SET_TRANSACTION_BOOK: 'SET_TRANSACTION_BOOK',
}

const reducer = (state, action) => {
    // console.log(action);

    switch(action.type) {
        case actionType.SET_USER:
            return {
                ...state,
                user : action.user,
            };

        case actionType.SET_TRANSACTION_ITEMS:
            return {
                ...state,
                transactionItems : action.transactionItems,
            };

        case actionType.SET_TRANSACTION_BOOK:
            return {
                ...state,
                transactionBook : action.transactionBook,
            };

        default:
            return state;
    }
};

export default reducer;