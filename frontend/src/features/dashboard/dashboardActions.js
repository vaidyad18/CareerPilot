import api from "../../services/api";
import { setDashboardLoading, setDashboardData } from "./dashboardSlice";
import { toast } from "sonner";

export const loadDashboard = () => async (dispatch) => {
  try {
    dispatch(setDashboardLoading(true));

    const res = await api.get("/dashboard");
    dispatch(setDashboardData(res.data));

  } catch (error) {
    toast.error("Failed to load dashboard");
  } finally {
    dispatch(setDashboardLoading(false));
  }
};
