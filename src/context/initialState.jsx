import { fetchUser } from "../utils/fetchLocalStorageData"

const userInfo = fetchUser();

export const initialState = {
    user: userInfo,
    transactionItems: null,
    transactionBook: null,
}