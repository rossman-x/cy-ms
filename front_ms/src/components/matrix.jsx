import Row from "./row";
import { checkMatrixRow } from "../services/matrix.service";
import React, { useState } from "react";

const Matrix = ({ size, showScore }) => {
  const [rows, setRows] = useState([
    {
      attempt: 0,
      values: Array(size).fill(""),
      rightValuesIndexes: [],
      misplacedValuesIndexes: [],
      isLocked: false,
    },
  ]);

  const updateText = (newText, i, j) => {
    if (rows[j] && rows[j].values && rows[j].values.length) {
      const updatedRow = { ...rows[j] };
      updatedRow.values[i] = newText;
      const updatedRows = [...rows];
      updatedRows[j] = updatedRow;
      console.log(updatedRows);
      // setRows(updatedRows);
    }
  };

  const submitEssaie = async (row) => {
    for (let v of row.values) {
      if (!v || v.length > 1) {
        // eslint-disable-next-line no-undef
        alert("Error field value " + v);
        return;
      }
    }
    const response = await checkMatrixRow(row);
    if (!response || !response.data || !response.data.row) {
      // eslint-disable-next-line no-undef
      alert("Cannot get values");
      return;
    }
    if (response.data.row.finished) {
      return showScore();
    }
    const updatedRows = [...rows];
    updatedRows[updatedRows.length - 1] = {
      ...response.data.row,
      isLocked: true,
    };
    updatedRows.push({
      values: Array(size).fill(""),
      attempt: +row.attempt + 1,
    });
    setRows(updatedRows);
  };

  return (
    <div className="w-[400px] w-3/4 mt-4 mx-auto">
      {rows.length ? (
        <h2>You have tried {rows[rows.length - 1].attempt} times.</h2>
      ) : (
        ""
      )}
      <div id="column">
        {rows.map((rData, j) => (
          <Row
            size={size}
            updateTextAtRow={(newText, i) => updateText(newText, i, j)}
            rowData={rData}
          ></Row>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() =>
            rows && rows.length && submitEssaie(rows[rows.length - 1])
          }
          className="bg-blue-400 p-2 rounded-lg"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Matrix;
