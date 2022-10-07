import Row from "./row";
import { checkMatrixRow } from "../services/matrix.service";
import React, { useState } from "react";

const Matrix = ({ size }) => {
  const [rows, setRows] = useState([
    {
      attempt: 0,
      values: ["", "", "", "", ""],
      rightValuesIndexes: [1, 2, 3],
      misplacedValuesIndexes: [1, 4],
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
      setRows(updatedRows);
    }
  };

  const submitEssaie = async (row) => {
    const response = await checkMatrixRow(row);
    console.log(response);
  };

  return (
    <div className="w-[400px] w-3/4 mt-4 mx-auto">
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
