// eslint-disable-next-line import/no-anonymous-default-export
export default (users = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return users
        case 'CREATE':
            return [...users, action.payload];
        default:
            return users
    }
}