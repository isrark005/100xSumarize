import axios from "axios";
import { config } from "../config/config";

export const SubmissionStatus = async () => {
    try {
      const response = await axios.get(`${config.baseUrl}/submission-flag/status`);
  
      if (response.status === 200) {
        const userData = response.data;
        return userData;
      } else {
        throw Error("Something went wrong");
      }
  
    } catch (error: any) {
      console.error("Error in MyQuestion:", error.message || error);
      throw new Error(error.response?.data?.message || "Something went wrong");
    }
  };

  export const SubmissionFlagToggle = async () => {
    try {
      const response = await axios.post(`${config.baseUrl}/submission-flag/toggle`, {}, {withCredentials: true});
      if (response.status === 200) {
        const userData = response.data;
        return userData;
      } else {
        throw Error("Something went wrong");
      }
    } catch (error: any) {
      console.error("Error in MyQuestion:", error.message || error);
      throw new Error(error.response?.data?.message || "Something went wrong");
    }
  };