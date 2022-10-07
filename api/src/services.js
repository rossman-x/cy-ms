import redis from "redis";

const generateWord = () => {
  return "AKKAKA";
};

const generateUid = () => {
  return `${Math.floor(Math.random() * 100000000)}`;
};

export const VerifyWord = (req) => {
  if (!req.session || !req.session.uid) {
    res.send({ error: "Cannot find personal uid" });
    return;
  }
  const correctValues = [];
  const misplacedValues = [];
  const wrongValues = [];
  if (!req || !req.body || !req.body.values || !req.body.values.length)
    return {
      error: "Cannot handle request.",
    };
  const body = req.body;
  correctWord.forEach((value, index) => {
    if (body.values.length <= index) wrongValues.push(index);
    else if (body.values[index] === value) correctValues.push(index);
    else if (correctWord.includes(body.values[index]))
      misplacedValues.push(index);
    else wrongValues.push(index);
  });
  return {
    ...body,
    correctValues,
    misplacedValues,
    wrongValues,
  };
};

export const GenerateWord = async (req, client) => {
  if (!req.session)
    return {
      error: "Session not found.",
    };
  if (req.session.uid) {
    const word = await new Promise((resolve, reject) => {
      client.get(req.session.uid, (err, value) => {
        if (err) return reject(err);
        return resolve(value);
      });
    });
    console.log(word);
    if (word) {
      return {
        values: [word],
        condition: "ALREADY_DELIVERED",
      };
    }
  }
  const generatedWord = generateWord();
  const uid = generateUid();
  req.session.uid = uid;
  req.session.save();
  await client.set(uid, generatedWord, (err, reply) => console.log(err));

  return {
    values: [generatedWord],
    condition: "NEW_GENERATED",
    uid,
  };
};

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
  return {
    username: req.session.username,
  };
};
