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
      return response.data;
    }

    return null;
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
      return response.data;
    }

    return null;
  } catch (error: any) {
    console.error("Error in MyQuestion:", error.message || error);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};
