import axios from "axios";
import { HOSTNAME } from "../R";

export const checkMatrixRow = async (row) => {
  try {
    const response = await axios.post(
      `${HOSTNAME}/core/validate`,
      {
        row,
      },
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getGameData = async () => {
  try {
    const response = await axios.get(`${HOSTNAME}/core/game`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
