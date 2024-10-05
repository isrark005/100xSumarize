import axios from "axios";
import { config } from "../config/config";

interface MyQuestionreqBodyT {
  name: string;
  notionUrl: string;
  twitterUrl?: string;
}
export const MyQuestion = async (reqBody: MyQuestionreqBodyT) => {
  try {
    const response = await axios.post(`${config.baseUrl}/my-question`, reqBody);

    if (response.status === 200) {
      const userData = response.data;
      return userData;
    } else {
      throw Error("Error Submiting your Entry");
    }
  } catch (error: any) {
    console.error("Error in MyQuestion:", error.message || error);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

type SummaryReqBodyT = {
  _id: string,
  docSummary: string
}

export const AddSummary = async (reqBody: SummaryReqBodyT) => {
  try {
    const response = await axios.patch(`${config.baseUrl}/summary-update`, reqBody);

    if (response.status === 200) {
      const userData = response.data;
      return userData;
    } else {
      throw Error("Error updating Summary");
    }
  } catch (error: any) {
    console.error("Error in MyQuestion:", error.message || error);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const FetchSummaries = async (page: number = 1, limit: number = 10) => {
  try {
    const response = await axios.get(`${config.baseUrl}/summaries`, {
      params: { page, limit }
    });

    if (response.status === 200) {
      return response.data; 
    } else {
      throw new Error('Failed to fetch summaries');
    }
  } catch (error: any) {
    console.error("Error in fetchSummaries:", error.message || error);
    throw new Error(error.response?.data?.message || 'Something went wrong');
  }
};


// Protected routes
export const MarkSummaryAsDone = async (id: string) => {
  try {
    const response = await axios.get(`${config.baseUrl}/summary/mark-done`, {
      params: { id }, 
      withCredentials: true, 
    });

    if (response.status === 200) {
      return response.data; 
    } else {
      throw new Error('Failed to mark summary as done');
    }
  } catch (error: any) {
    console.error("Error in markSummaryAsDone:", error.message || error);
    throw new Error(error.response?.data?.message || 'Something went wrong');
  }
};


export const ClearData = async () => {
  try {
    const response = await axios.delete(`${config.baseUrl}/summaries/clear`, {
      withCredentials: true, 
    });

    if (response.status === 200) {
      return response.data; 
    } else {
      throw new Error('Error clearing database');
    }
  } catch (error: any) {
    console.error("Error in ClearData:", error.message || error);
    throw new Error(error.response?.data?.message || 'Something went wrong');
  }
};