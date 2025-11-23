import api from "../../services/api";
import { setLoading, setUser, logoutUser } from "./authSlice";

// SIGNUP
export const signupUser = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const res = await api.post("/auth/signup", data);

    // Save to localStorage
    localStorage.setItem("user", JSON.stringify(res.data));

    dispatch(setUser(res.data)); // now redux also gets logged in
  } catch (error) {
    alert(error.response?.data?.message || "Signup failed");
  } finally {
    dispatch(setLoading(false));
  }
};

// LOGIN
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const res = await api.post("/auth/login", { email, password });

    // Save user + token to localStorage
    localStorage.setItem("user", JSON.stringify(res.data));

    dispatch(setUser(res.data));
  } catch (err) {
    alert("Login failed");
  } finally {
    dispatch(setLoading(false));
  }
};

// LOGOUT
export const logout = () => async (dispatch) => {
  try {
    await api.post("/auth/logout");
    localStorage.removeItem("user"); // remove saved session
    dispatch(logoutUser());
  } catch (error) {
    console.log("Logout error");
  }
};
