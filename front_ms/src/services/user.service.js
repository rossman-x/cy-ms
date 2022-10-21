import axios from "axios";
import { HOSTNAME } from "../R";

export const connectUser = async (token) => {
  try {
    const response = await axios.post(
      `${HOSTNAME}/auth/connect`,
      {
        username: token,
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
    const response = await axios.get(`${HOSTNAME}/auth/connect`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getGameScore = async () => {
  try {
    const response = await axios.get(`${HOSTNAME}/score/get`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
