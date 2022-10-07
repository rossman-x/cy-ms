import axios from "axios";
import { HOSTNAME } from "../R";

export const checkMatrixRow = async (row) => {
  try {
    const response = await axios.post(`${HOSTNAME}/verify`, {
      row,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};
