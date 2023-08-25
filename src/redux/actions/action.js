export const setToken = (token) => {
    return {
        type: 'TOKEN',
        payload: token,
    };
};

export const setTabPosition = (tabPosition) => {
    return {
        type: 'TAB_POSITION',
        payload: tabPosition,
    };
}