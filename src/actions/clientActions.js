import * as types from './types/clientTypes';

export const setUser = (user) => ({
    type: types.SET_USER,
    payload: user
});

export const setRoles = (roles) => ({
    type: types.SET_ROLES,
    payload: roles
});

export const setTheme = (theme) => ({
    type: types.SET_THEME,
    payload: theme
});

export const setLanguage = (language) => ({
    type: types.SET_LANGUAGE,
    payload: language
});
