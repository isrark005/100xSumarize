import axios from "axios";
import { config } from "../config/config";

export const LoginKirat = async (password: string) => {
    try {
      const response = await axios.post(`${config.baseUrl}/auth/login-kirat`, {password}, {
        withCredentials: true
      });
  
      if (response.status === 200) {
        return response.data;
      }
  
      return null;
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
        return response.data;
      }
  
      return null;
    } catch (error: any) {
      console.error("Error in MyQuestion:", error.message || error);
      throw new Error(error.response?.data?.message || "Something went wrong");
    }
  };