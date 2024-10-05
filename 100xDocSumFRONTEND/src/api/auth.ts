import axios from "axios";
import { config } from "../config/config";

export const LoginKirat = async (password: string) => {
    try {
      const response = await axios.post(`${config.baseUrl}/auth/login-kirat`, {password}, {
        withCredentials: true
      });
  
      if (response.status === 200) {
        const userData = response.data;
        return userData;
      } else {
        throw Error("Not logged in.");
      }
  
    } catch (error: any) {
        console.error("Error in MyQuestion:", error.message || error);
        throw new Error(error.response?.data?.message || "Something went wrong");
    }
  };

  export const VerifyKirat = async () => {
    try {
      const response = await axios.get(`${config.baseUrl}/auth/verify-kirat`,
        {withCredentials: true}
      );
  
      if (response.status === 200) {
        const userData = response.data;
        return userData;
      } else {
        throw Error("Not logged in.");
      }
    } catch (error: any) {
      console.error("Error in MyQuestion:", error.message || error);
      throw new Error(error.response?.data?.message || "Something went wrong");
    }
  };

  export const LogoutKirat = async () => {
    try {
      const response = await axios.post(
        `${config.baseUrl}/auth/logout`, 
        {}, 
        { withCredentials: true }
      );
  
      if (response.status === 200) {
        return response.data; 
      } else {
        throw new Error("Logout failed.");
      }
    } catch (error: any) {
      console.error("Error in LogoutKirat:", error.message || error);
      throw new Error(error.response?.data?.message || "Something went wrong during logout.");
    }
  };
  