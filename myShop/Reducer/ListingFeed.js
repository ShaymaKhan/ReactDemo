function GetCombineListing(state = { feed: [], favouriteFeed: [] }, action = {}) {
    switch (action.type) {
        case 'STORE_LIST':
            return { ...state, feed: action.value }
        // case 'STORE_FAVOURITE_FEED':
        //     return { ...state, favouriteFeed: action.value }
        default: return state
    }
}
export default GetCombineFeed