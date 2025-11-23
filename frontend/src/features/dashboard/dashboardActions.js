import api from "../../services/api";
import { setDashboardLoading, setDashboardData } from "./dashboardSlice";

export const loadDashboard = () => async (dispatch) => {
  try {
    dispatch(setDashboardLoading(true));

    const res = await api.get("/dashboard");
    dispatch(setDashboardData(res.data));

  } catch (error) {
    alert("Failed to load dashboard");
  } finally {
    dispatch(setDashboardLoading(false));
  }
};
