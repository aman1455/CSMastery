import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { setCredentials } from "../features/userSlice";
import axiosInstance from "../utils/index";

const AppProvider = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const res = await axiosInstance.post(
          "/api/v1/auth/refreshAccessToken",
          {},
          { withCredentials: true }
        );

        dispatch(
          setCredentials({
            accessToken: res.data.accessToken,
            user: res.data.user || null,
          })
        );
      } catch (err) {
        console.log("Refresh token expired or invalid", err);
        navigate("/signin");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccessToken();
  }, [dispatch, navigate]);

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  return <Outlet />;
};

export default AppProvider;
