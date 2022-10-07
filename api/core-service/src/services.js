import axios from "axios";

export const verifyWord = async (req, client) => {
  if (!req.body || !req.session || !req.session.username) {
    return {
      error: "Body not found",
    };
  }
  const row = req.body.row;
  if (!row || !row.values || isNaN(+row.attempt))
    return { error: "Cannot find row." };
  const correctWord = "DAY".split(""); //await client.get("DAY_WORD");
  if (!correctWord) {
    return { error: "No daily word is stored" };
  }

  const correctValues = [];
  const misplacedValues = [];
  const wrongValues = [];

  correctWord.forEach((value, index) => {
    if (row.length <= index) wrongValues.push(index);
    else if (row.values[index] === value) correctValues.push(index);
    else if (correctWord.includes(row.values[index]))
      misplacedValues.push(index);
    else wrongValues.push(index);
  });
  const finished = correctWord.length === correctValues.length;
  if (finished) {
    try {
      await axios.post(
        `http://score_service_1:4000/private/score/update`,
        {
          username: req.session.username,
          add: 30,
        }
      );
    } catch (err) {
      console.error(err);
    }
  }
  return {
    row: {
      ...row,
      attempt: +row.attempt + 1,
      rightValuesIndexes: correctValues,
      misplacedValuesIndexes: misplacedValues,
      finished,
    },
  };
};
