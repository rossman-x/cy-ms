import axios from "axios";

export const connectUser = async (req, client) => {
  if (!req.session) {
    return {
      error: "Session not found.",
    };
  }
  if (!req.body || !req.body.username) {
    return { error: "User not provided." };
  }
  req.session.username = req.body.username;
  req.session.save();
  return {
    username: req.session.username,
    score: 0,
  };
};

export const getUser = async (req, client) => {
  if (!req.session) {
    return {
      error: "Session not found.",
    };
  }
  if (!req.session.username) {
    return { error: "Cannot find user." };
  }

  try {
    const scoreData = await axios.post(
      `http://score_service_1:4000/private/score/get`,
      { username: req.session.username }
    );

    if (!scoreData || !scoreData.data || !scoreData.data.length) {
      return { error: "Cannot find score." };
    }

    const userScore = scoreData.data.find(
      (sc) => sc.username === req.session.username
    );

    return {
      username: req.session.username,
      score: userScore.score,
    };
  } catch (error) {
    console.log(error);
    return { error };
  }
};
