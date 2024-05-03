import axios from "axios";

export const fetchCreatorData = async (username) => {
  const options = {
    method: "GET",
    url: process.env.API_URL,
    params: {
      username_or_id_or_url: username,
    },
    headers: {
      "X-RapidAPI-Key": process.env.API_SECRET_KEY,
      "X-RapidAPI-Host": process.env.API_HOST,
    },
  };
  try {
    const response = await axios.request(options);
    return response.data.data;
  } catch (error) {
    throw new Error("Error fetching creator data:" + error.message);
  }
};
