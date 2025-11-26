import api from "../../services/api";
import { setLoading, setUser, logoutUser } from "./authSlice";

export const signupUser = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const res = await api.post("/auth/signup", data);

    localStorage.setItem("user", JSON.stringify(res.data));

    dispatch(setUser(res.data)); 
  } catch (error) {
    alert(error.response?.data?.message || "Signup failed");
  } finally {
    dispatch(setLoading(false));
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const res = await api.post("/auth/login", { email, password });

    localStorage.setItem("user", JSON.stringify(res.data));

    dispatch(setUser(res.data));
  } catch (err) {
    alert("Login failed");
  } finally {
    dispatch(setLoading(false));
  }
};

export const logout = () => async (dispatch) => {
  try {
    await api.post("/auth/logout");
    localStorage.removeItem("user"); 
    dispatch(logoutUser());
  } catch (error) {
    console.log("Logout error");
  }
};
