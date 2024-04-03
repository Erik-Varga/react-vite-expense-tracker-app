export const fetchUser = () => {
    const userInfo = localStorage.getItem('expenseTrackerUser') !== "undefined" 
        ? JSON.parse(localStorage.getItem('expenseTrackerUser'))
        : localStorage.clear();
    return userInfo;
};
