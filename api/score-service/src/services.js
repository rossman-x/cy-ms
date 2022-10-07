const getScoreMain = async (username, client) => {
  const scoresStr = await redisGet(client, `scores`);
  let scores;
  if (!scoresStr) {
    scores = [];
    scores.push({ username, score: 0 });
    await client.set(`scores`, JSON.stringify(scores));
  } else {
    scores = await JSON.parse(scoresStr);
  }
  return scores.sort((a, b) => b.score - a.score);
};

export const getScore = async (req, client) => {
  if (!req || !req.session || !req.session.username) {
    return {
      error: "Session not found",
    };
  }
  const username = req.session.username;
  return await getScoreMain(username, client);
};

export const getScorePrivate = async (req, client) => {
  if (!req || !req.body || !req.body.username) {
    return {
      error: "Body not found",
    };
  }
  const username = req.body.username;
  return await getScoreMain(username, client);
};

export const updateScorePrivate = async (req, client) => {
  if (!req || !req.body || !req.body.username || !req.body.add) {
    return {
      error: "Body not found",
    };
  }
  const scoresStr = await redisGet(client, `scores`);

  let scores;
  if (!scoresStr) {
    scores = [];
    scores.push({ username: req.body.username, score: req.body.add });
    await client.set(`scores`, JSON.stringify(scores));
    return { done: 1 };
  }

  scores = JSON.parse(scoresStr);
  const userIndex = scores.map((sc) => sc.username).indexOf(req.body.username);
  if (userIndex !== -1 && scores[userIndex]) {
    scores[userIndex] = {
      username: req.body.username,
      score: +scores[userIndex].score + +req.body.add,
    };
  } else {
    scores.push({ username: req.body.username, score: +req.body.add });
  }

  await client.set(`scores`, JSON.stringify(scores));
  return { done: 2 };
};

export const redisGet = async (client, key) =>
  new Promise((resolve, reject) => {
    client.get(key, (err, reply) => {
      if (err) reject(err);
      resolve(reply);
    });
  });
