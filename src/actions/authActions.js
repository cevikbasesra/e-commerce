import * as types from "./types/authTypes";
import authService, { api } from "../services/authService";

// Action Creators
export const authStart = () => ({
  type: types.AUTH_START,
});

export const authSuccess = (userData) => ({
  type: types.AUTH_SUCCESS,
  payload: userData,
});

export const authFail = (error) => ({
  type: types.AUTH_FAIL,
  payload: error,
});

export const logout = () => {
  authService.logout();
  return { type: types.LOGOUT };
};

export const registerStart = () => ({
  type: types.REGISTER_START,
});

export const registerSuccess = (userData) => ({
  type: types.REGISTER_SUCCESS,
  payload: userData,
});

export const registerFail = (error) => ({
  type: types.REGISTER_FAIL,
  payload: error,
});

// Thunk Action Creators
export const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch(authStart());
    const data = await authService.login(credentials);

    // Ensure user data exists
    const userData = {
      name: data.name,
      email: data.email,
      role_id: data.role_id
    };

    dispatch(authSuccess(userData));
    return data;
  } catch (error) {
    dispatch(authFail(error.message));
    throw error;
  }
};

export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch(registerStart());
    const data = await authService.register(userData);

    dispatch(registerSuccess(data.user));
    return data;
  } catch (error) {
    dispatch(
      registerFail(error.response?.data?.message || "Registration failed")
    );
    throw error;
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await authService.logout();
    dispatch({ type: types.LOGOUT });
  } catch (error) {
    localStorage.clear();
    dispatch({ type: types.LOGOUT });
  }
};

export const checkAuthStatus = () => async (dispatch) => {
  try {
    dispatch(authStart());
    const data = await authService.verifyToken();
    
    // Only update auth state if we have user data
    if (data && (data.user || data.name)) {
      const userData = data.user || {
        name: data.name,
        email: data.email,
        role_id: data.role_id
      };
      dispatch(authSuccess(userData));
    } else {
      // If no user data, treat as authentication failure
      dispatch(authFail('No user data received'));
      authService.logout();
    }
  } catch (error) {
    dispatch(authFail(error.response?.data?.message || 'Authentication failed'));
    authService.logout();
  }
};
