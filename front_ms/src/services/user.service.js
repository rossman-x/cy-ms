import axios from "axios";
import { HOSTNAME } from "../R";

export const connectUser = async (username) => {
  try {
    const response = await axios.post(
      `${HOSTNAME}/connect`,
      {
        username,
      },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const getUserProfile = async () => {
  try {
    const response = await axios.get(`${HOSTNAME}/connect`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
