import * as types from "./types/authTypes";
import authService from "../services/authService";

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

    // Ensure user data exists, even if minimal
    const userData = data.user || {
      id: data.id,
      name: data.name || 'User',
      email: data.email || `user-${data.id}@example.com`
    };

    // Handle remember me option
    if (credentials.rememberMe) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);
    } else {
      // Use sessionStorage for temporary storage
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("refreshToken", data.refreshToken);
    }

    dispatch(authSuccess(userData));
    return data;
  } catch (error) {
    dispatch(authFail(error.response?.data?.message || "Login failed"));
    throw error;
  }
};

export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch(registerStart());
    const data = await authService.register(userData);

    localStorage.setItem("token", data.token);
    localStorage.setItem("refreshToken", data.refreshToken);

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
    dispatch(authSuccess(data.user));
  } catch (error) {
    dispatch(authFail(error.response?.data?.message));
    localStorage.clear();
  }
};
